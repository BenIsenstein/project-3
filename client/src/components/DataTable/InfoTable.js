import React, { useMemo, useState, useEffect } from "react"
import { useTable, useSortBy, useFilters, useBlockLayout } from "react-table"
import { useSticky } from 'react-table-sticky'
import { Styles } from './TableStyle'
import { columnHeaders } from "./Columns"
import { useHistory } from "react-router-dom"

export default function InfoTable() {
  const loadingMessage = [{item: 'Loading...', task: "This won't take long!"}]
  const [infoList, setInfoList] = useState(loadingMessage)
  //  const [infoList, setInfoList] = useState(
  //  [ { "item": "Furnace", "task": "Filter", "frequency": "180"},
  //    { "item": "Furnace", "task": "Inspect", "frequency": "365"},
  //    { "item": "Furnace", "task": "Dampers", "frequency": "180"}])
  
  useEffect(() => {
    const getAllInfo = async () => {
      try {
       console.log( "Welcome to our useEffect")
       let response = await fetch("/api/info")
       let resObject = await response.json()
       console.log("res object is",resObject)
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
                id: 'name',
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
      <div 
        style={{
          display: 'flex', 
          justifyContent: 'center',
          border: "4px solid #05386B",
          borderRadius: '20px',
          backgroundColor: '#edf5e1'
        }}
      >
        <Styles>
          <div {...getTableProps()} className="table sticky" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 570, height: '660px' }}>
            <div className="header" style={{margin: '0px'}}>
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
        </Styles>
      </div>
      );
    }