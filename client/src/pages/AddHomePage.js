import { useContext } from 'react'
import { Page, PageContainer, TreehouseIcon, BuildingHouseIcon, HouseSidingIcon, LighthouseIcon, HouseUserIcon } from '../common'
import SuperForm from '../components/SuperForm/SuperForm'
import GroupOfInputs, { SuperFormSelect, useGroupOfCheckboxes } from '../components/SuperForm/GroupOfInputs'
import { useAddHome, useHandleUserStatus } from '../functions'
import UserContext from '../UserContext'
import { defaultHomeItems } from '../variables'


const AddHomePage = () => {
  useHandleUserStatus()
  const userContext = useContext(UserContext)
  const addHome = useAddHome()
  const { customItems, setCustomItems, GroupOfCheckboxes } = useGroupOfCheckboxes()
  //const { SuperForm } = useSuperForm()
  
  const inputs = [
    // {
    //   name: 'activated',
    //   type: 'checkbox',
    //   defaultChecked: true,
    //   hidden: true,
    // },
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
      options: [
        {value: 1, optionText:"Hello"},
        {value: 2, optionText:<BuildingHouseIcon/>},
        {value: 3, optionText:<HouseSidingIcon/>}, 
        {value: 4, optionText:<HouseUserIcon/>},
        {value: 5, optionText:<LighthouseIcon/>},
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
      setCustomItems: setCustomItems,
      inputs: defaultHomeItems.map(inputName => {return { name: inputName }})
    }
  ]
  console.log("icons array",inputs.find(input => input.name==="homeIcon").options[2].optionText)
  return (
    <Page>
      <PageContainer flexColumn>
        <SuperForm 
          titleText={userContext.user?.homes?.length ? "New Home" : "Add your first home!"}
          inputs={inputs}
          onSubmit={addHome}
        />
      </PageContainer>
    </Page>
  )
}

export default AddHomePage