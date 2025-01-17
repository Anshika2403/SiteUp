import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 z-10">
        <Navbar />
      </div>
      <main className="overflow-hidden ml-16 z-5 mt-4 flex-grow">
        <Header />
        <Outlet />
      </main>
      <div className="ml-16">
        <Footer />
      </div>
    </div>
  );
}

export default App;
