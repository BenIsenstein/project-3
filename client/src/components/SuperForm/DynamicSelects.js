import { SuperFormSelect } from './GroupOfInputs'
import { useEffect, useState, useContext } from 'react'
import UserContext from '../../UserContext'
import ComplexInput from './ComplexInput'

// It needs register to plug into SuperForm.
// register will take care of itself if you include 
// 'isCustomComponent=true' with this input in SuperForm.
const UserHomesSelect = props => {
  const [homeOptions, setHomeOptions] = useState([{value: 'loading...'}])
  const userContext = useContext(UserContext)
  const { setValue } = props

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        let homesRes = await fetch(`/api/home/getbyuser/activated/${userContext.user._id}`)
        let homesArray = await homesRes.json()

        //successful fetch check

        setHomeOptions(homesArray.map(home => {return {value: home._id, optionText: home.nickname || home.address}}))
        setValue('homeId', homesArray[0]._id)
      }
      catch (err) {
        alert("There was an error searching the homes registered to this user. We're working on it.")
        console.log(err)
      }
    }

    fetchHomes()

  }, [userContext.user._id, setValue])

  return <SuperFormSelect options={homeOptions} {...props} />
}

const HomeItemsSelect = ({...props}) => {
    const [itemOptions, setItemOptions] = useState([{value: 'loading...'}])
    const { setValue, name, watch } = props
    const homeId = watch("homeId")
    
    useEffect(() => {
        if (homeId === 'loading...') return
        if (['', undefined].includes(homeId)) return setItemOptions([{value: watch(name)}])
       
        let isMounted = true 
        const fetchHomes = async () => {
            try {
              setItemOptions([{value: 'loading...'}])
              let homeRes
              let homeObject
              let itemsObject
              let itemsArray
              

              if (isMounted) {
                homeRes = await fetch(`/api/home/get/${homeId}`)
                homeObject = await homeRes.json()
                console.log('homeObject: ', homeObject)
                itemsObject = homeObject.homeItems
                console.log('itemsObject: ', itemsObject)
                itemsArray = Object.keys(itemsObject).filter(key => itemsObject[key])  // an array of strings that produce truthy values in the itemsObject. ie - they were checked on adding the home.
                console.log('itemsArray: ', itemsArray)
              }

              // successful fetch check??

              if (isMounted) {
                setItemOptions(itemsArray.map(item => {return { value: item }}))
                if (props.isAddMode) setValue(name, itemsArray[0])
              }
            }
            catch (err) {
                alert("There was an error searching the items registered to this home. We're working on it.")
                console.log(err)
            }
        }
        fetchHomes()

        return () => isMounted = false

    }, [homeId, name, props.isAddMode, setValue, watch])
    
    return <SuperFormSelect options={itemOptions} {...props} />
}

export default UserHomesSelect
export { HomeItemsSelect }