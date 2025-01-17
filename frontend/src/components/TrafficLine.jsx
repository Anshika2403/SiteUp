import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from './Card'

function TrafficLine({data}) {
  return (
    <div className='mb-8'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <LineChart
              width={800}
              height={240}
              data={data.traffic?.dailyStats}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sessions" stroke="#8884d8" />
              <Line type="monotone" dataKey="activeUsers" stroke="#82ca9d" />
            </LineChart>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TrafficLine
