import styled from 'styled-components'

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: .8em;
  width: 100%;
  padding: 1em 0;
  
  .th {
    padding: .1em .2em;
  }

  .td {
    padding: .1em .2em;
  }

  .tr {
    color: ${props => props.theme.contentColor};
    padding: .4em 0;
  }

  .sticky {
    .header {
      top: 0;
      background-color: ${props => props.theme.lightBkg};
      position: sticky;
      z-index: 1;
    }

    .body {
      position: auto;
      z-index: 0;

      .tr {
        border-bottom: 0.5px solid ${props => props.theme.titleColor};  

        &:hover {
          background-color: ${props => props.theme.prmLt};
        } 

        // [data-sticky-td] {
        // position: sticky;
        
      }

      // [data-sticky-last-left-td] {
      //   box-shadow: 2px 0px 3px #ccc;
        

      // [data-sticky-first-right-td] {
      //   box-shadow: -2px 0px 3px #ccc;
      // }

      }
    }
  }
`