import styled from 'styled-components'
import { Label, Checkbox } from "../../common"

const CheckboxDescription = styled.span`
    margin-left: .2em;
    text-transform: capitalize;
`

const FilterItem = ({ item, checked, onChange }) => {
    return (
        <div>
            <Checkbox 
                type='checkbox' 
                id={item} 
                name={item} 
                value={item}
                checked={checked}
                onChange={onChange}
            />
            <Label htmlFor={item}>
                <CheckboxDescription>{item}</CheckboxDescription>
            </Label>            
        </div>                    
    )
}

export default FilterItem
