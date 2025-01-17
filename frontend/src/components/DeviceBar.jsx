import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function DeviceBar({data}) {
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Device Traffic Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            {/* <ResponsiveContainer width="101%" height="100%"> */}
              <BarChart data={data.userBehavior?.byDevice} width={600} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="deviceCategory" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="engagedSessions" fill="#4f46e5" name="Sessions" />
                <Bar dataKey="pageViews" fill="#06b6d4" name="Page Views" />
                <Bar dataKey="totalUsers" fill="#8b5cf6" name="Active Users" />
              </BarChart>
            {/* </ResponsiveContainer> */}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

export default DeviceBar
