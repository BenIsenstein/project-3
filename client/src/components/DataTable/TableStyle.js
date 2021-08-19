import styled from 'styled-components'

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: .9em;
  table-layout: auto;
  width: 100%;
  padding: 10px;
  

  .td {
    padding: .1em 0;
  }


  .tr {
    color: ${props => props.theme.contentColor};
    padding: .4em 0;
    
  }

  .sticky {
    .header {
      top: 0;
      background-color: ${props => props.theme.lightBkg};
      font-weight: 500;
      position: sticky;
      z-index: 1;
      box-shadow: 0px 3px 3px #ccc;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }


    .body {
      position: auto;
      z-index: 0;

      .tr {
        border: 0.5px solid ${props => props.theme.titleColor};
        border-spacing: 15px 15 px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        

        &:hover {
          background-color: ${props => props.theme.prmLt};
        } 

        [data-sticky-td] {
        position: sticky;
        
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
        

      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
  
      }       
      }
    }
  }
`