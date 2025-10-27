import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import UseMobile from "../Hooks/UseMobile";
import { FaArrowLeft } from "react-icons/fa";

const SearchInput = () => {
  const [isloactionsearch, setIslocationsearch] = useState(false);
  const [IsMobile] = UseMobile();
  const navigate = useNavigate();

  const[text,settext]=useState('')
  const clicktoSearchpage = () => {
    navigate("/Search");
  };
  const params =useLocation()

  const search = params?.search.split("=")[1]
  const location = useLocation();
  const checkloaction = useLocation().pathname == "/Search";
  console.log(checkloaction);

  useEffect(() => {
    if (checkloaction) {
      setIslocationsearch(true);
    } else {
      setIslocationsearch(false);
    }
  }, [location]);


  const hanleonchange = (e)=>{
    const value = e.target.value
    const url =`/Search?q=${value}`
     navigate(url)
  }

  return (
    <div className=" border-gray-300  shadow-sm rounded-md bg-gray-100 flex items-center border-2 relative h-9 group focus-within:border-primary-200">
      <div className="outline-none w-full   py-1.5 text-[14px] flex items-center justify-start">
        <div onClick={clicktoSearchpage} className="mx-6 text-gray-400">
          {!isloactionsearch ? (
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "milk"',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Search "cheese"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "bread"',
                1000,
                'Search "eggs"',
                1000,
                'Search " fruits"',
                1000,
                'Search " vegetables"',
                1000,
                'Search " chips"',
                1000,
                'Search " rice"',
                1000,
                'Search " pasta"',
                1000,
                'Search " meat"',
                1000,
                'Search " fish"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          ) : (
            <input
            defaultValue={search}
              onChange={hanleonchange}
              autoFocus
              placeholder="Search for one/more item"
              type="text"
              className="bg-gray-100 pl-3  text-[14px] border-2 border-gray-300 focus-within:border-primary-200
               border-l-0 border-r-0 outline-none  w-[100%] h-9"
            />
          )}
        </div>
        {IsMobile && checkloaction ? (
          <Link
            to={"/"}
            className="h-6 w-6  cursor-pointer flex items-center absolute left-1 bg-white rounded-full justify-center"
          >
            <FaArrowLeft className="flex  bg-white shadow-sm rounded-full  justify-start   group-focus-within:text-primary-200 text-primary-200 h-4 w-4" />
          </Link>
        ) : (
          <CiSearch className="flex justify-start  absolute left-1 group-focus-within:text-primary-200 h-6 w-4" />
        )}
      </div>
    </div>
  );
};

export default SearchInput;
