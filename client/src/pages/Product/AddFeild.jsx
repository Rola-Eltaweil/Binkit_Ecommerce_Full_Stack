import React from 'react'
import { IoClose } from 'react-icons/io5';

const AddFeild = ({onclose , submit , value , onchange}) => {
  return (
    <section className="top-0 right-0 left-0 bottom-0 bg-neutral-900 bg-opacity-60 fixed flex justify-center items-center h-full w-full p-4 ">
      <div className="bg-white relative max-w-sm w-full flex flex-col gap-1 p-3">
        <label className="text-[16px] font-semibold">Add Feild</label>
        <input
          onChange={onchange}
          value={value}
          type="text"
          placeholder="Enter feild name"
          className="px-2 text-[15px] bg-blue-50 outline-none border border-gray-300 focus:border-primary-200 rounded-sm h-8"
        />
        <div className="flex justify-center items-center">
          <button
            onClick={submit}
            className="bg-primary-100 hover:bg-primary-200 px-2 py-1 w-fit text-[15px] rounded-sm mt-1 "
          >
            Add Feild
          </button>
        </div>
        <IoClose
          size={20}
          className="cursor-pointer absolute right-3 hover:text-red-500 transition-all"
          onClick={onclose}
        />
      </div>
    </section>
  );
}

export default AddFeild
