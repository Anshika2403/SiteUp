// import React,{useMemo} from 'react'
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
//   } from "recharts";
//   import {Card, CardHeader, CardTitle, CardContent} from "./Card";

// function LineWeek({data}) {

//     const weeklyData = useMemo(() => {
//         if (!data || data.length === 0) return [];
    
//         // Group days into weeks
//         const weeks = {};
//         data.forEach((day) => {
//           // Calculate week number (1-5)
//           const weekNum = Math.ceil(day.day / 7);
//           if (!weeks[weekNum]) {
//             weeks[weekNum] = {
//               days: [],
//               uptimeSum: 0,
//               downtimeSum: 0,
//               count: 0
//             };
//           }
          
//           weeks[weekNum].days.push(day);
//           weeks[weekNum].uptimeSum += day.uptimePercentage;
//           weeks[weekNum].downtimeSum += day.downtimePercentage;
//           weeks[weekNum].count += 1;
//         });
    
//         // Convert to array and calculate averages
//         return Object.keys(weeks).map((weekNum) => {
//           const week = weeks[weekNum];
//           return {
//             week: `Week ${weekNum}`,
//             uptime: (week.uptimeSum / week.count).toFixed(2),
//             downtime: (week.downtimeSum / week.count).toFixed(2),
//             startDay: Math.min(...week.days.map(d => d.day)),
//             endDay: Math.max(...week.days.map(d => d.day))
//           };
//         });
//       }, [data]);

//       const CustomTooltip = ({ active, payload, label }) => {
//         if (active && payload && payload.length) {
//           const data = payload[0].payload;
//           return (
//             <div className="bg-white p-4 border rounded shadow">
//               <p className="font-medium">{label} (Days {data.startDay}-{data.endDay})</p>
//               <p className="text-emerald-600">Uptime: {data.uptime}%</p>
//               <p className="text-red-600">Downtime: {data.downtime}%</p>
//             </div>
//           );
//         }
//         return null;
//       };
    
    
//   return (
//     <Card className="w-[3000ppx] max-w-4xl">
//       <CardHeader>
//         <CardTitle>Weekly Uptime Analysis</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="h-80">
//             <LineChart
//               data={weeklyData}
//               width={800}
//               height={300}
//               margin={{
//                 top: 5,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="week" />
//               <YAxis domain={[0, 100]} unit="%" />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="uptime"
//                 stroke="#4ade80"
//                 strokeWidth={2}
//                 name="Uptime %"
//                 dot={{ r: 4 }}
//                 activeDot={{ r: 8 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="downtime"
//                 stroke="#f87171"
//                 strokeWidth={2}
//                 name="Downtime %"
//                 dot={{ r: 4 }}
//                 activeDot={{ r: 8 }}
//               />
//             </LineChart>
//         </div>

//         <div className="mt-6 grid grid-cols-2 gap-4">
//           {weeklyData.map((week) => (
//             <div key={week.week} className="p-4 border rounded">
//               <h3 className="font-medium mb-2">{week.week}</h3>
//               <p className="text-sm text-emerald-600">Uptime: {week.uptime}%</p>
//               <p className="text-sm text-red-600">Downtime: {week.downtime}%</p>
//               <p className="text-sm text-gray-500">Days {week.startDay}-{week.endDay}</p>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// export default LineWeek

import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";

function BarWeek({ data }) {
  const weeklyData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Group days into weeks
    const weeks = {};
    data.forEach((day) => {
      // Calculate week number (1-5)
      const weekNum = Math.ceil(day.day / 7);
      if (!weeks[weekNum]) {
        weeks[weekNum] = {
          days: [],
          uptimeSum: 0,
          downtimeSum: 0,
          count: 0
        };
      }
      
      weeks[weekNum].days.push(day);
      weeks[weekNum].uptimeSum += day.uptimePercentage;
      weeks[weekNum].downtimeSum += day.downtimePercentage;
      weeks[weekNum].count += 1;
    });

    // Convert to array and calculate averages
    return Object.keys(weeks).map((weekNum) => {
      const week = weeks[weekNum];
      return {
        week: `Week ${weekNum}`,
        uptime: Number((week.uptimeSum / week.count).toFixed(2)),
        downtime: Number((week.downtimeSum / week.count).toFixed(2)),
        startDay: Math.min(...week.days.map(d => d.day)),
        endDay: Math.max(...week.days.map(d => d.day))
      };
    });
  }, [data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-medium">{label} (Days {data.startDay}-{data.endDay})</p>
          <p className="text-emerald-600">Uptime: {data.uptime}%</p>
          <p className="text-red-600">Downtime: {data.downtime}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className='mx-auto'>Weekly Uptime Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
            <BarChart
              data={weeklyData}
              width={600}
              height={300}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="uptime"
                fill="#4ade80"
                name="Uptime %"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="downtime"
                fill="#f87171"
                name="Downtime %"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {weeklyData.map((week) => (
            <div key={week.week} className="p-4 border rounded">
              <h3 className="font-medium mb-2">{week.week}</h3>
              <p className="text-sm text-emerald-600">Uptime: {week.uptime}%</p>
              <p className="text-sm text-red-600">Downtime: {week.downtime}%</p>
              <p className="text-sm text-gray-500">Days {week.startDay}-{week.endDay}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default BarWeek;
