import styled from 'styled-components'
import { Label, Checkbox } from "../../common"

const CheckboxDescription = styled.span`
    margin-left: .2em;
    text-transform: capitalize;
    cursor: pointer;
`

// const CustomCheckbox = styled.span`
//     position: absolute;
//     height: 1em;
//     width: 1em;
//     background-color: black;
// `

const FilterItem = ({ item, checked, onChange }) => {
    return (
        <div>                
            <Checkbox  
                id={item} 
                name={item} 
                checked={checked}
                onChange={onChange}
            />
            <Label htmlFor={item}>
                <CheckboxDescription>{item}</CheckboxDescription>  
                {/* <CustomCheckbox /> */}
            </Label>            
        </div>                    
    )
}

export default FilterItem
