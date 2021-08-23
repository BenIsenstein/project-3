import { useContext } from 'react'
import { Page, PageContainer } from '../common'
import SuperForm from '../components/SuperForm/SuperForm'
import GroupOfInputs, { SuperFormSelect, GroupOfCheckboxes, SimpleGroupOfCheckboxes } from '../components/SuperForm/GroupOfInputs'
import { useAddHome, useHandleUserStatus } from '../functions'
import UserContext from '../UserContext'
import { defaultHomeItems } from '../variables'

const AddHomePage = () => {
  useHandleUserStatus()
  const userContext = useContext(UserContext)
  const addHome = useAddHome()
  
  const inputs = [
    {
      name: "nickname",
      wrapperProps: {gridColumn: '1/2'},
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
            {value: "AB"},
            {value: "BC"},
            {value: "SK"},
            {value: "MB"},
            {value: "ON"},
            {value: "QC"},
            {value: "PE"},
            {value: "NL"},
            {value: "NB"},
            {value: "NS"},
            {value: "YT"},
            {value: "NT"},
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
      inputs: defaultHomeItems.map(inputName => {return { name: `homeItems.${inputName}` }})
    }
  ]

  return (
    <Page>
      <PageContainer flexColumn>
        <SuperForm 
          titleText={userContext.user?.homes?.length ? "New Home" : "Add your first home!"}
          inputs={inputs}
          onSubmit={addHome} //addHome
        />
      </PageContainer>
    </Page>
  )
}

export default AddHomePage