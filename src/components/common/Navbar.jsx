// import React, { useEffect, useState } from "react";
// import { Link, matchPath } from "react-router-dom";
// import { NavbarLinks } from "../../data/navbar-links";
// import logo from "../../assets/Logo/Logo-Full-Light.png";
// import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { ACCOUNT_TYPE } from "../../utils/constant";
// import { BsChevronDown } from "react-icons/bs";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import ProfileDropDown from "../core/Auth/ProfileDropDown";
// import { apiConnector } from "../../service/apiconnector";
// import { categories } from "../../service/apis";

// const Navbar = () => {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { totalItems } = useSelector((state) => state.cart);
//   const [subLinks, setSubLinks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch sub-links for the dropdown
//   const fetchSubLinks = async () => {
//     setLoading(true);
//     try {
//       const result = await apiConnector("GET", categories.CATEGORIES_API);
//       setSubLinks(result.data.data);
//       //(
//         "result.data.data==========================****",
//         result.data.data
//       );
//     } catch (error) {
//       console.error(error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchSubLinks();
//   }, []);

//   const location = useLocation();

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname);
//   };

//   return (
//     <div className="h-14 flex items-center justify-center border-b-[1px] border-b-richblack-700">
//       <div className="flex flex-row items-center w-11/12 max-w-maxContent justify-between">
//         {/* Logo */}
//         <Link to="/">
//           <img src={logo} width={160} height={42} loading="lazy" alt="Logo" />
//         </Link>

//         {/* Navigation Links */}
//         <nav>
//           <ul className="flex gap-x-6 text-richblack-25">
//             {NavbarLinks.map((item, index) => (
//               <li className="cursor-pointer" key={index}>
//                 {item.title === "Catalog" ? (
//                   <div
//                     className={`group relative flex cursor-pointer items-center gap-1 ${
//                       matchRoute("/catalog/:catalogName")
//                         ? "text-yellow-25"
//                         : "text-richblack-25"
//                     }`}
//                   >
//                     <p>{item.title}</p>
//                     <BsChevronDown />

//                     {/* Dropdown container */}
//                     <div
//                       className="
//                       absolute left-1/2 top-full mt-2 transform -translate-x-1/2
//                       invisible opacity-0 group-hover:visible group-hover:opacity-100
//                       transition-all duration-200 flex flex-col bg-richblack-800 rounded-md
//                       shadow-lg p-5 text-white lg:w-[300px]
//                       z-[9999]"
//                     >
//                       {/* Arrow for dropdown */}
//                       <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-richblack-800 rotate-45"></div>

//                       {/* Dropdown content */}
//                       {loading ? (
//                         <p className="text-center">Loading...</p>
//                       ) : subLinks && subLinks?.length > 0 ? (
//                         subLinks.map((subLink, i) => (
//                           <Link
//                             key={i}
//                             to={`/catalog/${subLink._id}`}
//                             className="py-2 px-4 hover:bg-richblack-700 rounded"
//                           >
//                             {subLink.name}
//                           </Link>
//                         ))
//                       ) : (
//                         <p className="text-center">No Courses Found</p>
//                       )}
//                     </div>
//                   </div>
//                 ) : (
//                   <Link to={item?.path}>
//                     <p
//                       className={`${
//                         matchRoute(item?.path)
//                           ? "text-yellow-25"
//                           : "text-richblack-25"
//                       }`}
//                     >
//                       {item.title}
//                     </p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Login, Signup, or Profile */}
//         <div className="hidden items-center gap-x-4 md:flex">
//           {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//             <Link to="/dashboard/cart" className="relative">
//               <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
//               {totalItems > 0 && (
//                 <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           )}
//           {token === null && (
//             <>
//               <Link to="/login">
//                 <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                   Log in
//                 </button>
//               </Link>
//               <Link to="/signup">
//                 <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                   Sign up
//                 </button>
//               </Link>
//             </>
//           )}
//           {token !== null && <ProfileDropDown />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../utils/constant";
import { BsChevronDown } from "react-icons/bs";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../service/apiconnector";
import { categories } from "../../service/apis";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogMenuOpen, setCatalogMenuOpen] = useState(false); // State for controlling catalog dropdown on mobile

  // Fetch sub-links for the dropdown
  const fetchSubLinks = async () => {
    setLoading(true);
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.data);
      //("Fetched Categories: ", result.data.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCatalogMenu = () => {
    setCatalogMenuOpen(!catalogMenuOpen);
  };

  return (
    <div className="border-b-[1px] border-b-richblack-700">
      {/* Desktop Navbar */}
      <div className="hidden md:flex h-14 items-center justify-center">
        <div className="flex flex-row items-center w-11/12 max-w-maxContent justify-between">
          {/* Logo */}
          <Link to="/">
            <img src={logo} width={160} height={42} loading="lazy" alt="Logo" />
          </Link>

          {/* Navigation Links */}
          <nav>
            <ul className="flex gap-x-6 text-richblack-25">
              {NavbarLinks.map((item, index) => (
                <li className="cursor-pointer" key={index}>
                  {item.title === "Catalog" ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{item.title}</p>
                      <BsChevronDown />

                      {/* Dropdown container */}
                      <div
                        className="
                        absolute left-1/2 top-full mt-2 transform -translate-x-1/2
                        invisible opacity-0 group-hover:visible group-hover:opacity-100
                        transition-all duration-200 flex flex-col bg-richblack-800 rounded-md
                        shadow-lg p-5 text-white lg:w-[300px]
                        z-[9999]"
                      >
                        {/* Arrow for dropdown */}
                        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-richblack-800 rotate-45"></div>

                        {/* Dropdown content */}
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks && subLinks?.length > 0 ? (
                          subLinks.map((subLink, i) => (
                            <Link
                              key={i}
                              to={`/catalog/${subLink._id}`}
                              className="py-2 px-4 hover:bg-richblack-700 rounded"
                            >
                              {subLink.name}
                            </Link>
                          ))
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={item?.path}>
                      <p
                        className={`${
                          matchRoute(item?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {item.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Login, Signup, or Profile */}
          <div className="hidden items-center gap-x-4 md:flex">
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {token === null && (
              <>
                <Link to="/login">
                  <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                    Sign up
                  </button>
                </Link>
              </>
            )}
            {token !== null && <ProfileDropDown />}
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden bg-richblack-800">
        {/* Top Bar with Logo and Menu Button */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Logo" width={120} height={32} loading="lazy" />
          </Link>

          {/* Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="text-richblack-100 text-2xl focus:outline-none"
          >
            {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <nav className="flex flex-col bg-richblack-800 text-richblack-25 px-4 py-2">
            <Link
              to="/"
              className="py-2 px-4 hover:bg-richblack-700 rounded"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <div className="relative">
              <button
                onClick={toggleCatalogMenu}
                className="flex items-center py-2 px-4 w-full hover:bg-richblack-700 rounded"
              >
                Catalog
                <BsChevronDown />
              </button>
              {catalogMenuOpen && (
                <div
                  className="
                  absolute left-1/2 top-full mt-2 transform -translate-x-1/2
                  flex flex-col bg-richblack-800 rounded-md shadow-lg p-5 text-white lg:w-[300px]
                  z-[9999]"
                >
                  <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-richblack-800 rotate-45"></div>
                  {loading ? (
                    <p className="text-center">Loading...</p>
                  ) : subLinks && subLinks?.length > 0 ? (
                    subLinks.map((subLink, i) => (
                      <Link
                        key={i}
                        to={`/catalog/${subLink._id}`}
                        className="py-2 px-4 hover:bg-richblack-700 rounded"
                      >
                        {subLink.name}
                      </Link>
                    ))
                  ) : (
                    <p className="text-center">No Courses Found</p>
                  )}
                </div>
              )}
            </div>
            <Link
              to="/about"
              className="py-2 px-4 hover:bg-richblack-700 rounded"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="py-2 px-4 hover:bg-richblack-700 rounded"
              onClick={toggleMenu}
            >
              Contact Us
            </Link>
            {/* More links if needed */}
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link
                to="/dashboard/cart"
                className="py-2 px-4 hover:bg-richblack-700 rounded"
                onClick={toggleMenu}
              >
                Cart ({totalItems})
              </Link>
            )}
            {token === null && (
              <>
                <Link
                  to="/login"
                  className="py-2 px-4 hover:bg-richblack-700 rounded"
                  onClick={toggleMenu}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="py-2 px-4 hover:bg-richblack-700 rounded"
                  onClick={toggleMenu}
                >
                  Sign up
                </Link>
              </>
            )}
            {token !== null && (
              <div className="py-2 px-4 hover:bg-richblack-700 rounded">
                <ProfileDropDown />
              </div>
            )}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Navbar;
