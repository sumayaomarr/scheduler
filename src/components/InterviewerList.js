import React from "react";
import  "components/interviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem"

export default function interviewerList(props) {
  
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
      key={interviewer.key}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={props.setInterviewer}    />
    )
  })
  return (
  <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewers}</ul>
</section>
)}