import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { LifeLine } from "react-loading-indicators";

function Box({ title, value }) {
  return (
    <div className="bg-greyish p-4 rounded-md shadow-md w-full mb-4 flex ">
      <h3 className="text-lg font-semibold mr-2">{title}:</h3>
      <p className="text-lg">{value}</p>
    </div>
  );
}

const ToggleSwitch = ({ activeStatus }) => {
  const [isChecked, setIsChecked] = useState(activeStatus);
  const { id } = useParams();
  const authToken = useSelector((state) => state.auth.token);
  //   console.log(authToken);
  const handleToggle = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/website/toggle-monitoring/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setIsChecked(() => (response.status === 200 ? !isChecked : isChecked));
      alert(response.data.message);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        role="switch"
        aria-checked={isChecked}
        onClick={handleToggle}
        className={`relative h-6 w-11 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B68] focus:ring-offset-2 ${
          isChecked ? "bg-contrast" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
            isChecked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

function Website() {
  const { id } = useParams();
  const authToken = useSelector((state) => state.auth.token);
  const [website, setWebsite] = useState(null);
  const [monitorResult, setMonitorResult] = useState(null);
  const [monitorLinksResult, setMonitorLinksResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sslCert, setSslCert] = useState(null);

  useEffect(() => {
    const fetchWebsite = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/website/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setWebsite(response.data);
        await monitorSSL();
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    fetchWebsite();
  }, [id]);

  const monitorUrl = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/website/monitor/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          timeout: 30000,
        }
      );
      setMonitorResult(response.data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const monitorSSL = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/website/ssl/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setSslCert(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const monitorLinks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/website/monitor-links/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          timeout: 30000,
        }
      );
      // console.log(response.data.result.link);
      // console.log(response.data.result.status);
      console.log(response.data)
      // console.log(response.data.result[0])
      

      setMonitorLinksResult(response.data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="mt-6 mx-auto max-w-2xl">
      {website ? (
        <>
          <h2 className="text-2xl text-prime text-center font-poppins font-semibold mb-8">
            {website?.name}
          </h2>
          {isLoading ? (
            <div className="flex justify-center">
              <LifeLine color="#ff6b68" size="medium" />
            </div>
          ) : (
            <>
              <ul>
                <li>
                  <Box title="URL" value={website?.url} />
                </li>
                <li>
                  <Box
                    title="Monitoring Active"
                    value={
                      <ToggleSwitch activeStatus={website?.monitoringActive} />
                    }
                  />
                </li>
                <li>
                  <Box title="Notification Type" value={website?.notifyType} />
                </li>
                <li>
                  <Box title="Last Checked" value={website?.lastChecked} />
                </li>
                <li>
                  <Box
                    title="SSL Certificate"
                    value={sslCert ? sslCert.message : "Not Available"}
                  />
                </li>
                <li>
                  <Box
                    title="Analytics Id"
                    value={
                      website.analyticsId
                        ? website.analyticsId
                        : "Not Available"
                    }
                  />
                </li>
                <li>
                  <Box title="Current Status" value={website?.status} />
                </li>
              </ul>
              {monitorResult && (
                <div className="text-contrast text-lg text-center font-semibold my-4">
                  <p>{monitorResult.message}</p>

                  <span>Response Time: {monitorResult.responseTime}ms</span>
                </div>
              )}
              {monitorLinksResult && monitorLinksResult.length > 0 && (
                <div className="text-contrast text-lg text-center font-semibold my-4">
              
                    {monitorLinksResult[0]?.status == 200 ? (
                      <p>
                        All links are working fine.
                        <br />
                        <span>Response Time: {monitorLinksResult[0]?.responseTime}ms</span>
                      </p>
                    ) : (
                      <p>
                        Issue with the link <br />
                        <span>{monitorLinksResult[0]?.link}</span>
                      </p>
                    )}
                
                </div>
              )}
              <div className="mb-8">
                <button
                  className="w-28 h-12 rounded-md bg-prime text-white"
                  onClick={monitorUrl}
                >
                  Monitor Url
                </button>
                <button
                  className="w-28 h-12 rounded-md bg-prime text-white ml-4"
                  onClick={monitorLinks}
                >
                  Monitor Links
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <h2 className="text-2xl text-red text-center font-poppins font-semibold mb-8">
          Oops! Website not found.
        </h2>
      )}
    </div>
  );
}

export default Website;
