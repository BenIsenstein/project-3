import { GroupOfCheckboxes } from "../components/SuperForm/GroupOfInputs";

// wrapperProps: {gridColumn: '3/4'} - will need to be used for formatting

const homeItemsCheckboxes = {
  name: 'homeItems',
  registerOptions: {required: "You must pick at least one item."},
  labelText: 'Items In Your Home',
  isCustomComponent: true,
  as: GroupOfCheckboxes,
  inputs: [
    {value: "Air Conditioner"},
    {value: "Central Vacuum"},    
    {value: "Ducts"},    
    {value: "Electric & Hydronic Heating"},    
    {value: "Exterior"},    
    {value: "Furnace"},
    {value: "Garage"},    
    {value: "GFCI"},    
    {value: "Gutters"},    
    {value: "Humidifier"},  
    {value: "Interior"},      
    {value: "Irrigation"},
    {value: "Landscape"},    
    {value: "Water Heater"},
    {value: "Water Softener"},
    {value: "Windows"},    
    {value: "Roof"},
    {value: "Smoke/CO Alarms"}
  ]
}

export { homeItemsCheckboxes }