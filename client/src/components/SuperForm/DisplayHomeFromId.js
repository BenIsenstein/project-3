import { useContext } from 'react'
import UserContext from '../../UserContext'
import ComplexInput from './ComplexInput'

const DisplayHomeFromId = props => {
    const userContext = useContext(UserContext)
    const home = userContext.user?.homes?.find(home => home._id === props.watch("homeId"))
    const homeText = home?.nickname || home?.address

    return <>
      <p>{homeText || "No home found"}</p>
      <ComplexInput {...props} labelHidden type="hidden" />
    </>
}

export default DisplayHomeFromId