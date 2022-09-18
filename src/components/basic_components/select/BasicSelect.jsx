import { KeyboardArrowDown } from "@mui/icons-material";
//import { useState } from "react";
import "./basicSelect.css";

export const BasicSelect = ({
  isMenuOpen,
  setMenuOpen,
  menuItems,
  item,
  setItem,
}) => {
  const openMenuList = () => {
    // const wrapper = document.querySelector(".wrapper");
    // wrapper.classList.toggle("active");
    setMenuOpen(!isMenuOpen);
  };

  const handleSelection = (item) => {
    setItem(item);
    setMenuOpen(false);
  };

  return (
    <div className="wrapper">
      <div className="selectButton" onClick={() => openMenuList()}>
        <span>{item}</span>
        <i className={isMenuOpen ? "iconOpen" : "iconClosed"}>
          <KeyboardArrowDown />
        </i>
      </div>

      {isMenuOpen && (
        <div className="content">
          <ul className="options">
            {menuItems.length > 0 &&
              menuItems.map((itm, index) => (
                <li key={index} onClick={() => handleSelection(itm)}>
                  {itm.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
