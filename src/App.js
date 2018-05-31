import React, { Component } from 'react';
import './App.css'
import Element from './Element'


class App extends Component {

  //*********** Intializing *************
  constructor(props){
    super(props)
    this.state = {
      file: []
    }
  }

  //************** Add New File to File **************
  addFile = (event) => {
    event.preventDefault()
    if(this.refs.filename.value.length !== 0){         // if item length is not null then perform setState

      this.setState({
        file: [
                ...this.state.file,
                 {id: Date.now(), name: this.refs.filename.value}
               ]
      }, () => {
      })

      this.refs.filename.value = ''
    } else {                          //if item length is null then give error
      alert('FileName Cannot Be Empty!')
    }
  }

  //********** Remove a File from file array *************
  onFileDelete = (event) => {
    let id = event.target.id        //Get id of button
    let array = this.state.file.filter(element => element.id != id);       //Filter out file from file array and store it in new array

    //****** Update file array in state with array ******
    this.setState({
       file: array
    })

  }

  //*********** Rename File ****************
  changeFileName = (event) => {
    let id = event.target.id        //Get id of button
    let index = this.state.file.indexOf(this.state.file.filter( function(element){return element.id == id})[0] ) // Get index of file clicked
    let newFileName = prompt('Enter New File Name',event.target.value)

    if(newFileName === null){              //On Prompt Cancel Button set Filename Default value
      newFileName = event.target.value
    }

    let updatedFileList = this.state.file

    this.state.file.forEach((item, itemIndex) => {                //Update isChecked Property of CheckBox Clicked
      if(item.id == id) {
        updatedFileList[itemIndex] = {
          ...updatedFileList[itemIndex],
          name: newFileName
        }
      }
    })

    this.setState({
      file: updatedFileList          //Update file array in state
    })
  }

  render(){

    return(
      <div>
        <center><h1 className = 'header'>TODO List</h1></center>
        <form>
          <input type = 'text' ref = 'filename' className = 'file-input' placeholder = 'File...' />
          <button className = 'add-file-button' onClick ={this.addFile}>NEW FILE</button>
        </form>
        <div>{
          this.state.file.map((element,i) => {
            return(
              <div key = {i} className = 'file'>
                <center><h2 style = {{fontFamily: 'Arial'}}>{element.name}</h2></center>
                <div key = {i} id = {element.id}>
                  <button id = {element.id} onClick = {this.changeFileName} className = 'change-file-name-button' value = {element.name}>&#x270E;</button>
                  <button id = {element.id} onClick = {this.onFileDelete} className = 'close-button'>&times;</button>
                  <Element fname = {element.name}/>
                </div>
              </div>
            )
        })
      }</div>
    </div>
    )
  }
}

export default App;
