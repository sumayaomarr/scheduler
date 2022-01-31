import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode((prev) => newMode)
      let replaceHistory = [...history];
    
      replaceHistory.splice(replaceHistory.length, 1, newMode);
  
      setHistory (replaceHistory);
    } else {
      setMode((prev) => newMode);
      let newHistory = [...history];
      newHistory.push(newMode);
      setHistory((prev) => newHistory);
    }
  };

  // allows to call back to return to previous mode
  const back = () => {
    if (history.length > 1){
        setMode(history[history.length - 2])
        setHistory((prev)=>[...prev.slice(0, -1)])
      }
    //  let newHistory = [...history];
    // newHistory.pop(mode);
    // setHistory((prev) => newHistory);
    // if (history.length > 1) {
    //   setMode((prev) => newHistory[(newHistory.length - 1)]);
    // }
  };


  return { mode, transition, back };
};

// [1, 2 ,3, 4]
// length = 4 
// current = 4 index 3
// need = 3 index 2
// history[3] history[history.length-1]
// history[2]history[history.length-2]
