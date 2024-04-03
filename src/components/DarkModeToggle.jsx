import React, { useState, useEffect } from 'react';
import './DarkModeToggle.css';


function DarkModeToggle() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
   <>
   <h1>Calculator</h1>
   <div className={`App ${theme}`} id='div1'>
      
      <button onClick={toggleTheme} >Toggle Theme</button>
    </div>
   </>
  );
}
export default DarkModeToggle;