import styled from 'styled-components'
import {ListUl} from '@styled-icons/boxicons-regular/ListUl'
import {Calendar} from '@styled-icons/boxicons-regular/Calendar'
import {NavigateNext} from '@styled-icons/material-rounded/NavigateNext'
import {NavigateBefore} from '@styled-icons/material-rounded/NavigateBefore'
import {Plus} from '@styled-icons/heroicons-solid/Plus'
import {Trash} from '@styled-icons/octicons/Trash'
import {House} from '@styled-icons/material-rounded/House'
import {Pencil} from '@styled-icons/foundation/Pencil'
import {Exit} from '@styled-icons/ionicons-outline/Exit'
import {Done} from '@styled-icons/material-rounded/Done'

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
    fill: ${props => props.theme.prm};
`

const BackIcon = styled(NavigateBefore)`
    height: 2em;
    margin-left: -0.8em;
`

const AddIcon = styled(Plus)`
    height: 2em;
    margin-left: -0.5em;
`

const TrashIcon = styled(Trash)`
    height: 1em;
    // margin: 0 -0.4em;
    fill: ${props => props.theme.prm};
`

const HouseIcon = styled(House)`
    height: 10em;
    fill: ${props => props.theme.prm};
    cursor: pointer;
`

const PencilIcon = styled(Pencil)`
    height: 1.6em;
    fill: ${props => props.theme.prm};
    cursor: pointer;
`

const ExitIcon = styled(Exit)`
    margin-right: .4em;
    height: 2em;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
`

const CheckIcon = styled(Done)`
    height: 1.8em;
    fill: ${props => props.theme.prm};
    cursor: pointer;
`

export {ListIcon, CalendarIcon, NextIcon, BackIcon, AddIcon, TrashIcon, HouseIcon, PencilIcon, ExitIcon, CheckIcon}