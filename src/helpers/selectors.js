






export function getInterview(state, interview) {
  if (!interview) return null;
  const interviewObj = {
    student: interview.student
  };

  interviewObj.interviewer = state.interviewers[interview.interviewer];
  return interviewObj;
}




export function getAppointmentsForDay(state, day) {
  // console.log(state, day)
  const validDays = state.days.map(day => day.name);
  if (!day || !validDays.includes(day)) return []
else
// console.log(state, day)
return state.days
  .filter (appointment => appointment.name === day)[0]
  .appointments.map(apptId => state.appointments[apptId]);
}


export function getInterviewersForDay(state, dayName) {
  const validDayNames = state.days.map(dayObj => dayObj.name);
  if (!dayName || !validDayNames.includes(dayName)) return [];

  const todayObj = state.days.filter(dayObj => dayObj.name === dayName)[0];
  const interviewersObj = todayObj.interviewers.map(
    interId => state.interviewers[interId]
  );
  return interviewersObj;
}