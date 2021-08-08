import styled from 'styled-components'

export const Styles = styled.div`
  .table {
    font-family: Arial, Helvetica, sans-serif;
    color:#5e868c;
    

    .tr {
        text-align: left;
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
      :hover {
          background-color: #ddd
      }
      background-color: #f5f9fa
    }

    .th {
        font-size: 100%;
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        background-color: rgba(243, 219, 207,1);
        color: #5e868c;
    },
    .td {
        border: 1px solid rgba(252,242,237,1);
        overflow: hidden;

      :last-child {
        border-right: 0;
      }
    }

    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }

      .header {
        top: 0;
        box-shadow: 0px 3px 3px #ccc;
      }


      .body {
        position: relative;
        z-index: 0;
      }

      [data-sticky-td] {
        position: sticky;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
      }
    }
  }
`;