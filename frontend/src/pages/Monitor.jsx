import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import TrafficLine from "../components/TrafficLine";
import DeviceBar from "../components/DeviceBar";
import EventPie from "../components/EventPie";
import SummaryTraffic from "../components/SummaryTraffic";
import { LifeLine } from "react-loading-indicators";

function StatusPage() {
  const authToken = useSelector((state) => state.auth.token);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchId = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/website/name/${name}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setId(response.data.id);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching website ID:", error);
    }
  };

  const fetchTrafficData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:8080/traffic/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTrafficData();
    }
  }, [id]);
  return (
    <div className="m-4">
      
      <h2 className="text-2xl font-poppins font-semibold text-center my-4">Traffic Monitor</h2>
      {isLoading && <div className="flex justify-center">
                        <LifeLine color="#ff6b68" size="medium"  /></div>}
      <form className=" bg-greyish flex justify-around items-center rounded-lg mx-auto w-1/4 h-12 py-2 my-6">
        <input
          type="text"
          placeholder="Search for a website"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-greyish focus:outline-none text-lg"
        />
        <button type="button" onClick={fetchId}>
          <img
            src="https://img.icons8.com/?size=100&id=82712&format=png&color=000000"
            className="w-8 h-8 opacity-20 border-l-2 border-gray-600 ps-1 relative left-4"
          ></img>
        </button>
      </form>
      <div className="flex flex-col justify-center items-center p-4">
        <div className="flex justify-around items-center w-full mb-8">
          <SummaryTraffic data={data} />  
      <DeviceBar data={data} />
      </div>
      <TrafficLine data={data} />
      <EventPie data={data} />
      </div>
    </div>
  );
}

export default StatusPage;
