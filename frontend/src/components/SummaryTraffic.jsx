import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './Card'

function SummaryTraffic({data}) {
  return (
    <div>
      <div className="grid grid-rows-2 grid-cols-2 gap-5">
        {[
          { title: 'Total Sessions', value: data.summary?.totalSessions.toLocaleString(),icon:"https://img.icons8.com/?size=100&id=Uv5jYjUmFUTy&format=png&color=6b7280" },
          { title: 'Total Users', value: data.summary?.totalUsers.toLocaleString() , icon :"https://img.icons8.com/?size=100&id=cykh8BZMTKkb&format=png&color=6b7280"},
          { title: 'Page Views', value: data.summary?.totalPageViews.toLocaleString(), icon:"https://img.icons8.com/?size=100&id=8YgLJmtIzvhD&format=png&color=6b7280" },
          { title: 'Avg Bounce Rate', value: `${data.summary?.avgBounceRate.toFixed(1)}%`, icon:"https://img.icons8.com/?size=100&id=Fnc4N5lnL3v9&format=png&color=6b7280" }
        ].map((item, index) => (
          <Card key={index}>
            <CardHeader className="pb-2 flex justify-evenly ps-2">
              <img src={item.icon} className="w-8 h-8" />
              <CardTitle className="text-sm font-medium text-gray-500">
                {item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  )
}

export default SummaryTraffic
