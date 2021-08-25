import { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Page, PageContainer, FlexSection, Button } from '../common'
import DeactivateHome from '../components/DeactivateHome'
import SuperForm from '../components/SuperForm/SuperForm'
import GroupOfInputs, { SuperFormSelect, GroupOfCheckboxes } from '../components/SuperForm/GroupOfInputs'
import { defaultHomeItems } from '../variables'
import { useHandleUserStatus, useUpdateHome } from '../functions'

const HomeDetails = ({activatedHomesLength}) => {
  useHandleUserStatus()
  const { id } = useParams()
  const history = useHistory()
  const updateHome = useUpdateHome()
  const [home, setHome] = useState()
  
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
  }, [id])

  const inputs = [
    {
      name: "nickname",
      wrapperProps: {gridColumn: '1/2'}
    },
    {
      name:"homeIcon",
      labelText: "home Icon",
      wrapperProps: {gridColumn: '3/4'},
      //registerOptions: { required: "You must select a picture." },
      isCustomComponent: true, 
      as: SuperFormSelect,
      asName: "SuperFormSelect",
      options:[
        {value: ""},
        {value: "\u0394"},
        {value: "\u03A8"},
        {value: "\u03A6"},
        {value: "\u03B4"},
        {value: "\u03BB"},
        {value: "\u03C0"}
      ]
    },   
    {
      name: "address",
      registerOptions: { required: "You must input an address." },
    },
    {
      isCustomComponent: true,
      forwardErrors: true,
      as: GroupOfInputs,
      asName: "GroupOfInputs",
      inputs: [
        {
          name: "city",
          wrapperProps: {gridColumn: '1/2'},
          registerOptions: { required: "You must input a city." }
        },
        {
          name: "province",
          wrapperProps: {gridColumn: '3/4'},
          registerOptions: { required: "You must select a province." },
          isCustomComponent: true, 
          as: SuperFormSelect,
          asName: "SuperFormSelect",
          options: [
            {value: "BC"},
            {value: "AB"},
            {value: "SK"},
            {value: "MB"},
            {value: "ON"},
            {value: "QB"},
            {value: "PEI"},
            {value: "NL"},
            {value: "NB"},
            {value: "NS"},
            {value: "YT"},
            {value: "NWT"},
            {value: "NU"}
          ]
        },
        {
          name: "country",
          wrapperProps: {gridColumn: '1/2'},
          registerOptions: { required: "You must input a country." }
          // how to efficiently make a worldwide country select?
        },
        {
          name: "postalCode",
          wrapperProps: {gridColumn: '3/4'},
          labelText: "Postal Code",
          registerOptions: { required: "You must input a postal code." }
        }
      ]
    },
    {
      name: "residenceType",
      labelText: "Building Type",
      registerOptions: { required: "You must select a building type." },
      isCustomComponent: true, 
      as: SuperFormSelect,
      asName: "SuperFormSelect",
      options: [
        {value: "House"},
        {value: "Row/Townhouse"},
        {value: "Apartment"},
        {value: "Condo"},
        {value: "Duplex"},
        {value: "Mobile Home"},
      ]
    },
    {
      name: "squareFootage",
      labelText: "Floor Space (sqft)",
      registerOptions: { required: "You must input a square footage." },
      type: "number",
      min: "100"
    },
    {
      name: "yearBuilt",
      labelText: "Year Built",
      registerOptions: { required: "You must input a year built." },
      type: "number",
      min: "0"
    },
    {
      name: "possessionDateByOwner",
      labelText: "Possession date by the current property/unit owner",
      registerOptions: { required: "You must input a possession date." }
    },
    {
      name: 'homeItems',
      labelText: 'Items In Your Home',
      isCustomComponent: true,
      as: GroupOfCheckboxes,
      asName: "GroupOfCheckboxes",
      homeId: id,
      detailsUrl: `/api/home/get/${id}`,
      inputs: defaultHomeItems.map(inputName => {return { name: `homeItems.${inputName}` }}),
      defaultCheckboxNames: defaultHomeItems
    }
  ]
  

  return (
    <Page>
      <PageContainer flexColumn>
        <SuperForm 
          titleText={`Viewing Home - ${home?.nickname || home?.address}`}
          inputs={inputs}
          formMode="details"
          detailsUrl={`/api/home/get/${id}`}
          onSubmit={updateHome} 
        />
        <FlexSection fadeIn fullWidth marginTop1em>
          {home && <DeactivateHome fullWidth fullHeight home={home} activatedHomesLength={activatedHomesLength} />}
          <Button fullWidth onClick={() => history.goBack()}>BACK</Button>
        </FlexSection>
      </PageContainer>
    </Page>
  )
}

export default HomeDetails