import { GroupOfCheckboxes } from "../components/SuperForm/GroupOfInputs";

const defaultInputNames = [
  "Air Conditioner",
  "Central Vacuum",    
  "Ducts",    
  "Electric & Hydronic Heating",    
  "Exterior",    
  "Furnace",
  "Garage",    
  "GFCI",    
  "Gutters",    
  "Humidifier",  
  "Interior",      
  "Irrigation",
  "Landscape",    
  "Water Heater",
  "Water Softener",
  "Windows",    
  "Roof",
  "Smoke/CO Alarms"
]

const homeItemsCheckboxes = {
  name: 'homeItems',
  labelText: 'Items In Your Home',
  isCustomComponent: true,
  as: GroupOfCheckboxes,
  inputs: defaultInputNames.map(inputName => {return { name: inputName }}),
  defaultInputNames: defaultInputNames
}

export { homeItemsCheckboxes }