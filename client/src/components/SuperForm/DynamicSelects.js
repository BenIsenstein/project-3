import { SuperFormSelect } from './GroupOfInputs'
import { useEffect, useState, useContext } from 'react'
import UserContext from '../../UserContext'

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
        let homesRes = await fetch(`/api/home/getbyuser/${userContext.user._id}`)
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

const HomeItemsSelect = props => {
    const [itemOptions, setItemOptions] = useState([{value: 'loading...'}])
    const homeId = props.watch("homeId")
    const { setValue, name } = props
    
    useEffect(() => {
        if (['loading...', undefined].includes(homeId)) return
       
        let isMounted = true 
        const fetchHomes = async () => {
            try {
              setItemOptions([{value: 'loading...'}])
              let homeRes
              let homeObject
              let itemsArray

              if (isMounted) {
                homeRes = await fetch(`/api/home/get/${homeId}`)
                homeObject = await homeRes.json()
                itemsArray = homeObject.homeItems
              }

              //successful fetch check??

              if (isMounted) {
                setItemOptions(itemsArray.map(item => {return { value: item }}))
                setValue(name, itemsArray[0])
              }
            }
            catch (err) {
                alert("There was an error searching the items registered to this home. We're working on it.")
                console.log(err)
            }
        }
        fetchHomes()

        return () => isMounted = false

    }, [homeId])

    return <SuperFormSelect options={itemOptions} {...props} />
}

export default UserHomesSelect
export { HomeItemsSelect }