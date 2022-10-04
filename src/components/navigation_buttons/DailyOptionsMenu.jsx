import { useSyncedCollection } from "../../firebase/firestore.utils";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import { CalendarMonth, CalendarToday, Close } from "@mui/icons-material";
import "../../global_style/style.css";

const DailyOptionsMenu = ({
  closeModalOne,
  calendarDateSelected,
  openDayLabelEditor,
}) => {
  const technicians = useSyncedCollection("technicians");
  return (
    <div className="container">
      <div className="buttonBarStack">
        {technicians &&
          technicians
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((tech) => (
              <Link
                key={tech.id}
                to={{
                  pathname: `/print_daily_slips/${tech.id}`,
                }}
                state={{
                  techLead: `${tech.name}`,
                  date: calendarDateSelected,
                }}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<CalendarMonth />}
                  style={{
                    backgroundColor: tech.color,
                    color: "white",
                  }}
                >
                  {`Print ${tech.name}'s Daily Slips`}
                </Button>
              </Link>
            ))}
        <button
          type="button"
          className="standardButton"
          style={{ backgroundColor: "teal", color: "white", marginLeft: 0 }}
          onClick={() => openDayLabelEditor(calendarDateSelected)}
        >
          <CalendarToday />
          <span className="iconSeperation">Day Label Editor</span>
        </button>
        <button
          type="button"
          className="standardButton"
          style={{ backgroundColor: "teal", color: "white", marginLeft: 0 }}
          onClick={() => closeModalOne()}
        >
          <Close />
          <span className="iconSeperation">Close</span>
        </button>
      </div>
    </div>
  );
};

export default DailyOptionsMenu;
