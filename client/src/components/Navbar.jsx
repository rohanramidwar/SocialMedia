import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";

import { CLEARPOSTS, LOGOUT } from "../constants/actionTypes";
import { Plus } from "lucide-react";
import { Tooltip } from "@mui/material";
import { getAllPosts } from "../actions/postActions";

const Navbar = () => {
  //result and token
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const signOut = () => {
    dispatch({ type: LOGOUT });
    navigate("/auth");
    setUser(null);
  };

  const titleClicked = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      dispatch({ type: CLEARPOSTS });
      dispatch(getAllPosts(1));
    }
  };

  return (
    <div className="fixed z-10 w-full flex justify-between items-center h-11 bg-[#ff675e] px-2 sm:px-7">
      <div role="button" onClick={titleClicked}>
        <p className="font-black text-lg text-slate-50">ideasloom</p>
      </div>
      <div className="flex gap-4 items-center">
        <Tooltip title="Create a post">
          <Link to="/create">
            <div role="button" className="text-gray-50 p-2 rounded-md">
              <Plus size={30} />
            </div>
          </Link>
        </Tooltip>
        {user ? (
          <Menu as="div" className="relative flex">
            <Menu.Button>
              <Tooltip title="Profile">
                <img
                  src={user?.result?.profilePic}
                  alt="profilePic"
                  className="rounded-xl w-10 h-10"
                />
              </Tooltip>
            </Menu.Button>
            <Menu.Items
              as="div"
              className="flex flex-col justify-start w-[221px] bg-gray-50 shadow rounded-xl p-2 absolute top-11 -right-2"
            >
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`text-sm p-2 text-start ${
                      active && "bg-gray-200 rounded-md"
                    }`}
                  >
                    <Link to="/create">Create a post</Link>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`text-sm p-2 text-start ${
                      active && "bg-gray-200 rounded-md"
                    }`}
                  >
                    Settings
                  </button>
                )}
              </Menu.Item>
              <div className="border border-gray-300 my-1"></div>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={signOut}
                    className={`text-sm p-2 text-start ${
                      active && "bg-gray-200 rounded-md"
                    }`}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <Link to="/auth">
            <button className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 hover:scale-105 text-zinc-50 font-medium rounded-md text-lg">
              Sign in
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
