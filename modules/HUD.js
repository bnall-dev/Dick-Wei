import React from 'react';
import ReactDOM from 'react-dom';

const { useState, useEffect } = React;

function HUD({game, setGame, handleSaveGame, handleLoadGame, passTime, daysOfWeek, timeOfDay, setPlayerLocation}) {
  
  
function Header() {
    var weekDay = daysOfWeek[game.day % 7]
    return (
      <div>
        {game.locations[game.player.locationId].name}
        {timeOfDay[game.time]}
        {weekDay}
        {" DAY " + game.day}
      </div>
    )
  }
  
  function Locations() {
    
    var locationsOptions = game.locations[game.player.locationId].subLocationIds.map((slId, i)=>{
      var location = game.locations[slId]
      return <li key = {i}><button onClick = {()=>setPlayerLocation(slId)}>
       {location.name}
      </button></li>
    })
    
    return (
      <div>
        {"Locations"}
      <ul>
        {locationsOptions}
      </ul>
      </div>
    )
  }
  
  function Objects() {
  var objects = game.locations[game.player.locationId].objects.map((oId, i) => {
    return (<li key = {i}><button onClick = {()=>{}}>{game.objects[oId].name}</button></li>)
  })
  return (
    <div>
        <ul>
          {objects}
        </ul>
      </div>
  )
  
}
  
  function Inventory() {
    var items = game.player.inventory.map((iId, i)=>{
      return <li key = {i}>{game.items[iId].name}</li>
    })
    return (
      <div>
        Inventory
        <ul>
          {items}
        </ul>
      </div>
    )
    
  }
  
  function Stats() {
    
    return (
      <div>
        {"$" + game.player.money + ".00"}
        { "CIG " + game.player.cig + "%"}
      </div>
    )
  }
  
  
  
  
  
  return (<div>
     <Header/>
     <Objects />
      <Locations />
      <Stats/>
      <Inventory />
      <button onClick = {handleSaveGame}>Save Game</button>
      <button onClick = {handleLoadGame}>Load Game</button>
    </div>)
}

export default HUD