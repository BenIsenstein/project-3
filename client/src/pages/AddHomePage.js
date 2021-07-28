import { useState } from 'react'
import { Page, PageContainer, Button, FlexSection } from '../common'
import FormTemplate from '../components/FormTemplate/FormTemplate'
import GroupOfInputs, { SuperFormSelect } from '../components/FormTemplate/GroupOfInputs/GroupOfInputs'
import { homeItemsCheckboxes } from '../variables'

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
        forwardRegister: true, // starting by not passing the register and see what happens
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
        as: GroupOfInputs,
        inputs: [
          {
            name: "city",
            registerOptions: { required: "You must input a city." }
          },
          {
            name: "province",
            wrapperProps: {gridColumn: '3/4'},
            registerOptions: { required: "You must select a province." },
            forwardRegister: true, // starting by not passing the register and see what happens
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
        ...homeItemsCheckboxes
    },
    // {
    //     //add your own item
    // }
]

const AddHomePage = () => {
  return (
    <Page>
      <PageContainer flexColumn>
        <FormTemplate 
          titleText="Add A Home"
          inputs={inputs}
          onSubmit={data => console.log('Add a home dad: ', data)}
        />  
      </PageContainer>
    </Page>
  )
}

export default AddHomePage