import React from 'react';
import Pad from '../Pad/Pad';
import ResultScreen from '../ResultScreen/ResultScreen';
import './Main.css';

function Main() {
  return (
    <div className="main_container">
      <ResultScreen></ResultScreen>
      <Pad></Pad>
    </div>
  );
}

export default Main;
