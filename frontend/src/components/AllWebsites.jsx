import React, { useEffect , useState} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AllWebsites() {
    const authToken = useSelector((state) => state.auth.token);
    const [websites, setWebsites] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchWebsites = async () => {
    try {
        
      const response = await axios.get("http://localhost:8080/website", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setWebsites(response.data);
    } catch (e) {
        console.error(e);
    }}
    fetchWebsites();
  }, [authToken]);

  return (<div className="mt-6 ms-4">
    <h2 className="text-2xl font-semibold mb-4">Your Websites</h2>
    <ul className="mb-8">
      {websites.map((website) => (
        <li key={website._id} className="text-lg flex items-center w-2/5 h-16 mb-2 p-4 bg-gradient-to-br from-greyish to-light rounded-md shadow-md hover:border-2 hover:border-light hover:shadow-2xl" onClick={() => navigate(`/website/${website._id}`)}>{website.name}</li>
      ))}
    </ul>
    <button className="bg-prime px-4 py-3 rounded-md " onClick={() => navigate("/addWebsite")}>Add Website</button>
  </div>);
}

export default AllWebsites;
