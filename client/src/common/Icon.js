import styled from 'styled-components'
import {ListUl} from '@styled-icons/boxicons-regular/ListUl'
import {Calendar} from '@styled-icons/boxicons-regular/Calendar'
import {NavigateNext} from '@styled-icons/material-rounded/NavigateNext'
import {NavigateBefore} from '@styled-icons/material-rounded/NavigateBefore'
import {Plus} from '@styled-icons/heroicons-solid/Plus'

const ListIcon = styled(ListUl)`
    height: 1.8em;
`

const CalendarIcon = styled(Calendar)`
    height: 1.8em;
`

const NextIcon = styled(NavigateNext)`
    height: 2em;
    margin-left: auto;
    transition: transform 0.6s ease;
`

const BackIcon = styled(NavigateBefore)`
    height: 2em;
    margin-left: -0.8em;
`

const AddIcon = styled(Plus)`
    height: 2em;
    margin-left: -0.5em;
`

export {ListIcon, CalendarIcon, NextIcon, BackIcon, AddIcon}