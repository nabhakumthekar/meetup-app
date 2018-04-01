import React, { Component } from 'react';
import MeetUpEvents from './MeetUpEvents.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
         <h1>Up Comming Meet Up Events</h1>
        <MeetUpEvents />
      </div>
    );
  }
}

export default App;
