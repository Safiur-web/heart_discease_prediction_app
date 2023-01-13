import React from 'react';
import happy_heart from "../Images/happy_heart.png"
import sad_heart from "../Images/sad_heart.png"


const Output1 = ({ pred,home}) => {

  if(pred[0] === 1){
    return(
        <div  className="App">
            <div className = "tittle">
              <h1 >Heart Disease Detected</h1>
            </div>
          <img src= {sad_heart} alt="sad_heart"/>
          <button onClick = {home} >Back </button>
        </div>
    )
  }

  else{
      return(
        <div  className="App">
            <div className = "tittle">
              <h1 >No Heart Disease Detected</h1>
            </div>
          <img src= {happy_heart} alt="happy_heart"/>
          <button onClick = {home} >Back </button>
        </div>
      )
  }

}

export default Output1;