import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

function EventPie({data}) {
    const COLORS = [
        '#0088FE',  // Blue
        '#00C49F',  // Green
        '#FFBB28',  // Yellow
        '#8884d8',  // Purple
        '#ff7c43'   // Coral
      ];
    
      const CustomTooltip = ({ active, payload }) => {
        
        if (active && payload && payload.length) {
          return (
            <div className="bg-white p-4 rounded shadow-lg border">
              <p className="font-bold text-gray-800">{payload[0].name}</p>
              <p className="text-gray-600">Count: {payload[0].value.toLocaleString()}</p>
            </div>
          );
        }
        return null;
      };
    
      // Custom renderer for the label
      const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        name,
      }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
        return percent > 0.05 ? (
          <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            className="text-xs"
          >
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        ) : null;
      };
    
      return (
        <div className='flex justify-center items-center'>
        <Card className="w-2/4 mx-8">
          <CardHeader>
            <CardTitle className='mx-auto'>Event Distribution</CardTitle>
          </CardHeader>
          <CardContent className='w-2/4 flex justify-center items-center'>
            <div className=" ms-14 h-96 flex justify-center items-center">
              <PieChart width={800} height={400}>
                <Pie
                  data={data.events?.topEvents}
                  cx={400}
                  cy={200}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  innerRadius={80}
                  outerRadius={160}
                  fill="#8884d8"
                  dataKey="count"
                    nameKey='eventName'
                >
                  {data.events?.topEvents.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  layout="vertical" 
                  align="right"
                  verticalAlign="middle"
                  formatter={(value, entry) => (
                    <span className="text-gray-800">{value}</span>
                  )}
                />
              </PieChart>
            </div>
            </CardContent>
            </Card>
            <Card className='w-1/4'>
                <CardContent>
            <div className="mt-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 text-left">Event Type</th>
                    <th className="p-2 text-right">Count</th>
                    <th className="p-2 text-right">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {data.events?.topEvents.map((event, index) => {
                    const totalEvents = data.events?.topEvents.reduce((sum, e) => sum + e.count, 0);
                    const percentage = (event.count / totalEvents * 100).toFixed(1);
                    return (
                      <tr key={index} className="border-t">
                        <td className="p-2">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            {event.eventName}
                          </div>
                        </td>
                        <td className="p-2 text-right">{event.count.toLocaleString()}</td>
                        <td className="p-2 text-right">{percentage}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        </div>
      );
}

export default EventPie
