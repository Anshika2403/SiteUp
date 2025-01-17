import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { logout } from "../store/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (slug) => location.pathname === slug;
  const status = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      defaultIcon: "https://img.icons8.com/?size=100&id=83326&format=png",
      hoverIcon: "https://img.icons8.com/?size=100&id=84005&format=png",
    },
    {
      name: "Dashboard",
      slug: "/dashboard",
      defaultIcon: "https://img.icons8.com/?size=100&id=14116&format=png",
      hoverIcon: "https://img.icons8.com/?size=100&id=59735&format=png",
    },
    {
      name: "Monitor",
      slug: "/monitor",
      defaultIcon:
        "https://img.icons8.com/?size=100&id=XAzZuEcNfUYP&format=png",
      hoverIcon: "https://img.icons8.com/?size=100&id=XAzZuEcNfUYP&format=png",
    },
  ];

  const handleLogout = () => {
    try {
       dispatch(logout());
    
      navigate("/login", { replace: true }); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="">
      <nav className="h-screen w-16 group hover:w-48 hover:bg-white transition-all duration-1000 ease-in-out hover:shadow-[6px_0_15px_rgba(0,0,0,0.3)]">
        <div className="pt-4 mb-4 flex items-center">
          <img src="assets/Logo.png" className="w-14 me-4"></img>
          <h1 className="text-2xl font-montserrat font-bold opacity-0 group-hover:opacity-100 text-[#FF6B68] transition-opacity duration-1000">
            SiteUp
          </h1>
        </div>

        <ul className="flex flex-col justify-between py-3">
          {navItems.map((item) => (
            <li
              key={item.name}
              className={`my-1 group-hover:border-0 ${
                isActive(item.slug) ? "border-s-4 border-prime" : "border-0"
              }`}
            >
              <button
                onClick={() => navigate(item.slug)}
                className={`flex items-center rounded-lg group-hover:ms-3 p-3 h-12 group-hover:w-40 ${
                  isActive(item.slug)
                    ? "group-hover:bg-light transition duration-1000"
                    : "group-hover:bg-white"
                }`}
              >
                <img
                  src={`${item.defaultIcon}&color=${
                    isActive(item.slug) ? "34AF9D" : "000000"
                  }`}
                  className={`w-9 group-hover:hidden  ${
                    isActive(item.slug) ? "opacity-100" : "opacity-70"
                  } `}
                ></img>
                <img
                  src={`${item.hoverIcon}&color=${
                    isActive(item.slug) ? "34AF9D" : "000000"
                  }`}
                  className={`w-7 hidden group-hover:block ${
                    isActive(item.slug) ? "opacity-100" : "opacity-70"
                  }`}
                ></img>
                <h2
                  className={`ms-4 pe-2 font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000  ${
                    isActive(item.slug)
                      ? "group-hover:text-prime"
                      : "group-hover:text-black group-hover:opacity-70"
                  }
                `}
                >
                  {item.name}
                </h2>
              </button>
            </li>
          ))}
        </ul>
        {status ?
        (<img
          src="https://img.icons8.com/?size=100&id=BdksXmxLaK8r&format=png&color=ffffff"
          alt="Logout"
          className=" absolute left-2 bottom-7 w-10 h-10 rounded-3xl bg-prime p-2 cursor-pointer"
          onClick={handleLogout}
        ></img>)
        :( <Link to="/login">
          <img
            src="https://img.icons8.com/?size=100&id=rP41Qs5B77oi&format=png&color=ffffff"
            className=" absolute left-2 bottom-7 w-10 h-10 rounded-3xl bg-prime p-2 "
          ></img>
        </Link>)}
      </nav>
    </header>
  );
}

export default Navbar;
