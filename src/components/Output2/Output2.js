import React from 'react';
import { CSVLink } from "react-csv";


const Output2 = ({ pred,home}) => {

  if(typeof(pred) === 'string'){

    return(
        <div  className="App">
          <div className = "tittle">
            <h1 >{pred}</h1>
          </div>
          <button onClick = {home} >Back</button>
        </div>
    )

  }

  else{

    let res = [["id","Results"]]

    let i

    for(i = 0 ; i < pred.length ; i++){

        if(pred[i] === 0){
            res.push([i,"No Heart Discease"])
            }
        else{
            res.push([i,"Heart Discease"])
            }
          }

      return(
          <div  className="App">
              <div className = "tittle">
                <h1 >Results</h1>
              </div>
              <div className="Download">
                  <CSVLink data={res}>Download The CSV File</CSVLink>
              </div>
            <button onClick = {home} >Back</button>
          </div>
      )

  }


}

export default Output2;