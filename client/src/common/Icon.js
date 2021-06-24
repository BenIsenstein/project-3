import styled from 'styled-components'
import {ListUl} from '@styled-icons/boxicons-regular/ListUl'
import {Calendar} from '@styled-icons/boxicons-regular/Calendar'
import {NavigateNext} from '@styled-icons/material-rounded/NavigateNext'

const ListIcon = styled(ListUl)`
    height: 2em;
`

const CalendarIcon = styled(Calendar)`
    height: 2em;
`

const NextIcon = styled(NavigateNext)`
    height: 2em;
    margin-left: auto;
    transition: transform 0.6s ease;
`

export {ListIcon, CalendarIcon, NextIcon}