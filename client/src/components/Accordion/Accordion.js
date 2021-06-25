import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import styled, {css} from 'styled-components'

import DeleteEntryButton from '../DeleteEntryButton'
import { NextIcon, Button, slideInTop } from '../../common'

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${slideInTop} 0.6s ease-in;
`

const AccordionHeader = styled.button`
  background-color: ${props => props.theme.scd};
  color: black;
  display: flex;
  align-items: center;
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
  background-color: #fafafa;
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
        {/* <AccordionHeaderContainer>

        </AccordionHeaderContainer> */}
        <h3>{props.item || "No item"}</h3>
        <p>{props.task || "No task"}</p>        
        <AccordionIcon rotate={active}>
          <NextIcon />
        </AccordionIcon>        
      </AccordionHeader>

      <AccordionContent ref={contentRef}>
        <AccordionContentContainer>
          <p>{props.description}</p>
          <DeleteEntryButton entryId={props._id} dates={props.dates} setDates={props.setDates} />
          <Button important onClick={() => history.push(`/task/${props._id}`)}>Details</Button>          
        </AccordionContentContainer>
      </AccordionContent>

    </AccordionContainer>
  )
}

export default Accordion