import { useState } from 'react'
import { Page, PageContainer } from '../common'
import SuperForm from '../components/SuperForm/SuperForm'
import GroupOfInputs, { GroupOfCheckboxes, SuperFormSelect } from '../components/SuperForm/GroupOfInputs/GroupOfInputs'
import { homeItemsCheckboxes } from '../variables'
import CustomItemModal from '../components/Modals/CustomItemModal'
import ComplexInput from '../components/SuperForm/ComplexInput/ComplexInput'
import { useAddHome } from '../functions'

const AddHomePage = () => {
  const [customItems, setCustomItems] = useState([])
  const [newItem, setNewItem] = useState()
  const addHome = useAddHome()
  const { inputs: defaultItemsCheckboxes, ...restOfDefaultItems } = homeItemsCheckboxes
  const inputs = [
    {
      name: "address",
      registerOptions: { required: "You must input an address." },
    },
    {
      name: "nickname"
    },
    {
      name: "residenceType",
      labelText: "Type of residence",
      registerOptions: { required: "You must select a type of residence." },
      forwardRegister: true, 
      as: SuperFormSelect,
      options: [
        {value: "house"},
        {value: "duplex"},
        {value: "condo"},
        {value: "apartment"}
      ]
    },
    {
      name: "squareFootage",
      labelText: "Square Footage",
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
      forwardRegister: true,
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
          forwardRegister: true, 
          as: SuperFormSelect,
          options: [
            {value: "BC"},
            {value: "AB"},
            {value: "SK"},
            {value: "MA"},
            {value: "ON"},
            {value: "QB"},
            {value: "PEI"},
            {value: "NL"},
            {value: "NB"},
            {value: "NS"},
            {value: "YK"},
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
      ...restOfDefaultItems,
      inputs: [...defaultItemsCheckboxes, ...customItems]
    }
  ]

  return (
    <Page>
      <PageContainer flexColumn>
        <SuperForm 
          titleText="Add A Home"
          inputs={inputs}
          onSubmit={addHome}
          BeforeSubmitButton={<CustomItemModal 
            modalContent={<ComplexInput 
              name="Item name"
              onChange={event => setNewItem(event.target.value)}
            />}
            actionOnConfirm={() => 
              setCustomItems([...customItems, { value: newItem, defaultChecked: true }])
            }
          />}
        />
      </PageContainer>
    </Page>
  )
}
//modalContent
// actionOnConfirm

export default AddHomePage