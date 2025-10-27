import React, { useState } from "react";
import OpenAddCategory from "./OpenAddCategory";
import AxiosToastError from "../../utils/AxiosToastError";
import Loading from "../../components/Loading";
import axios from "axios";
import { Endpoints } from "../../common/Endpoint";
import { useEffect } from "react";
import NoDataHere from "../../components/NoDataHere";
import OpenEditcategory from "../../components/OpenEditcategory";
import ConfirmBox from "../../components/ConfirmBox";
import toast from "react-hot-toast";

const Category = () => {
  const [opencategory, setopencategory] = useState(false);
  const [loading, setloading] = useState(false);
  const [openEditcategory, setopenEditcategory] = useState(false);
  const [openDeletecategory, setopenDeletecategory] = useState(false);
  const [Datacategory, setDataCategory] = useState([]);
  const [Deletecategory, setDeletecategory] = useState("");
  const [categorydata, setcategoryData] = useState({
    name: "",
    image: "",
    _id: "",
  });

  const handlecloseAddcategory = () => {
    setopencategory(false);
  };

  useEffect(() => {
    Getcategories();
  }, []);

  const onclose = () => {
    setopenEditcategory(false);
  };

  const Getcategories = async () => {
    try {
      setloading(true);
      const Getall = await axios.get(Endpoints.Getcategories.url, {
        withCredentials: true,
      });
      setDataCategory(Getall?.data?.data);
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    } finally {
      setloading(false);
    }
  };

  const handleCloseConfirmBox = () => {
    setopenDeletecategory(false);
  };

  const ConfirmDeleted = async () => {
    try {
      const deletedcategory = await axios.delete(
        `${Endpoints.Deletecategory.url}/${Deletecategory}`,
        { withCredentials: true }
      );
      if (deletedcategory) {
        console.log(deletedcategory);
        toast.success(deletedcategory?.data?.message);
        Getcategories();
        setopenDeletecategory(false);
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };

  return (
    <section className="h-[calc(100vh-200px)] overflow-auto">
      <div className="bg-white shadow-md w-full py-2 px-3 rounded-sm flex flex-col gap-2 sm:flex-row items-center justify-between pt-3">
        <h6 className="text-[17px] font-semibold">Category</h6>
        <button
          onClick={() => setopencategory(true)}
          className="text-[15px]  rounded-[6px] hover:bg-primary-200 border border-primary-200 px-2 py-1 transition-all"
        >
          Add Category
        </button>
      </div>

      <div className="p-4 h-full">
        {!Datacategory[0] && !loading ? (
          <NoDataHere />
        ) : (
          <div className="grid xs:grid-cols-1 sm:grid-cols-2    lg:grid-cols-3   2xl:grid-cols-5  justify-items-center lg:justify-items-start  gap-4 pt-4 pb-7">
            {Datacategory?.map((catagory) => (
              <>
                <div
                  key={catagory?._id}
                  className="group relative bodrer cursor-pointer border-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.15)]  bg-white flex flex-col items-center justify-center w-[240px]  h-[240px]  sm:w-[160px] lg:w-[170px] "
                >
                  <img
                    src={catagory?.image}
                    className="h-[160px] w-[120px] object-fill  "
                  />

                  <div className="hidden bottom-3 absolute group-hover:flex justify-between items-center gap-2 w-full px-3">
                    <button
                      onClick={() => {
                        setopenEditcategory(true);
                        setcategoryData(catagory);
                      }}
                      className="text-[15px] text-gray-900 bg-green-100 px-3 py-1 rounded-[4px]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setopenDeletecategory(true);
                        setDeletecategory(catagory?._id);
                      }}
                      className="text-[15px] text-gray-900 bg-red-100 px-3 py-1 rounded-[4px]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
        {loading && <Loading />}
      </div>
      {opencategory && (
        <OpenAddCategory
          close={handlecloseAddcategory}
          Getcategories={Getcategories}
        />
      )}
      {openEditcategory && (
        <OpenEditcategory
          onclose={onclose}
          categoryData={categorydata}
          fetchData={Getcategories}
        />
      )}

      {openDeletecategory && (
        <ConfirmBox
          onclose={handleCloseConfirmBox}
          onconfirm={ConfirmDeleted}
        />
      )}
    </section>
  );
};

export default Category;
