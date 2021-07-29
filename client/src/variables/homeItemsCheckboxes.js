import { GroupOfCheckboxes } from "../components/SuperForm/GroupOfInputs/GroupOfInputs";

// wrapperProps: {gridColumn: '3/4'} - will need to be used for formatting

const homeItemsCheckboxes = {
  name: 'homeItems',
  registerOptions: {required: "You must pick at least one item."},
  labelText: 'Items In Your Home',
  forwardRegister: true,
  as: GroupOfCheckboxes,
  inputs: [
    {value: "Furnace"},
    {value: "Air Conditioner"},
    {value: "Water Heater"},
    {value: "Ducts"},
    {value: "Roof"},
    {value: "Irrigation"},
    {value: "Water Softener"},
    {value: "Floor Heating"},
    {value: "Humidifier"},
    {value: "Smoke Alarms"},
    {value: "Carbon Monoxide Alarms"},
    {value: "GFCI"},
    {value: "Eavestroughs"},
    {value: "Central Vacuum"},
    {value: "Windows"},
    {value: "Exterior Paint"},
    {value: "Hoses"},
    {value: "Aeration"}
  ]
}

export { homeItemsCheckboxes }