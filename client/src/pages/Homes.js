import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../UserContext'
import { Page, PageContainer, Button, SwitchViewButton, FlexSection, FormSectionTitle, FormSeparator, PencilIcon, HomeAddIcon, ShareIcon } from '../common'
import { validatePassWithMessage, useUpdateAccount, useChangePassword, useHandleUserStatus } from '../functions'
import SuperForm from '../components/SuperForm/SuperForm'
import ToggleVisibleInput from '../components/SuperForm/ToggleVisibleInput'
import GroupOfInputs, { SuperFormSelect } from '../components/SuperForm/GroupOfInputs'
  
const Homes = ({setActivatedHomesLength}) => {
  useHandleUserStatus()
  const history = useHistory()
  const userContext = useContext(UserContext)
  const updateAccount = useUpdateAccount()
  const changePassword = useChangePassword()
  const [undergoingPasswordChange, setUndergoingPasswordChange] = useState(false)
  const [activatedHomes, setActivatedHomes] = useState([])
  const [deactivatedHomes, setDeactivatedHomes] = useState([])


    // Effect to fetch all entries
    useEffect(() => {
      if (!userContext.user) return
  
      const fetchHomes = async () => {
        try {
          let activatedHomesRes = await fetch(`/api/home/getbyuser/activated/${userContext.user._id}`)
          let activatedHomesObject = await activatedHomesRes.json()
  
          let deactivatedHomesRes = await fetch(`/api/home/getbyuser/deactivated/${userContext.user._id}`)
          let deactivatedHomesObject = await deactivatedHomesRes.json()
        
          setActivatedHomes(activatedHomesObject)
          setActivatedHomesLength(activatedHomesObject.length)
          setDeactivatedHomes(deactivatedHomesObject)
        }  
        catch (err) {
          console.log(err)
          alert(`
            There was an error loading your homes. 
            We're fixing it as fast as we can.
          `)
        }
      }
      fetchHomes()
  
    }, [userContext.user, setActivatedHomesLength])
  
    return (
      <Page>
        <PageContainer flexColumn>
          <FlexSection alignCenter>
            <FormSectionTitle style={{margin: '0 0 .2em 0'}}>Manage Home(s)</FormSectionTitle>
            <Button inline onClick={() => history.push('/new-home')}><HomeAddIcon /></Button>
          </FlexSection>
          {activatedHomes.map((home, index) => {
            return (
              <FlexSection key={index}>
                <SwitchViewButton edit style={{marginRight: '.6em'}}><PencilIcon onClick={() => history.push(`/home/${home._id}`)} /></SwitchViewButton>
                <p>{home.nickname} - {home.address}, {home.city} {home.province}, {home.postalCode}</p>
              </FlexSection>
            )
          })}
  
          {deactivatedHomes.length > 0 && <>
            <FlexSection alignCenter>
              <FormSectionTitle style={{margin: '1em 0 .2em 0'}}>Deactivated Home(s)</FormSectionTitle>
            </FlexSection>
            {deactivatedHomes.map((home, index) => {
              return (
                <FlexSection key={index}>
                  <SwitchViewButton edit style={{marginRight: '.6em'}}><PencilIcon onClick={() => history.push(`/home/${home._id}`)} /></SwitchViewButton>
                  <p>{home.nickname} - {home.address}, {home.city} {home.province}, {home.postalCode}</p>
                </FlexSection>
              )
            })}
          </>}
        </PageContainer>
      </Page>
    )
  }
  
  export default Homes