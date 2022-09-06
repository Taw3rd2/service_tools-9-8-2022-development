import { useEffect, useRef, useState } from "react";

import { logOut } from "../../firebase/firestore.utils";
import { useNavigate } from "react-router-dom";

import "./topbar.css";

const Topbar = ({ currentUser, setUser }) => {
  let navigate = useNavigate();
  const btnRef = useRef();

  const [isDropDownopen, setDropDownOpen] = useState(false);

  //click anywhere to close the logout menu
  useEffect(() => {
    const closeDropDown = (e) => {
      if (e.path[0] !== btnRef.current) {
        setDropDownOpen(false);
      }
    };
    document.body.addEventListener("click", closeDropDown);
    return () => document.body.removeEventListener("click", closeDropDown);
  }, []);

  const handleLogOut = async () => {
    try {
      logOut().then(() => {
        console.log("Signed Out!");
        setDropDownOpen(false);
        setUser({});
        navigate("/");
      });
    } catch {
      alert("I had trouble signing out! Network conjestion?");
    }
  };

  const links = [
    { name: "Customers", path: "/homepage", key: 0 },
    { name: "Schedule", path: "/schedule", key: 1 },
    { name: "Settings", path: "/settings", key: 2 },
    // { name: "Inventory", link: "/parts_catalog", key: 3 },
    // { name: "Accounting", link: "/accounting", key: 4 },
  ];

  const getDisplayName = (user) => {
    if (user.displayName) {
      return user.displayName;
    } else if (user.email) {
      return user.email;
    } else {
      return "";
    }
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="topbarLogo">Service Tools</span>
      </div>
      <div className="topbarCenter">
        {currentUser.displayName || currentUser.email ? (
          links.map((link) => (
            <button
              key={link.key}
              onClick={() => navigate(link.path)}
              className="topbarButtonLink"
            >
              {link.name}
            </button>
          ))
        ) : (
          <div />
        )}
      </div>
      <div className="topbarRight">
        <div className="topbarDropdown">
          <div
            ref={btnRef}
            className="topbarUser"
            onClick={() => setDropDownOpen(!isDropDownopen)}
          >
            {getDisplayName(currentUser)}
          </div>

          {isDropDownopen && (
            <div className="topbarDropdownContent">
              <div
                className="topbarDropdownLink"
                onClick={() => handleLogOut()}
              >
                Log Out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
