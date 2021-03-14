import React, {Component} from 'react'
import './App.css';
import axios from "axios"
import Input from '@material-ui/core/Input'
import Popup from "./Popup"





class App extends Component{

   constructor(){
     super()
     this.state = {
       age : "",
       sex : "",
       cp : "",
       trestbps : "",
       chol : "",
       fbs : "",
       restecg : "",
       thalach : "",
       exang : "",
       oldpeak : "",
       slope : "",
       ca : "",
       thal : "" , 
       test : "" , 
       selectedFile: null , 
       status : "Input" , 
       pred : []
      
     }
   }
  onSubmit = (e) => {
    e.preventDefault();

    
    const data1 = [  
      this.state.age,
      this.state.sex,
      this.state.cp ,
      this.state.trestbps,
      this.state.chol , 
      this.state.fbs , 
      this.state.restecg , 
      this.state.thalach , 
      this.state.exang , 
      this.state.oldpeak , 
      this.state.slope , 
      this.state.ca , 
      this.state.thal]



    axios.post("http://localhost:5000/accept" , data1)
    .then((res) => {
      
      this.setState({pred : res.data.data})
      this.setState({status : "output"})
      this.setState({age : ""})
      this.setState({sex : ""})
      this.setState({cp : ""})
      this.setState({trestbps : ""})
      this.setState({chol : ""})
      this.setState({fbs : ""})
      this.setState({restecg : ""})
      this.setState({thalach : ""})
      this.setState({exang : ""})
      this.setState({oldpeak : ""})
      this.setState({slope : ""})
      this.setState({ca : ""})
      this.setState({thal : ""})
     })
    .catch((err) =>{
      console.log(err)
    })

  }
  

  validate = (event) =>{
    if(event.key >= 0 && event.key <= 10  && event.key !== " "){
                       
    }
    else if(event.key === "."){
    }
    else{
      event.preventDefault()
      
    }
    }




 
  onFileChange = (e) => {
    
    // Update the state
    this.setState({ selectedFile: e.target.files[0] });
  
  };
  onFileUpload = () => {
    
    // Create an object of formData
    const formData = new FormData();
  
    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile
      
    );
    
  
    // Details of the uploaded file
 
  
    // Request made to the backend api
    // Send formData object
   
  // //  https://www.geeksforgeeks.org/file-uploading-in-react-js/
  axios.post("http://localhost:5000/csv", formData)
  .then((res) =>{
    
    this.setState({pred : res.data.data})
    this.setState({status : "output"})


  })
  .catch((err) => {
    console.log(err)
  })

    
  };
  

  render(){
   
    if(this.state.status === "Input"){
      return (
        <div className="App">
        
            <div className = "tittle">
              <h1>HEART DISEASE PREDICTOR </h1>
            </div>
            <p>you can upload a csv file here to get the prediction</p>
            <input  type="file" id="fileSelect" accept=".csv" onChange={this.onFileChange}/>
            <button onClick={this.onFileUpload}>
                    Upload!
                  </button>
            <p>or you can can enter your informations in the input fields to get the prediction </p>
            <p>if empty fields are submitted we replace the empty field with the mean value , try to fill as many fields as you can </p>
            <Popup/>
            <h1>age</h1>
            <Input       onKeyPress= {this.validate} placeholder = "type" onChange = {(e) => {this.setState({age : e.target.value })}} />
            <h1>sex</h1>
            <Input       onKeyPress= {this.validate} placeholder = "type" onChange = {(e) => {this.setState({sex : e.target.value })}}  />
            <h1>cp</h1>
            <Input       onKeyPress= {this.validate} placeholder = "type" onChange = {(e) => {this.setState({ cp: e.target.value})}}/>
            <h1>trestbps</h1>
            <Input       onKeyPress= {this.validate} placeholder = "type" onChange = {(e) => {this.setState({trestbps : e.target.value})} }/>
            <h1>chol</h1>
            <Input       onKeyPress= {this.validate} placeholder = "type"onChange = {(e) => {this.setState({chol : e.target.value})}} />
            <h1>fbs</h1>
            <Input       onKeyPress= {this.validate} placeholder = "type" onChange = {(e) => {this.setState({fbs : e.target.value})}} />
            <h1>restecg</h1>
            <Input       onKeyPress= {this.validate} placeholder = "type"onChange = {(e) => {this.setState({ restecg: e.target.value})}}/>
            <h1>thalach</h1>
            <Input       onKeyPress= {this.validate} placeholder = "type"onChange = {(e) => {this.setState({ thalach: e.target.value})}} />
            <h1>exang</h1>
            <Input       onKeyPress= {this.validate} placeholder = "type" onChange = {(e) => {this.setState({exang : e.target.value})}} />
            <h1>oldpeak</h1>
            <Input       onKeyPress= {this.validate} placeholder = "type" onChange = {(e) => {this.setState({oldpeak : e.target.value})}} />
            <h1>slope</h1>
            <Input       onKeyPress= {this.validate} placeholder = "type"  onChange = {(e) => {this.setState({slope : e.target.value})}} />
            <h1>ca</h1>
            <Input       onKeyPress= {this.validate} placeholder = "type"  onChange = {(e) => {this.setState({ca : e.target.value})}} />
            <h1>thal</h1>
            <Input       onKeyPress= {this.validate} placeholder = "type"   onChange = {(e) => {this.setState({ thal: e.target.value})}} />
            <button   onClick = {this.onSubmit}>submit</button>   
          </div>
      );

    }

    else{
      return(
        <div  className="App">
          <p>heart disease = 1 </p>
          <p>not heart disease = 0 </p>
          <h1>{this.state.pred}</h1>
          <button onClick = {() => {this.setState({status : "Input"})}} >back </button>

        </div>
      )
    }
  
   }
  
}

export default App;
