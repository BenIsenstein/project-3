import { useState } from 'react'
import { Input, FlexSection, EyeIcon, EyeSlashIcon } from '../../common'

const ToggleVisibleInput = props => {
    const [inputTextVisible, setInputTextVisible] = useState(props.startVisible || false)
    const toggleInputTextVisible = () => setInputTextVisible(!inputTextVisible)
    
    return <FlexSection fullWidth>
      <Input 
        type={!inputTextVisible ? "password" : "text"}
        {...props.register(props.name, props.registerOptions)}
        {...props} 
      />
      {inputTextVisible 
        ? <EyeIcon onClick={toggleInputTextVisible} />
        : <EyeSlashIcon onClick={toggleInputTextVisible} />
      }
    </FlexSection>
}

export default ToggleVisibleInput