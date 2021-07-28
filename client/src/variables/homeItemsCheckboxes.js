import { GroupOfCheckboxes } from "../components/SuperForm/GroupOfInputs/GroupOfInputs";

// wrapperProps: {gridColumn: '3/4'} - will need to be used for formatting

const homeItemsCheckboxes = {
  name: 'homeItems',
  //registerOptions: {required: "ITEMS IS REQUIRED"},
  labelText: 'Items In Your Home',
  as: GroupOfCheckboxes,
  inputs: [
    {value: "furnace"},
    {value: "airConditioner", labelText: "Air Conditioner"},
    {value: "waterHeater", labelText: "Water Heater"},
    {value: "ducts"},
    {value: "roof"},
    {value: "irrigation"},
    {value: "waterSoftener", labelText: "Water Softener"},
    {value: "floorHeating", labelText: "Floor Heating"},
    {value: "humidifier"},
    {value: "smokeAlarms", labelText: "Smoke Alarms"},
    {value: "carbonMonoxideAlarms", labelText: "Carbon Monoxide Alarms"},
    {value: "GFCI"},
    {value: "eavestroughs"},
    {value: "centralVacuum", labelText: "Central Vacuum"},
    {value: "windows"},
    {value: "exteriorPaint", labelText: "Exterior Paint"},
    {value: "hoses"},
    {value: "aeration"}
  ]
}

export { homeItemsCheckboxes }