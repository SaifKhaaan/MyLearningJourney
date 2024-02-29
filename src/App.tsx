import React from 'react';

import './App.css';
import Timer from './Timer';
import styled from "styled-components";

const StyledFont = styled.div`
display: flex;
background-image: url(image-3.jpg);
z-index: 202;
background-color: #f6f3f3;`


function App() {
  return (
    <div className="App">
    <StyledFont>
    
     <Timer />
     </StyledFont>
    </div>
  );
}

export default App;
