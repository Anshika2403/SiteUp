import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

const PieMonth = ({ data }) => {

  const monthlyStats = useMemo(() => {
    if (!data || data.length === 0) {
      return [
        { name: 'Uptime', value: 0 },
        { name: 'Downtime', value: 0 }
      ];
    }

    const totalDays = data.length;
    const totalUptime = data.reduce((sum, day) => sum + day.uptimePercentage, 0);
    const totalDowntime = data.reduce((sum, day) => sum + day.downtimePercentage, 0);

    return [
      { name: 'Uptime', value: totalUptime / totalDays },
      { name: 'Downtime', value: totalDowntime / totalDays }
    ];
  }, [data]);

  const COLORS = ['#4ade80', '#f87171'];

  return (
    <Card className="w-4/5 max-w-lg ms-2 me-1">
      <CardHeader>
        <CardTitle className='mx-auto'>Monthly Uptime Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={monthlyStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, value}) => `${name}: ${value.toFixed(1)}%`}
                outerRadius={90}
                dataKey="value"
              >
                {monthlyStats.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `${value.toFixed(1)}%`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Average Uptime: {monthlyStats[0].value.toFixed(2)}%
          </p>
          <p className="text-sm text-gray-600">
            Average Downtime: {monthlyStats[1].value.toFixed(2)}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieMonth;