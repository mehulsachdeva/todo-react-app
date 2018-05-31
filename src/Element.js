import React, { Component } from 'react';
// import logo from './logo.svg';
import './Element.css';

class Element extends Component {

  //******** Intializing ***********
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
    this.onItemDelete = this.onItemDelete.bind(this)
  }

  //********** Remove element from list *************
  onItemDelete = (event) => {
    let id = event.target.id        //Get id of button
    let array = this.state.list.filter(element => element.id != id);       //Filter out element from list array and store it in new array

    //****** Update list array in state with array ******
    this.setState({
      list: array
    })

  }

  //*************** Update list on Click of CheckBox **************************
  handleCheckboxChange = (event) => {
    let id = event.target.id        //Get id of button
    let index = this.state.list.indexOf(this.state.list.filter( function(element){return element.id==id} )[0] ) // Get index of CheckBox clicked
    let updatedList = this.state.list

    this.state.list.forEach((item, itemIndex) => {                //Update isChecked Property of CheckBox Clicked
      if(item.id == id) {
        updatedList[itemIndex] = {
          ...updatedList[itemIndex],
          isChecked: event.target.checked,
          checked: !this.state.list[itemIndex].isChecked ? 'checked' : '',
          rewritable: !this.state.list[itemIndex].isChecked ? this.noChangeLabel : this.changeLabel,         //if checked disable pen button
          buttonTitle: !this.state.list[itemIndex].isChecked ? 'Checked Item Cannot Be Renamed' : '',         //if checked change title of pen button
          textDecoration: !this.state.list[itemIndex].isChecked ? 'line-through' : 'none',
          color: !this.state.list[itemIndex].isChecked ? '#909497' : 'black'
        }
      }
    })

    //************* Function to find element by its id ***************
    function findArrayElementByTitle(array, id) {
      return array.find((element) => {
        return element.id == id;
      })
    }

    //************ Display Checked Item At The Last And Unchecked Item At The Beginning ******************
    let itemToBeShifted = findArrayElementByTitle(updatedList,id)         //Get object To Be Removed
    if(event.target.checked){
      updatedList = this.state.list.filter(element => element.id != id)    //Remove object
      updatedList.push(itemToBeShifted)                                       //Send object at the end of array
    } else {
      updatedList = this.state.list.filter(element => element.id != id)    //Remove object
      updatedList.unshift(itemToBeShifted)                                       //Send object at the beginning of array
    }

    this.setState({
     list: updatedList                     //Update the state list
    })
  }

  //************ Rename Item Label ****************
  changeLabel = (event) => {
    let id = event.target.id        //Get id of button
    let index = this.state.list.indexOf(this.state.list.filter( function(element){return element.id==id} )[0] ) // Get index of Pen clicked
    let newItemName = prompt('Enter New Name',event.target.value)       //Get New Item Name

    if(newItemName === null){              //On Prompt Cancel Button set Item Default value
      newItemName = event.target.value
    }

    let updatedList = this.state.list

    this.state.list.forEach((item, itemIndex) => {                //Update Name Property of Item Clicked
      if(item.id == id) {
        updatedList[itemIndex] = {
          ...updatedList[itemIndex],
          name: newItemName
        }
      }
    })

     this.setState({
       list: updatedList                     //Update the state list
     })
  }


  //************** Add Item to List *****************
  addItem = (event) => {
    event.preventDefault()
    // var item = this.refs.itemname.value       //Get item using ref

    if(this.refs.itemname.value.length != 0){         // if item length is not null then perform setState

      this.setState({
        list: [
                ...this.state.list,
                 {id: Date.now(), filename: this.props.fname, name: this.refs.itemname.value, isChecked: false, checked: '', rewritable: this.changeLabel, buttonTitle: '', textDecoration: 'none', color: 'black', bgColor: '#FBFCFC'}
               ]
      }, () => {
        // this.saveToLocalStorage(this.state.list)
      })
      this.refs.itemname.value = ''
    } else {                          //if item length is null then give error
      alert('TODO Item Cannot Be Empty!')
    }
  }


  render(){

    return(
      <div>
        <div>

          <form>

            <input type = 'text' ref = 'itemname' className = 'item-input' placeholder = 'TODO...'/>
            <button onClick = {this.addItem} className = 'add-item-button' value = {this.props.fname}>ADD +</button>

          </form>
        </div>

        <ul style = {{marginLeft:-15}}>{
          this.state.list.map((element,i) => {
            return (
              <li type = 'none' key = {element.id}>
                <div key = {element.id} style = {{backgroundColor: i%2 == 0 ? '#FBFCFC' : '#F4F6F6', fontFamily: 'Arial', fontSize: 18, height: 50, width: 421, borderRadius: 4}}>
                  <input type = 'checkbox' id = {element.id} defaultChecked={element.checked} className = 'item-check-box' onClick = {this.handleCheckboxChange} />
                  <label style = {{textDecoration: element.textDecoration, color: element.color, position: 'relative', left: 10, top: 12}}>{element.name}</label>
                  <button title = {element.buttonTitle} id = {element.id} className = 'change-label-button' onClick = {element.rewritable} value = {element.name}>&#128394;</button>
                  <button id = {element.id} className = 'item-button' onClick = {this.onItemDelete}>&times;</button>
                </div>
              </li>
            )
          })
        }</ul>
      </div>
    )
  }
}

export default Element
