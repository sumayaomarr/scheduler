import React from "react";

import "./styles.scss"

import Header from "./Header"

import Show from "./Show"

import Empty from "./Empty";

export default function Appointment(props) {
  const time = props.time
  const component = props.interview ? (<Show student={props.interview.student} interviewer={props.interview.interviewer} />) :  (<Empty />) 
  return (
   <article className="appointment">
      
     <Header time = {time ? time: "No Appointment" }></Header>
     {component}
   </article>
   
  );
}