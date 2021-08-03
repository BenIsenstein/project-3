import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Page, PageContainer } from '../common'
import DeactivateHome from '../components/DeactivateHome'

const HomeDetails = () => {
    const { id } = useParams()

    const [home, setHome] = useState([])

    useEffect(() => {
        const fetchHomeDetails = async () => {
            try {
            let homeRes = await fetch(`/api/home/get/${id}`)
            let homeObject = await homeRes.json()
            
            setHome(homeObject)
            console.log(home)
            }  
            catch (err) {
            console.log(err)
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
        <DeactivateHome home={home}/>
      </PageContainer>
    </Page>
  )
}

export default HomeDetails