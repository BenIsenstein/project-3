import React, { useEffect, useState, useContext } from 'react'
import { FlexSection } from "../../common"
import UserContext from '../../UserContext'
import FilterItem from './FilterItem'
import FilterHomes from './FilterHomes'

const CalendarFilter = ({ checkedAll, setCheckedAll, checked, setChecked }) => {

  const userContext = useContext(UserContext)
  const [activeUserHomes, setActiveUserHomes] = useState([])

  const toggleCheck = (inputName) => {
    setChecked((prevState) => {
      const newState = { ...prevState }
      // console.log(`prevState[${inputName}]: `, prevState[inputName])
      newState[inputName] = !prevState[inputName]
      return newState
    })
  }

  const toggleHomeCheck = (e) => {
    // to find out if it's checked or not; returns true or false
    let targetChecked = e.checked

    // to get the checked value
    let targetCheckedValue = e.value

    // to get the checked name
    let targetCheckedName = e.name

    console.log("toggleHomeCheck function says, targetChecked = ", targetChecked)
    console.log("toggleHomeCheck function says, targetCheckedValue = ", targetCheckedValue)
    console.log("toggleHomeCheck function says, targetCheckedName = ", targetCheckedName)


  // const toggleHomeCheck = (inputName, homeId, status) => {
    // console.log("toggleHomeCheck function says, inputName = ", inputName)
    // console.log("toggleHomeCheck function says, homeId = ", homeId)
    // console.log("toggleHomeCheck function says, status = ", status)
    // Add homeId to the checked.homes array if the home has been selected.
    // If NOT checked, remove the homeId from the checked.homes array.

    // setChecked((prevState) => {
    //   let newHomeState = { ...prevState }
      // console.log(`prevState[${inputName}]: `, prevState[inputName])
    //   newHomeState[inputName] = !prevState[inputName]
    //   return newHomeState
    // })
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

  useEffect(() => {
    let areNoneChecked = Object.values(checked).every(entry => entry === false)

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
  // NOTE: Only active homes that have been selected (checked ON) by user should get
  // added to the CHECKED state array of homes.
  useEffect(() => {
    const loadUserHomes = async () => {
      try {
        setActiveUserHomes([]) // start from fresh list every time this useEffect is triggered
        let tempList = []
        let userRes = await fetch(`/api/home/getbyuser/${userContext.user._id}`)
        let userObject = await userRes.json()
        if (userObject) {
          for (let index = 0; index < userObject.length; index++) {
            if (userObject[index].activated === true) { // active home found, add it to array
              let homeObjectToAdd = {
                id: userObject[index]._id,
                nickname: userObject[index].nickname
              }
              // PUSH new object onto our temporary array before finally setting the STATE array
              // temporaryActiveHomesList.push(homeObjectToAdd)
              // setActiveUserHomes(temporaryActiveHomesList)
              tempList = [...tempList, homeObjectToAdd]
              setActiveUserHomes(tempList)
              // setActiveUserHomes((activeUserHomes) => [
              //   ...activeUserHomes,
              //   homeObjectToAdd,
              // ])
            }
          }
          
          // Test list of homes already existing in CHECKED state array, and if any of
          // these homes do NOT exist in this current snapshot of active homes, DELETE
          // the home from the CHECKED state array.
          let checkHomeId = ""
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
    {activeUserHomes.length > 0 &&
      activeUserHomes.map( ( listObject, index ) => {
        // return (<div key={object.id}> {object.nickname} - {object.id} </div>)
        return (<div key={listObject.id}>
          <FilterHomes item={listObject.nickname} itemId={listObject.id} defaultStatus={(true)} onChangeFunctionToCall={toggleHomeCheck} />
          {/* <FilterHomes item={listObject.nickname} itemId={listObject.id} defaultStatus={(true)} onChangeFunctionToCall={(currentStatus) => toggleHomeCheck(listObject.nickname, listObject.id, currentStatus)} /> */}
          {/* <FilterHomes item={listObject.nickname} itemId={listObject.id} defaultStatus={()=> checked.homes.some(object => object.id === listObject.id)} onChangeFunctionToCall={(currentStatus) => toggleHomeCheck(listObject.nickname, listObject.id, currentStatus)} /> */}
          {/* <FilterItem item={object.nickname} checked={checked['active']} onChange={() => toggleCheck('active')} /> */}
          </div>)
      })
    }

    {/* {activeUserHomes.length > 0 &&
      activeUserHomes.map( (anObjectMapped, index) => {
        return (
          <p key={`${anObjectMapped.id}_{anObjectMapped.nickname}`}>
            {anObjectMapped.nickname} - {anObjectMapped.id}
          </p>
      )})
    } */}
    
    <p>Status:</p>
    <FilterItem item='active' checked={checked['active']} onChange={() => toggleCheck('active')} />
    <FilterItem item='completed' checked={checked['completed']} onChange={() => toggleCheck('completed')} />
    {/* <FilterItem item='all' checked={checkedAll} onChange={(e) => selectAll(e.target.checked)} />       */}
  </FlexSection>
)
}

export default CalendarFilter