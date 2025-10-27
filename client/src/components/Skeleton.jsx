import React from 'react'

const Skeleton = () => {
  return (
    <div className="border border-gray-300 rounded-sm p-2 flex flex-col gap-2">
      <div className="h-[90px] lg:h-[120px] max-w-72 w-full bg-blue-100 rounded-sm animate-pulse"></div>
      <div className=" h-5 lg:h-6 max-w-24 w-full  bg-blue-100 animate-pulse rounded-sm"></div>
      <div className="h-5 lg:h-6 w-full  bg-blue-100 animate-pulse rounded-sm"></div>
      <div className="h-5 lg:h-6 max-w-24 w-full bg-blue-100 animate-pulse rounded-sm"></div>
      <div className="flex justify-between items-center gap-4 w-full">
        <div className="h-5 lg:h-6 w-full bg-blue-100 animate-pulse rounded-sm"></div>
        <div className="h-5 lg:h-6 w-full bg-blue-100 animate-pulse rounded-sm"></div>
      </div>
    </div>
  );
}

export default Skeleton
