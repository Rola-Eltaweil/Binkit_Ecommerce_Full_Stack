import React, { Children } from 'react'
import MenuAccountmobile from '../../components/MenuAccountmobile'
import { Outlet } from 'react-router-dom'
import UseMobile from '../../Hooks/UseMobile';

const Layout_Dashboard = ( ) => {
    const[isMobile]=UseMobile()
  return (
    <div className="overflow-auto grid grid-cols-1 md:grid-cols-[230px,1fr]   bg-white   px-2  md:px-12">
      {/* left side  */}

      {!isMobile && (
        <div className={` min-h-[81vh] border-r  pt-6`}>
          <MenuAccountmobile />
        </div>
      )}

      {/* right side  */}
      <div className="  ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout_Dashboard
