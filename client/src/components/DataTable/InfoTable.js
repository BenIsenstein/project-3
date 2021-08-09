import React, { useMemo, useState, useEffect } from "react"
import { useTable, useSortBy, useFilters, useBlockLayout } from "react-table"
import { useSticky } from 'react-table-sticky'
import { TableContainer } from './TableStyle'
import { columnHeaders } from "./Columns"
import { useHistory } from "react-router-dom"

export default function InfoTable() {
  const loadingMessage = [{item: 'Loading...', task: "This won't take long!"}]
  const [infoList, setInfoList] = useState(loadingMessage)
  
  useEffect(() => {
    const getAllInfo = async () => {
      try {
       let response = await fetch("/api/info")
       let resObject = await response.json()
       setInfoList(resObject)
      }
      catch (err) {
        console.log("There was an error loading your table", err)
      }
    }
      getAllInfo()
  }, [])

  const history = useHistory()
  const changeRoute = (val) => history.push(`/info/${val}`)

  // Prevent re-rendering of data
  const columns = useMemo(() => columnHeaders, [])
  const data = useMemo(() => infoList, [infoList]) 

  let tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
            {
                id: 'item',
                desc: false
            }
        ]
      }
    },
    useFilters,
    useSortBy,
    useBlockLayout,
    useSticky
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

    const firstPageRows = rows.slice(0,50)

    return (
        <TableContainer>
          <div {...getTableProps()} className="sticky">
            <div className="header">
              {headerGroups.map((headerGroup) => (
                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                  {headerGroup.headers.map((column) => (
                    <div {...column.getHeaderProps()} className="th">
                      {column.render('Header')}
                      <div>{column.canFilter ? column.render("Filter") : null}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div {...getTableBodyProps()} className="body">
              {firstPageRows.map((row) => {
                prepareRow(row);
                return (
                  <div onClick={() => changeRoute(row.values.name)} {...row.getRowProps()} className="tr">
                    {row.cells.map((cell) => (
                      <div {...cell.getCellProps()} className="td">
                        {cell.render('Cell')}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </TableContainer>
      );
    }