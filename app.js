import React from 'react';
import ReactDOM from 'react-dom';
import HUD from "./modules/HUD"
import Scene from "./modules/Scene";

const { useState, useEffect } = React;



function Game () {
  
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  const timeOfDay = ["Morning", "Afternoon", "Night"]
  
  
  
  function initPlayer() {
    return {
      name: "Dick",
      inventory: [0],
      missions: [],
      locationId: 0,
      cigPack: 20,
      cig: 100,
      money: 100
    }
  }
  
  function createLocation(id, name, occupants, subLocationIds, objects, items) {
    return {
      id,
      name,
      occupants,
      subLocationIds,
      objects, 
      items
    }
  }
  function initLocations() {
    return [
      createLocation(0, "Outskirts", [], [1], [0], []),
      createLocation(1, "Municipal District", [], [2, 0], [], []),
      createLocation(2, "Mayor's Office", [], [1], [], [])
    ]
  }
  
  function createItem(id, name, description, isKey) {
    return {
      id,
      name,
      description,
      isKey
    }
  }
  
  function initItems() {
    return [
      createItem(0, "Cigarettes (Open)", "Your favorite brand. There are x left.", true)
    ]
  }
  
  function createNPC(id, name) {
    return {
      id,
      name
    }
  }
  
  function initNPCs() {
    return [
      
    ]
  }
  
  function createObject(id, name, look, use){
    return {
      id,
      name,
      use,
      look
    }
  }
  
  function initObjects(){
    return [
      createObject(0, "Your Car", 
      ()=>{}, 
      ()=>{})
    ]
  }
  
  function initGame() {
    return {
      player: initPlayer(),
      day: 0,
      time: 0,
      locations: initLocations(),
      items: initItems(),
      objects: initObjects(),
      NPCs: initNPCs(),
      state: "MAIN MENU"
      }
  }
  
  const [game, setGame] = useState(()=>initGame())
  
  
  
  function passTime(n) {
    setGame(prev => ({
      ...prev,
      player: {
        ...prev.player,
        cig: prev.player.cig - n
      }
    }))
  }
  
  function setPlayerLocation(id) {
  
   setGame(prev=> ({
     ...prev,
     player: {
       ...prev.player,
       locationId: id
     }
   }))
   passTime(5)
   
  }
  
      function handleSaveGame() {
  try {
    const saveData = {
      version: 1,
      game: game
    };
    
    localStorage.setItem(
      "gameSave_01",
      JSON.stringify(saveData)
    );
    
    return true;
  } catch (error) {
    console.error("Failed to save game:", error);
    return false;
  }
}

function handleLoadGame() {
  try {
    const saveData = localStorage.getItem("gameSave_01");
    
    if (!saveData) return false;
    
    const parsed = JSON.parse(saveData);
    
    if (parsed.version !== 1) {
      console.error("Incompatible save version");
      return false;
    }
    
    setGame(parsed.game);
    return true;
    
  } catch (error) {
    console.error("Failed to load game:", error);
    return false;
  }
}


  
  function MainMenu() {
    
    function handleNewGame() {
      initGame()
      setGame(prev => ({
        ...prev,
        state: "CUTSCENE"
      }))
    }
    
    
    

    
    return (
      <div>
        <button onClick = {handleNewGame}>New Game</button>
        <button onClick = {handleLoadGame}>Load Game</button>
      </div>
    )
  }
  
  
  
  return (
    <div className="app">
      {game.state == "MAIN MENU" && <MainMenu/>}
     
      {game.state == "GAME" && <HUD game = {game} setGame = {setGame} handleSaveGame = {handleSaveGame} handleLoadGame = {handleLoadGame} passTime = {passTime} daysOfWeek= {daysOfWeek} timeOfDay = {timeOfDay} setPlayerLocation = {setPlayerLocation} />}
      
      {game.state == "CUTSCENE" && <Scene game = {game} setGame = {setGame} passTime  = {passTime}/>}
    </div>
    )
}

// Mount — React 18+ uses c reateRoot instead of the legacy ReactDOM.render()
ReactDOM.createRoot(document.getElementById('root')).render(<Game />);
