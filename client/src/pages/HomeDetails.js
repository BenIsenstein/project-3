import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Page, PageContainer, FlexSection, Button } from '../common'
import DeactivateHome from '../components/DeactivateHome'

const HomeDetails = ({activatedHomesLength}) => {
  const { id } = useParams()
  const history = useHistory()

  const [home, setHome] = useState([])

  useEffect(() => {
    const fetchHomeDetails = async () => {
        try {
        let homeRes = await fetch(`/api/home/get/${id}`)
        let homeObject = await homeRes.json()
        
        setHome(homeObject)
        }  
        catch (err) {
        alert(`
            There was an error loading your home details. 
            We're fixing it as fast as we can.
        `)
        }
    }
    fetchHomeDetails()
  }, [])

  return (
    <Page>
      <PageContainer flexColumn>
        <FlexSection fadeIn fullWidth marginTop1em>
          <DeactivateHome fullWidth fullHeight home={home} activatedHomesLength={activatedHomesLength} />
          <Button fullWidth onClick={() => history.push(`/calendar`)}>BACK TO ACCOUNT</Button>
        </FlexSection>
      </PageContainer>
    </Page>
  )
}

export default HomeDetails