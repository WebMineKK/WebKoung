import * as React from "react";
import { useState } from "react";
import arrow from "../../src/assets/arrow-left.svg";
import navbarList from "../components/ListnavBar";
import { Route, Router, Switch, useHistory, useLocation } from "react-router-dom";

export default function NavBar() {
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between overflow-y-auto overflow-x-hidden">
        <div
          className={` ${open ? "w-72" : "w-20 "
            } bg-gray-900 h-screen p-5 pt-8  duration-300`}
        >
          <img
            src={arrow}
            height="10px"
            className={`absolute cursor-pointer -right-3 w-6 z-10  bg
       rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <img
              src=""
              className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                }`}
            >
              Jaaaaaa A
            </h1>
          </div>
          <ul className="pt-6">
            {navbarList.map((Menu, index) => (

              <li
                className={`flex rounded-md p-3 cursor-pointer hover:bg-zinc-50/20  text-gray-100 text-sm items-center 
       ${Menu.gap ? "mt-2" : "mt-2"} ${pathname === Menu.path && "bg-zinc-50/20"} `}
                key={index}
                onClick={() => history.push(Menu.path)}
              >
                <span className="w-5">{Menu.icon}</span>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  <span className="pl-5">{Menu.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
