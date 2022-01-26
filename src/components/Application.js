import React, { useState, useEffect } from "react";

import axios from "axios";

import DayList from "./DayList";

import "components/Application.scss";

import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
// const appointmentsPaylod = {
//     "interview": {
//       "student": String,
//       "interviewer": Number
    
//   }
// }
    axios.put(`/api/appointments/${id}`, {interview})
    
    setState({
      ...state,
      appointments
    })
  }



  // function save(name, interviewer) {
  //   const interview = {
  //     student: name,
  //     interviewer

  //   };
  //   // bookInterview(1, interviewer)
  // }

  const setDay = (day) => setState({ ...state, day });

  const appointments = getAppointmentsForDay(state, state.day);
const interviewers = getInterviewersForDay(state, state.day)
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interviewers={interviewers}
        interview={interview}
        bookInterview={bookInterview}

      />
    );
  });
  console.log("schedule", schedule, appointments);

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then(function (response) {
      setState({
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
        
      });

      console.log(response[0].data);
    }).catch(function(err) {})
  }, []);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList setDay={setDay} day={state.day} days={state.days} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />{" "}
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
