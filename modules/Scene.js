import React from 'react';
import ReactDOM from 'react-dom';

const { useState, useEffect } = React;

function Scene({ game, setGame,  passTime }) {
  
  function handleEndScene() {
    setGame(prev=>({
      ...prev,
      state: "GAME"
    }))
  }
  
  
  return (<div>
   <button onClick = {handleEndScene}>Continue</button>
    </div>)
}

export default Scene