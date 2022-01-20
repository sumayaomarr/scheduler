import React from "react";

import "./styles.scss"





export default function Appointment(props) {
  const time = props.time
  return (
   <article className="appointment">
     {time ? `Appointment at ${time}`:"No Appointment"} 
     
   </article>
   
  );
}