import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// const GlobalStyle = createGlobalStyle`
// @font-face {
//     font-family: 'digital-7';
//     src: url(./fonts/digital-7.ttf) format('truetype');}

// `

// const FontStyle = styled.text`
//   font-family: url (.);

// `
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4); /* Semi-transparent black */
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackgroundImageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/image-3.jpg');
  background-size: cover; 
  background-position: center; 
  z-index: 99; /* Ensure it's below the overlay */
`;


const StyledDiv = styled.div`

  @font-face {
    font-family: 'Digital-7'; /* Name your font as displayed in the font file */
    src: url('/digital-7.ttf') format('truetype'); /* Adjust URL if needed */
  }
  
  font-family: 'Digital-7', sans-serif; /* Fallback to sans-serif if font not loaded */
  color: #00ff00;
  font-size: 3rem;
`;



interface TimerProps {}

const Timer: React.FC<TimerProps> = () => {
  const [userInputDate, setUserInputDate] = useState(new Date());
  const [userInputHour, setUserInputHour] = useState(0);
  const [userInputMinute, setUserInputMinute] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Functions to handle input changes (same as before)
  // Functions to handle input changes

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputDate(new Date(event.target.value));
  };

  const handleHourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hour = parseInt(event.target.value);
    setUserInputHour(Math.max(0, Math.min(23, hour))); // Clamp between 0 and 23
  };

  const handleMinuteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minute = parseInt(event.target.value);
    setUserInputMinute(Math.max(0, Math.min(59, minute))); // Clamp between 0 and 59
  };


  const startCountdown = () => {
    // Calculate target time in milliseconds
    const targetTime = new Date(
      userInputDate.getFullYear(),
      userInputDate.getMonth(),
      userInputDate.getDate(),
      userInputHour,
      userInputMinute,
      0 // Set seconds to 0
    ).getTime();

    const now = Date.now();
    const timeDifference = targetTime - now;

    // Check if target time is in the past
    if (timeDifference <= 0) {
      alert('Please enter a future date and time.');
      return;
    }

    setRemainingTime(timeDifference);
    setIsRunning(true);
  };

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setRemainingTime((prevTime) => Math.max(0, prevTime - 1000));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isRunning]);

  const formattedTime = new Date(remainingTime).toISOString().substr(11, 8); // HH:MM:SS format
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return (
    <div>
      <BackgroundImageContainer>
<Overlay>
  
      <input
        type="date"
        value={userInputDate.toISOString().substring(0, 10)}
        onChange={handleDateChange}
      />
      <input
        type="number"
        value={userInputHour}
        onChange={handleHourChange}
        placeholder="Hour (0-23)"
      />
      <input
        type="number"
        value={userInputMinute}
        onChange={handleMinuteChange}
        placeholder="Minute (0-59)"
      />
      <button onClick={startCountdown} disabled={isRunning}>
        {isRunning ? 'Stop Timer' : 'Start Timer'}
      </button>
      <StyledDiv>
      <div>

        Time Remaining: {days > 0 ? `${days}day ` : ''}{remainingHours > 0 || days > 0 ? `${remainingHours.toString().padStart(2, '0')}` : '00'}:
        {formattedTime}
      </div>
      </StyledDiv>
</Overlay>
</BackgroundImageContainer>
    </div>
  );
};

export default Timer;
