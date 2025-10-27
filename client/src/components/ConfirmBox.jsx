import React from 'react'
import { IoClose } from 'react-icons/io5'

const ConfirmBox = ({ onclose, onconfirm }) => {
  return (
    <section className="top-0 right-0 left-0 bottom-0 bg-neutral-900 bg-opacity-60 fixed flex justify-center items-center">
      <div className="max-w-sm bg-white w-full p-3 rounded-sm">
        <div className="flex justify-between items-center">
          <p className="text-[16px] font-semibold">Permanent Delete</p>
          <IoClose className="cursor-pointer" onClick={onclose} />
        </div>
        <p className="text-[16px] text-gray-500 mt-3">
          Are you sure permanent delete ?{" "}
        </p>
        <div className="  justify-end flex gap-2">
          <button
            onClick={onclose}
            className="border border-red-500 px-2  rounded-[5px] py-1 text-red-500 text-[16px] hover:bg-red-500 hover:text-white transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onconfirm}
            className="border border-green-700 px-2  rounded-[5px] py-1 text-green-700 text-[16px] hover:bg-green-700 hover:text-white transition-all"
          >
            Confirm
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmBox
