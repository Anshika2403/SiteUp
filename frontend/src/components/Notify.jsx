import React from "react";

function Notify() {
  const types = [
    {
      id: 1,
      icon: "https://img.icons8.com/?size=100&id=12580&format=png&color=34AF9D",
    },
    {
      id: 2,
      icon: "https://img.icons8.com/?size=100&id=143&format=png&color=34AF9D",
    },
  ];
  return (
    <div className="flex px-8 m-12 mt-24 pb-6">
      <div className="me-4 w-5/12">
        <h2 className="font-poppins text-5xl font-semibold leading-tight">
          Get alerts in a way you prefer
        </h2>
        <p className="mt-6 text-lg text-[#131117] opacity-70">
          When your site is down, we send notifications in a way that suits you
          so you can act as fast as possible and minimise any downtime. Receive
          instant alerts via email, SMS, Slack and more to you and your
          teammates.
        </p>
        <ul className="flex mt-6">
          {types.map((item) => (
            <li
              key={item.id}
              className="bg-greyish rounded-sm flex items-center justify-center me-4 w-12 h-12 shadow-lg"
            >
              <img src={item.icon} alt="icon" className="w-8 h-8" />
            </li>
          ))}
        </ul>
      </div>
      <div className="w-7/12 ms-4 bg-prime rounded-md p-16">
        <div
          className="bg-white w-full h-24 rounded-md"
          style={{ boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)" }}
        ></div>
        <div className="ms-12 bg-[rgba(255,255,255,0.8)] w-4/5 h-20 rounded-b-md" style={{ boxShadow: "0 8px 8px rgba(0, 0, 0, 0.3) inset" }}></div>
      </div>
    </div>
  );
}

export default Notify;
