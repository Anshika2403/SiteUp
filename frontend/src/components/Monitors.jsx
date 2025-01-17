import React from "react";

function Monitors() {
  const monitors = [
    {
      id: 1,
      icon: "https://img.icons8.com/?size=100&id=ZjVg3Vhs2VGT&format=png&color=000000",
      title: "Website Monitoring",
      description:
        "Be the first to know that your website is down! Reliable monitoring warns you before any significant trouble and saves you money.",
    },
    {
      id: 2,
      icon: "https://img.icons8.com/?size=100&id=oBoTCLqp6f98&format=png&color=000000",
      title: "SSL Monitoring",
      description:
        "Don't lose visitors because of an expired SSL certificate. Get notified 30, 14 and 7 days before expiration.",
    },
    {
      id: 3,
      icon: "https://img.icons8.com/?size=100&id=cykh8BZMTKkb&format=png&color=000000",
      title: "User Traffic Monitoring",
      description:
        "Monitor the number of users on your website in real-time. Get notified when the number of users exceeds the limit.",
    },
    {
      id: 4,
      icon: "https://img.icons8.com/?size=100&id=16838&format=png&color=000000",
      title: "Cron Job Monitoring",
      description:
        "Also known as heartbeat monitoring. Monitor recurring background jobs or intranet devices connected to the internet.",
    },
  ];

  return (
    <div className="bg-greyish mt-24 mb-4 px-8 pt-10 pb-20">
      <h2 className="pt-8 px-52 mb-8 leading-tight text-center text-5xl font-poppins font-semibold ">
        All you really care about monitored in one place.
      </h2>
      <div className="grid grid-cols-2 gap-8">
        {monitors.map((monitor) => (
          <div key={monitor.id} className="bg-white p-10 rounded-md shadow-xl ">
            <div className="bg-light w-20 h-20 mb-4">
              <div className="relative top-4 left-16 w-10 h-10 rounded-3xl bg-prime"></div>
              <img
                src={monitor.icon}
                alt={monitor.title}
                className="w-16 h-16 relative bottom-8 left-6 "
              />
            </div>

            <h3 className="text-4xl font-semibold font-poppins">
              {monitor.title}
            </h3>
            <p className="mt-4 text-lg text-[#131117] opacity-70">
              {monitor.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Monitors;
