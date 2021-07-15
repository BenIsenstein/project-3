import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import styled, {css} from 'styled-components'

// import DeleteEntryButton from '../DeleteEntryButton'
import { NextIcon, Button, slideInTop, FlexSection } from '../../common'

const AccordionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  animation: ${slideInTop} 0.6s ease-in;
`

const AccordionHeader = styled.button`
  background: ${props => props.theme.scd};
  display: flex;
  align-items: center;
  font-size: 1em;
  border: none;
  outline: none;
  transition: background-color 0.6s ease;
`

const AccordionIcon = styled.span`
  margin-left: auto;
  transition: transform 0.6s ease;

  ${props => props.rotate && css`
    transform: rotate(90deg);
  `}
`

const AccordionContent = styled.div`
  background-color: ${props => props.theme.scdLt};
  overflow: hidden;
  transition: max-height 0.6s ease;
`

const AccordionContentContainer = styled.div`
  padding: 0.5em 1em 0.8em 1em;
`

const Accordion = props => {
  const [active, setActive] = useState(false)
  const contentRef = useRef(null)

  let history = useHistory()

  useEffect(() => {
    contentRef.current.style.maxHeight = active ? `${contentRef.current.scrollHeight}px` : '0px'
  }, [contentRef, active])

  const toogleActive = () => {
    setActive(!active)
  }

  return (
    <AccordionContainer>

      <AccordionHeader onClick={toogleActive}>
        <h4>{props.item || "No item"}</h4>
        <p>{props.task || "No task"}</p>            
        <AccordionIcon rotate={active}>
          <NextIcon />
        </AccordionIcon>        
      </AccordionHeader>

      <AccordionContent ref={contentRef}>
        <AccordionContentContainer>
          <p>{props.description}</p>
          <FlexSection justifyEnd>
            <Button important onClick={() => history.push(`/task/${props._id}`)}>Details</Button>              
          </FlexSection>                  
        </AccordionContentContainer>
      </AccordionContent>

    </AccordionContainer>
  )
}

export default Accordion