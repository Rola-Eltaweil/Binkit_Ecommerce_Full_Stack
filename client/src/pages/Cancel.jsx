import React from "react";
import cancel from "../assets/213911883-cancelled-sign-stop-the-events-symbol-vector-illustration-eps-10.jpg";
import { Link, useLocation } from "react-router-dom";

const Cancel = () => {
  const location = useLocation();
  console.log(location, "lo");
  return (
    <div className="bg-white relative min-h-[calc(100vh-132px)] ">
      <div className="bg-red-200 max-w-sm py-3 text-center absolute top-4 w-full left-4">
        <p>
          {location?.state === "Order" ? (
            <span className="text-red-800 text-[16px] font-bold">
              {" "}
              {location?.state} Cancel
            </span>
          ) : (
            <span className="text-red-800 text-[16px] font-bold">
              Payment Cancel
            </span>
          )}
        </p>
        <Link to={"/"}>
          <p className="text-[16px] text-red-800 border border-red-800 w-fit mx-auto mt-1  px-2 py-0.5 rounded-sm hover:bg-red-800 hover:text-white transition-all">
            {" "}
            Go to home
          </p>
        </Link>
      </div>
      <div className="flex items-center justify-center ">
        <img src={cancel} alt="image" className=" " />
      </div>
    </div>
  );
};

export default Cancel;
