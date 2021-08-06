import styled from 'styled-components'

export const Styles = styled.div`
  .table {
    font-family: Arial, Helvetica, sans-serif;
    color:#05386B;
    

    .tr {
        text-align: center;
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
      :hover {
          background-color: #ddd
      }
      background-color: #edf5e1
    }

    .th {
        font-size: 50%;
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        background-color: #05386B;
        color: #edf5e1;
    },
    .td {
        border: 1px solid #ddd;
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