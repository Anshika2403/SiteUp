import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function WebsiteForm() {
  const authToken = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    notifyType: "",
    analyticsId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/website",

        formData,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      navigate("/");
      if (!response.ok) throw new Error(response.data.message || "Error adding website");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
        Add New Website
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Website Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="My Website"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-prime focus:border-prime"
          />
        </div>

        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Website URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            value={formData.url}
            onChange={handleInputChange}
            placeholder="https://example.com"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-prime focus:border-prime"
          />
        </div>

        <div>
          <label
            htmlFor="notifyType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Notification Type
          </label>
          <select
            id="notifyType"
            name="notifyType"
            value={formData.notifyType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-prime focus:border-prime"
          >
            <option value="">Select notification type</option>
            <option value="email">Email</option>
            {/* <option value="sms">SMS</option>
                <option value="push">Push Notification</option>
                <option value="webhook">Webhook</option> */}
          </select>
        </div>

        <div>
          <label
            htmlFor="analyticsId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Analytics ID
          </label>
          <input
            id="analyticsId"
            name="analyticsId"
            type="text"
            value={formData.analyticsId}
            onChange={handleInputChange}
            placeholder="UA-XXXXX-Y"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-prime focus:border-prime"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-prime text-white py-2 px-4 rounded-md hover:bg-dark focus:outline-none focus:ring-2 focus:ring-dark focus:ring-offset-2 transition-colors duration-200"
        >
          Add Website
        </button>
      </form>
    </div>
  );
}

export default WebsiteForm;
