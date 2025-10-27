import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import EditSubcategory from "../pages/Subcategories/EditSubcategory";
import AxiosToastError from "../utils/AxiosToastError";
import axios from "axios";
import { Endpoints } from "../common/Endpoint";
import toast from "react-hot-toast";
import ConfirmBox from "./ConfirmBox";

const Tabel = ({ column, data, fetchSubcategory }) => {
  const [openeditsubcategory, setopeneditsubcategory] = useState(false);
  const [EditData, setEditData] = useState({
    _id: "",
  });
  const [deletesub, setdeletesub] = useState("");
  const [openConfirm, setopenConfirm] = useState(false);
  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDelete = async () => {
    try {
      const deleted = await axios.delete(
        `${Endpoints.DeleteSubcategory.url}/${deletesub}`,
        { withCredentials: true }
      );

      if (deleted) {
        toast.success(deleted.data.message);
        fetchSubcategory();
        setopenConfirm(false);
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };
  return (
    <div className="p-2">
      <table className="w-full border-collapse">
        <thead className="bg-black text-white ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th className="text-[16px] whitespace-nowrap">Sr.No</th>
              {headerGroup.headers.map((header) => (
                <th
                  className="text-[16px] border whitespace-nowrap  "
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
              <th className="">Action</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id}>
              <td className="border px-2 ">{index + 1}</td>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border whitespace-nowrap px-2 text-[16px] py-1"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="border">
                <div className="flex items-center justify-center gap-3 ">
                  <button
                    onClick={() => {
                      setopeneditsubcategory(true);
                      setEditData(row.original);
                    }}
                    className="bg-green-100 hover:text-green-400 p-1 transition-all  rounded-full"
                  >
                    <MdOutlineEdit size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setdeletesub(row.original._id);
                      setopenConfirm(true);
                    }}
                    className="bg-red-100 p-1 hover:text-red-400 transition-all rounded-full"
                  >
                    <MdDeleteOutline size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openeditsubcategory && (
        <EditSubcategory
          fetchSubcategory={fetchSubcategory}
          data={EditData}
          onclose={() => setopeneditsubcategory(false)}
        />
      )}
      {openConfirm && (
        <ConfirmBox
          onclose={() => setopenConfirm(false)}
          onconfirm={handleDelete}
        />
      )}
      <div className="h-4" />
    </div>
  );
};

export default Tabel;
