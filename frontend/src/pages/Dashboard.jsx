import React, { useState, useEffect } from "react";
import Calender from "../components/Calender";
import PieMonth from "../components/PieMonth";
import { useSelector } from "react-redux";
import axios from "axios";
import { LifeLine } from "react-loading-indicators";
import BarWeek from "../components/BarWeek";
import Fcp from "../components/Fcp";

function Dashboard() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [fcpData, setFcpData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const authToken = useSelector((state) => state.auth.token);

  const fetchId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/website/name/${name}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setId(response.data.id);
    } catch (error) {
      console.error("Error fetching website ID:", error);
    } 
  };

  const fetchMonthData = async () => {
    setIsLoading(true);
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // getMonth() returns 0-11
      const response = await axios.get(
        `http://localhost:8080/log/uptime/month/${id}?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = response.data;
      // console.log(data);
      setData(data);
      fetchFcpData();
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }
    setIsLoading(false);
  };

  const fetchFcpData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/log/fcp/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = response.data;
      setFcpData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching FCP data:", error);
  }
}

  useEffect(() => {
    if (id) {
      fetchMonthData();
    }
  }, [currentDate, id]);

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      if (direction === 1 && prev.getMonth() === new Date().getMonth()) {
        return prev;
      } else {
        const newDate = new Date(prev);
        newDate.setMonth(prev.getMonth() + direction);
        return newDate;
      }
    });
  };

  const formatMonth = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="mx-8">
      {isLoading && <div className="flex justify-center">
                  <LifeLine color="#ff6b68" size="medium"  /></div>}

      <form className=" bg-greyish flex justify-around items-center rounded-lg mx-auto w-1/4 h-12 py-2 ">
          <input
            type="text"
            placeholder="Search for a website"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-greyish focus:outline-none"
          />
        <button type="button" onClick={fetchId}>
          <img src="https://img.icons8.com/?size=100&id=82712&format=png&color=000000" className="w-8 h-8 opacity-20 border-l-2 border-gray-600 ps-1 relative left-4"></img>
        </button>
        
      </form>
      <div className="flex justify-center items-center p-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <img
            src="https://img.icons8.com/?size=100&id=88123&format=png&color=000000"
            className="h-5 w-5"
          />
        </button>
        <h3 className="text-xl">{formatMonth(currentDate)}</h3>
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <img
            src="https://img.icons8.com/?size=100&id=85831&format=png&color=000000"
            className="h-5 w-5"
          />
        </button>
      </div>
      <div className="flex flex-col ">
        <div className="flex justify-around mb-6">
      <BarWeek data={data} />
      <Calender currentDate={currentDate} data={data} />
      </div>
      <div className="mb-6 flex justify-around">
      <PieMonth data={data} />
      <Fcp fcpData={fcpData} />
      </div>
     
      </div>
    </div>
  );
}

export default Dashboard;
