import styled from 'styled-components'

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: .9em;

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
    }

    .body {
      position: relative;
      z-index: 0;

      .tr {
        border-bottom: 1px solid ${props => props.theme.titleColor};

        &:hover {
          background-color: ${props => props.theme.prmLt};
        }        
      }
    }
  }
`