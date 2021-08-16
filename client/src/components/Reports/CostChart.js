import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../UserContext';
import { add, format, differenceInCalendarDays, isFuture } from "date-fns";
import {
  AreaChart,
  LineChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import DataUtils from "./DataUtils";
import CustomTooltip from "./CustomTooltip";


const CostChart = () => {
  
  const userContext = useContext(UserContext)
  const [costData, setCostData] = useState([])
  // const [startDate, setStartDate] = useState(new Date(2019, 0, 11))
  const [startDate, setStartDate] = useState(new Date())

  // let startDate = new Date(2019, 0, 11)
  // const endDate = new Date(2021, 9, 15)
  const currDate = new Date() // get current date
  const endDate = new Date(currDate.setMonth(currDate.getMonth()+1)) // 1 month from current date

  const dateFormatter = date => {
    return format(new Date(date), "dd/MMM");
  };

  /**
   * get the dates between `startDate` and `endDate` with equal granularity
   */
  const getTicks = (startDate, endDate, num) => {
    const diffDays = differenceInCalendarDays(endDate, startDate);

    let current = startDate,
      velocity = Math.round(diffDays / (num - 1));

    const ticks = [startDate.getTime()];

    for (let i = 1; i < num - 1; i++) {
      ticks.push(add(current, { days: i * velocity }).getTime());
    }

    ticks.push(endDate.getTime());
    return ticks;
  };

  /**
   * Add data of the date in ticks,
   * if there is no data in that date in `data`.
   *
       * @param Array<number> _ticks
       * @param {*} data
       */
  const fillTicksData = (_ticks, data) => {
    const ticks = [..._ticks];
    const filled = [];
    let currentTick = ticks.shift();
    let lastData = null;
    for (const it of data) {
      if (ticks.length && it.date > currentTick && lastData) {
        filled.push({ ...lastData, ...{ date: currentTick } });
        currentTick = ticks.shift();
      } else if (ticks.length && it.date === currentTick) {
        currentTick = ticks.shift();
      }

      filled.push(it);
      lastData = it;
    }

    return filled;
  };



  // const startDate = new Date(2019, 0, 1);
  // const endDate = new Date(2020, 0, 15);
  // const data = [
    //   ...DataUtils.days(startDate, 10),
    //   ...DataUtils.days(add(startDate, { months: 2 }), 5),
    //   ...DataUtils.months(add(startDate, { months: 5 }), 1),
  //   ...DataUtils.months(add(startDate, { months: 8 }), 1)
  // ].map(it => ({
  //   date: it.date.getTime(),
  //   val: it.val
  // }));


  useEffect(() => {
    if (userContext.user) {

      const fetchCalendarEntries = async () => {
        try {
          // fetch all calendar entries for current authenticated user
          let entriesRes = await fetch(`/api/calendarEntry/getbyuser/${userContext.user._id}`)
          let entriesObject = await entriesRes.json()

          let tempData = entriesObject?.entryList.filter(data => data.completed === true)
          let finalData = []
          let dataObject = {}
          let tempObject = {}
          let totalCosts = 0

          for (let index = 0; index < tempData.length; index++) {
            dataObject = tempData[index]
            totalCosts = totalCosts + dataObject.cost
            tempObject = {
              date: new Date(dataObject.dateCompleted).getTime(),
              // val: dataObject.cost
              val: totalCosts
            }
            finalData.push(tempObject)
          }
          finalData.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))

          console.log("Cost Analysis, Final Data Array = ", finalData)
          setCostData(finalData)

          // startDate = new Date(finalData[0].dateCompleted);
          setStartDate(new Date(finalData[0].date))
        }
        catch (err) {
          console.log(err)
          alert(`
          There was an error loading your data. 
          We're fixing it as fast as we can.
        `)
        }
      }
      fetchCalendarEntries()
    }
  }, [])

  const data = costData
    // const data = [
    //   { date: startDate.getTime(), cost: 1000 },
    //   { date: new Date(2019, 4, 30).getTime(), val: 3000 },
    //   { date: new Date(2019, 5, 30).getTime(), val: 5000 },
    //   { date: new Date(2019, 6, 21).getTime(), val: 6000 },
    //   { date: new Date(2019, 6, 28).getTime(), val: 2000 }
    // ];

  const domain = [dataMin => dataMin, () => endDate.getTime()];
  const ticks = getTicks(startDate, endDate, 6);
  const filledData = fillTicksData(ticks, data);

  return (
    <div>
      <p>Accumulated Total Costs (all homes)</p>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          width={900}
          height={250}
          // data={filledData}
          data={data}  // take only the normal data list, don't fill in extra values
          margin={{
            top: 10,
            right: 0,
            bottom: 10,
            left: 0
          }}
        >
          <XAxis
            dataKey="date"
            // dataKey="dateCompleted"
            hasTick
            scale="time"
            tickFormatter={dateFormatter}
            type="number"
            domain={domain}
            ticks={ticks}
          />
          <YAxis tickCount={6} hasTick />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="val"
            // dataKey="cost"
            stroke="#ff7300"
            fill="#ff7300"
            fillOpacity={0.9}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CostChart