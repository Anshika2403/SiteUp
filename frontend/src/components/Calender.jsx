import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";
import axios from "axios";
import { useSelector } from "react-redux";

function Calender({currentDate,data}) {
  // const [currentDate, setCurrentDate] = useState(new Date());
  // const [calendarData, setCalendarData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const authToken = useSelector((state) => state.auth.token);

  // const fetchMonthData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const year = currentDate.getFullYear();
  //     const month = currentDate.getMonth() + 1; // getMonth() returns 0-11
  //     const response = await axios.get(`http://localhost:8080/log/uptime/month/${id}?year=${year}&month=${month}`,{
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     });
  //     const data = response.data;
  //     console.log(data)
  //     setCalendarData(data);
  //   } catch (error) {
  //     console.error("Error fetching calendar data:", error);
  //   }
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   fetchMonthData();
  // }, [currentDate, id]);

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Get the first day of the calendar (previous month's days might be included)
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());

    // Get the last day of the calendar (next month's days might be included)
    const endDate = new Date(lastDay);
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

    const days = [];
    const currentDay = new Date(startDate);

    while (currentDay <= endDate) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return days;
  };

  const getDayStatus = (day) => {
    const dayData = data.find((d) => d.day === day.getDate());
    if (!dayData) return null;
    return dayData.uptimePercentage >= 90; // Consider "up" if uptime is 99% or higher
  };

  // const navigateMonth = (direction) => {
  //   setCurrentDate((prev) => {
  //     if(direction === 1 && prev.getMonth() === new Date().getMonth() ){
  //       return prev;
  //     }else{
  //     const newDate = new Date(prev);
  //     newDate.setMonth(prev.getMonth() + direction);
  //     return newDate;}
  //   });
  // };

  const formatMonth = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card className=" max-w-xl">
      <CardHeader className="space-y-0 pb-4">
      {/* <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <img src="https://img.icons8.com/?size=100&id=88123&format=png&color=000000" className="h-5 w-5" />
          </button> */}
        <CardTitle className="text-xl font-bold text-center mx-auto">
          {formatMonth(currentDate)}
        </CardTitle>
          {/* <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <img src="https://img.icons8.com/?size=100&id=85831&format=png&color=000000" className="h-5 w-5" />
          </button> */}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {getDaysInMonth().map((day) => {
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const status = isCurrentMonth ? getDayStatus(day) : null;

            return (
              <div
                key={day.toISOString()}
                className={`
                    aspect-square p-2 flex flex-col items-center justify-between
                    ${isCurrentMonth ? "text-gray-900" : "text-gray-400"}
                  `}
              >
                <span className="text-sm">{day.getDate()}</span>
                {isCurrentMonth && status !== null && (
                  <div
                    className={`
                        w-2 h-2 rounded-full mt-1
                        ${status ? "bg-green-500" : "bg-red-500"}
                      `}
                  />
                )}
              </div>
            );
          })}
        </div>
        {/* {isLoading && (
          <div className="text-center mt-4 text-gray-500">Loading...</div>
        )} */}
      </CardContent>
    </Card>
  );
}
export default Calender;
