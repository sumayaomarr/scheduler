import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace = false) => {
     setMode(newMode)
    if (replace) {
      // let replaceHistory = [...history];
      // replaceHistory.splice(replaceHistory.length, 1, newMode);
      // setHistory (replaceHistory);
      setHistory((prev)=> [...prev.slice(0, prev.length - 1), newMode])
    } else {
      // let newHistory = [...history];
      // newHistory.push(newMode);
      // setHistory((prev) => newHistory);
      setHistory((prev)=> [...prev, newMode])
    }
  };

  // allows to call back to return to previous mode
  const back = () => {
    if (history.length > 1){
        setMode(history[history.length - 2])
        setHistory((prev)=>[...prev.slice(0, prev.length-1)])
      }
  };


  return { mode, transition, back };
};
