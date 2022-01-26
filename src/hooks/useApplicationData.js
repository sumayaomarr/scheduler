
   
import { useState, useEffect} from "react";
import axios from 'axios';

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

   function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const nullAppointment = {
        ...state.appointments[id],
        interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: nullAppointment
    };
    setState({
      ...state,
      appointments
    })
    })
  }
  

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
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(()=> {
       setState({
      ...state,
      appointments
    })
    })
  }

  const setDay = (day) => setState({ ...state, day });

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
    }).catch(function(err) {})
  }, []);
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}