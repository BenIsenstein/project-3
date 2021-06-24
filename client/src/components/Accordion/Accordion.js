import React, { useState, useRef, useEffect } from 'react'
import styled, {css} from 'styled-components'

import DeleteEntryButton from '../DeleteEntryButton'
import { NextIcon } from '../../common'

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const AccordionHeader = styled.button`
  padding: 0.2em 1em;
  background-color: #ff8cc0;
  color: black;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  transition: background-color 0.6s ease;

  // &:hover {
  //   background-color: #A7275E;
  // }
`

const AccordionIcon = styled.span`
  margin-left: auto;
  transition: transform 0.6s ease;

  ${props => props.rotate && css`
    transform: rotate(90deg);
  `}
`

const AccordionContent = styled.div`
  background-color: #FFD4E7;
  overflow: hidden;
  transition: max-height 0.6s ease;
`

const AccordionContentContainer = styled.div`
  padding: 0.2em 1em;
`

const CustomAccordion = props => {
  const [active, setActive] = useState(false)
  const contentRef = useRef(null)

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
          {props.description}
          <DeleteEntryButton entryId={props._id} dates={props.dates} setDates={props.setDates} />          
        </AccordionContentContainer>
      </AccordionContent>
    </AccordionContainer>
  )
}

export default CustomAccordion