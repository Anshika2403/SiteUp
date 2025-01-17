import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <section className="ms-4 mb-3 flex">
      <h1 className="text-3xl font-montserrat font-bold text-[#FF6B68]">
        SiteUp
      </h1>
      {authState.status && <div className="absolute right-5 flex items-center cursor-pointer">
        <div className="flex items-center" onClick={() => navigate("/profile")}>
        <h3 className="mr-2 text-prime font-poppins">{authState.user.name}</h3>
        <img src="https://img.icons8.com/?size=100&id=83190&format=png&color=34AF9D" className="w-9 h-9 p-1 rounded-3xl border-2 border-prime"></img>
        </div>
        <img src="https://img.icons8.com/?size=100&id=nY7Q73ERmlBS&format=png&color=34AF9D" className="w-9 h-9 ms-4" onClick={() => navigate("/notification")}></img>
        </div>}
    </section>
  );
}

export default Header;
