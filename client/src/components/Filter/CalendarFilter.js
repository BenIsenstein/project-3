import React, { useEffect, useState, useContext } from 'react'
import { FlexSection } from "../../common"
import UserContext from '../../UserContext'
import FilterItem from './FilterItem'
import FilterHomes from './FilterHomes'

const CalendarFilter = ({ checkedAll, setCheckedAll, checked, setChecked }) => {

  const userContext = useContext(UserContext)
  const [activeHomes, setActiveHomes] = useState([])

  const toggleCheck = (inputName) => {
    setChecked((prevState) => {
      const newState = { ...prevState }
      // console.log(`prevState[${inputName}]: `, prevState[inputName])
      newState[inputName] = !prevState[inputName]
      return newState
    })
  }

  const toggleHomeCheck = (e) => {
    // This function is for updating STATE of each home's current checkbox
    // value, which in turn re-renders the component it calls.
    let targetChecked = e.target.checked
    let targetCheckedValue = e.target.value
    let targetCheckedName = e.target.name
    let targetCheckedId = e.target.id
    
    let tempObject = {
      id: targetCheckedId,
      nickname: targetCheckedName,
      status: targetChecked
    }
    let tempHomeList =[]

    // Set the STATE array and update current object's status if it exists
    if (activeHomes.length > 0) {
      // There are homes in the state array, now find the one we're dealing with if it exists
      if (activeHomes.some(object => object.id === targetCheckedId)) {
        // let retrievedObject = activeHomes.find(obj => obj.id === targetCheckedId)

        // Remove the original state object OUT of the state array. This will be replaced by its
        // newly defined replacement.
        tempHomeList = activeHomes.filter(function( obj ) {
          return obj.id !== targetCheckedId;
        })
        // PUSH the replacement object into the existing state array in place of the original one.
        tempHomeList = [...tempHomeList, tempObject]
      }
      else {
        // PUSH the new object into the existing state array.
        tempHomeList = [...activeHomes, tempObject]
      }
    }
    else {
      // PUSH the new object into the emptystate array.
      tempHomeList = [...activeHomes, tempObject]
    }
    // sort the list of homes in alphabetical order
    tempHomeList.sort((a, b) => a.nickname.localeCompare(b.nickname))
    // tempHomeList = tempHomeList.sort((a, b) => a.nickname.localeCompare(b.nickname))

    // update the overall STATE
    setActiveHomes(tempHomeList)
    let newCheckedState = {
      active: checked.active,
      completed: checked.completed,
      homes: tempHomeList
    }
    setChecked(newCheckedState)
      
      // condition ? doThisIfTrue : doThisIfFalse
  }

  const selectAll = (value) => {
    setCheckedAll(value)
    setChecked((prevState) => {
      const newState = { ...prevState }
      for (const inputName in newState) {
        newState[inputName] = value
      }
      return newState
    })
  }

  // The following UseEffect is to ensure that the user cannot uncheck both the
  // ACTIVE and COMPLETED checkboxes. If a user does so, this logic will force
  // the ACTIVE checkbox to remain checked.
  useEffect(() => {

    // let areNoneChecked = Object.values(checked).every(entry => entry === false)
    let areNoneChecked = false
    if (checked.active === false && checked.completed === false) {
      areNoneChecked = true
    }

    if (areNoneChecked) toggleCheck('active')

  }, [checked])

  // useEffect(() => {
  //     let allChecked = true
  //     for (const inputName in checked) {
  //         if (checked[inputName] === false) {
  //             allChecked = false
  //         }
  //     }
  //     if (allChecked) {
  //         setCheckedAll(true)
  //     } else {
  //         setCheckedAll(false)
  //     }
  // }, [checked])

  // -----------------------------------------------------------------------------------  
  // Retrieve all ACTIVE HOMES related to user so a checkbox can be displayed for
  // each. If a home is contained within the CHECKED state array but it is no longer
  // in this list of active homes (user has recently inactivated the home), be sure
  // to remove it from the CHECKED state.
  // NOTE: ALL of the users ACTIVE homes will be kept in this list, and each object
  // will have the following 3 properties: id, nickname, status. The status attribute
  // will be used for tracking the boolean STATE of each related checkbox.
  useEffect(() => {
    const loadUserHomes = async () => {
      try {
        let tempList = []
        let userRes = await fetch(`/api/home/getbyuser/${userContext.user._id}`)
        let userObject = await userRes.json()
        if (userObject) {
          for (let index = 0; index < userObject.length; index++) {
            if (userObject[index].activated === true) { // active home found, add it to array
              // default all new homes that are not yet in STATE to be CHECKED (status = true)
              let tempStatus = true
              // if this home already exists in the current STATE, use it's current STATUS value.
              if (checked.homes?.length > 0) {
                let stateHome = checked.homes.find(obj => obj.id === userObject[index]._id)
                if (stateHome) {
                  tempStatus = stateHome.status
                }
              }
              let homeObjectToAdd = {
                id: userObject[index]._id,
                nickname: userObject[index].nickname,
                status: tempStatus
              }
              
              // PUSH new object onto our temporary array before finally setting the STATE array
              tempList = [...tempList, homeObjectToAdd]
              // sort list of homes in alphabetical order
              tempList.sort((a, b) => a.nickname.localeCompare(b.nickname))
              setActiveHomes(tempList)
              // setActiveHomes((activeHomes) => [
              //   ...activeHomes,
              //   homeObjectToAdd,
              // ])
            }
          }
          
          // Test list of homes already existing in CHECKED state array, and if any of
          // these homes do NOT exist in this current snapshot of active homes, DELETE
          // the home from the CHECKED state array.
          let checkHomeId = ""
          if (checked.homes?.length > 0) {
            for (let counter = 0; counter < checked.homes.length; counter++) {
              checkHomeId = checked.homes[counter].id
            
              if (!tempList.some(object => object.id == checkHomeId)) { // HomeId found in CHECKED state is NOT found anywhere in the list of user's ACTIVE Homes
                console.log("CalendarFilter UseEffect says, INACTIVE HOME needs to be removed from FILTER state !!! ")
                // setChecked( filter checked to remove deactivated home)
                let newObjectForChecked = {
                  active: checked.active,
                  completed: checked.completed,
                  homes: checked.homes.filter(item => item.id !== checkHomeId)
                }
                setChecked(newObjectForChecked) 
              }
            }
          }
        }
      }
      catch (err) {
        console.log("CalendarFilter UseEffect says, ERROR dealing with Home lists : ", err)
      }
    }

    loadUserHomes()   
  }, []) // Empty condition list should mean this gets triggered only on FIRST render
// -----------------------------------------------------------------------------------

return (
  <FlexSection column alignStart>
    {/* <button type='button' onClick={() => toggleCheck('active')}>toggleCheck('active')</button> */}
    <p>Homes:</p>
    {activeHomes.length > 0 &&
      activeHomes.map( ( listObject, index ) => {
        // return (<div key={object.id}> {object.nickname} - {object.id} </div>)
        return (<div key={listObject.id}>
          <FilterHomes item={listObject.nickname} itemId={listObject.id} defaultStatus={listObject.status} onChangeFunctionToCall={toggleHomeCheck} />
          </div>)
      })
    }
    <p>Status:</p>
    <FilterItem item='active' checked={checked['active']} onChange={() => toggleCheck('active')} />
    <FilterItem item='completed' checked={checked['completed']} onChange={() => toggleCheck('completed')} />
    {/* <FilterItem item='all' checked={checkedAll} onChange={(e) => selectAll(e.target.checked)} />       */}
  </FlexSection>
)
}

export default CalendarFilter