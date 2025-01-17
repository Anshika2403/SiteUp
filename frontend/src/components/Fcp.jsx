import React,{useState,useEffect} from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function Fcp({fcpData}) {

  const [data, setData] = useState([]);

  useEffect(() => {
  const last7Days = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          last7Days.push(date.toISOString().split('T')[0]); 
        }

        
        const mergedData = last7Days.map((date) => {
         
          const dayData = fcpData.find((log) => log.date === date);
          
          return {
            date,
            avgFcp: dayData ? dayData.avgFcp/1000 : 0, 
            logCount: dayData ? dayData.logCount : 0, 
          };
        })
        setData(mergedData);}, [fcpData]);
  return (
    <div>
      <Card className="w-[700px] max-w-3xl ms-4">
      <CardHeader>
        <CardTitle className='mx-auto'>Average First Contentful Paint (FCP)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]
        ">
          
            <LineChart
              data={data}
              width={600}
              height={300}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                label={{ value: 'Date', position: 'bottom', offset: 0 }}
              />
              <YAxis
                label={{ 
                  value: 'Average FCP (s)', 
                  angle: -90, 
                  position: 'insideLeft',
                  offset: 10
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="avgFcp"
                stroke="#34AF9D"
                strokeWidth={2}
                dot={{
                  stroke: '#34AF9D',
                  strokeWidth: 2,
                  r: 4,
                  fill: 'white'
                }}
                activeDot={{
                  stroke: '#34AF9D',
                  strokeWidth: 2,
                  r: 6,
                  fill: '#34AF9D'
                }}
              />
            </LineChart>
          
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default Fcp
