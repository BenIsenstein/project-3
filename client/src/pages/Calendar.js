import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import CalendarListView from '../components/CalendarListView/CalendarListView'
import { ListIcon, CalendarIcon, AddIcon, ExitIcon, SwitchViewButton, Button, Page, PageContainer, FlexSection } from '../common'
import './Calendar.css'

import UserContext from '../UserContext'

const Calendar = () => {
    const [viewMode, setViewMode] = useState('ListView')
    const userContext = useContext(UserContext)
    
    //define state for refreshing the list view
    const [refresh, setRefresh] = useState()
    const reRenderList = () => setRefresh({})
    let history = useHistory()

    // return (
    //     <Page>
    //         <PageContainer>
    //             <div className='calendar-top-options'>
    //                 <div className='calendar-add-task'>
    //                     <Button onClick={() => history.push(`/addentry`)}><AddIcon />New Task</Button>
    //                 </div>
    //                 <div className='calendar-logout'>
    //                 <Button onClick={() => userContext.logOut()}><ExitIcon />Log Out</Button>
    //                 </div>
    //                 <div className='calendar-view-ctrl'>  
    //                     <SwitchViewButton 
    //                         activeView={viewMode === 'ListView'} 
    //                         onClick={() => setViewMode('ListView')}
    //                     >
    //                         <ListIcon />
    //                     </SwitchViewButton>
    //                     <SwitchViewButton 
    //                         activeView={viewMode === 'CalendarView'} 
    //                         onClick={() => setViewMode('CalendarView')}
    //                     >
    //                         <CalendarIcon />
    //                     </SwitchViewButton>
    //                 </div>                    
    //             </div>
    //             <div>
    //                 Displaying home maintenance events for {userContext.userName}
    //             </div>
    //             <div className='calendar-view-content'>
    //                 {viewMode === 'ListView' && <CalendarListView reRenderList={reRenderList} />}
    //             </div>
    //         </PageContainer>
    //     </Page>
    // )

    return (
        <Page>
            <PageContainer>
                <FlexSection spaceBetween>
                    <FlexSection>
                        <Button onClick={() => history.push(`/addentry`)}><AddIcon />New Task</Button>                        
                    </FlexSection>

                    <FlexSection>
                        <Button onClick={() => userContext.logOut()}><ExitIcon />Log Out</Button>                        
                    </FlexSection>

                    <FlexSection>
                        <SwitchViewButton 
                            activeView={viewMode === 'ListView'} 
                            onClick={() => setViewMode('ListView')}
                        >
                            <ListIcon />
                        </SwitchViewButton>
                        <SwitchViewButton 
                            activeView={viewMode === 'CalendarView'} 
                            onClick={() => setViewMode('CalendarView')}
                        >
                            <CalendarIcon />
                        </SwitchViewButton>                        
                    </FlexSection>
                </FlexSection>


                Displaying home maintenance events for {userContext.userName}

                {viewMode === 'ListView' && <CalendarListView reRenderList={reRenderList} />}
            </PageContainer>
        </Page>
    )
}

export default Calendar