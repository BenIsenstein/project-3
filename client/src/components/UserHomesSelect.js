import { SuperFormSelect } from './SuperForm/GroupOfInputs/GroupOfInputs'
import { useEffect, useState, useContext } from 'react'
import UserContext from '../UserContext'

// The only CRUCIAL props are 'register' and 'name'. 
// These will plug it into SuperForm
// Make sure to include 'forwardRegister=true' with this input in SuperForm.
const UserHomesSelect = props => {
    const [homeOptions, setHomeOptions] = useState([])
    const userContext = useContext(UserContext)

    useEffect(() => {
        const fetchHomes = async () => {
            try {
              let homesRes = await fetch(`/api/home/getbyuser/${userContext.user._id}`)
              let homesArray = await homesRes.json()

              //successful fetch check

              setHomeOptions(homesArray.map(home => {return {value: home._id, optionText: home.nickname || home.address}}))
            }
            catch (err) {
                console.log(err)
            }
        }

        fetchHomes()

    }, [userContext.user._id])

    return homeOptions.length>0 && <SuperFormSelect options={homeOptions} {...props} />
}

export default UserHomesSelect