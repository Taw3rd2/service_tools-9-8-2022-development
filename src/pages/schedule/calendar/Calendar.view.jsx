import {
  db,
  useSyncedEvents,
  useSyncedLabels,
} from "../../../firebase/firestore.utils";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "./calendarView.css";
import { SettingsOutlined } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../theme/Theme";
import { collection } from "firebase/firestore";

const settingsButton = {
  borderRadius: "5px",
  marginTop: "4px",
  marginLeft: "4px",
  paddingBottom: 0,
  paddingRight: 0,
  paddingLeft: 1.5,
  paddingTop: 2,
  cursor: "pointer",
  minWidth: 33,
  maxWidth: 33,
  "&:hover": {
    background: "#efefef",
  },
};
const regButton = {
  textAlign: "center",
  marginTop: "4px",
  minWidth: 33,
  maxWidth: 33,
  fontSize: "16px",
  "&:hover": {
    background: "#efefef",
  },
};

const Calendar = ({
  technician,
  technicians,
  openDispatchDetails,
  openDailyOptionsMenu,
  openCalendarCustomerSearch,
}) => {
  const labels = useSyncedLabels(collection(db, "calLabel"));
  const events = useSyncedEvents(collection(db, "events"));

  console.log("events", events.length);

  const getFilteredEvents = () => {
    let filteredEvents = [];
    if (technician === "ALL") {
      filteredEvents = events;
    } else {
      filteredEvents = events.filter(function (e) {
        return e.techLead === technician;
      });
    }
    return filteredEvents;
  };

  const getFilteredLabels = () => {
    let filteredLabels = [];
    if (technician === "ALL") {
      filteredLabels = labels;
    } else {
      filteredLabels = labels.filter(function (l) {
        return l.tech === technician;
      });
    }
    return filteredLabels;
  };

  const eventColorSetter = (eventData) => {
    var newBackgroundColor = "#000873";

    technicians.length > 0 &&
      technicians.map((tech) => {
        if (tech.name === eventData.techLead) {
          return (newBackgroundColor = tech.color);
        } else {
          return newBackgroundColor;
        }
      });

    eventData.backgroundColor = newBackgroundColor;
    eventData.borderColor = "black";
    return eventData;
  };

  const eventBorderColorSetter = (info) => {
    if (info.event.extendedProps.status === "active") {
      info.el.style.boxShadow = "inset 0 0 0 3px #30db30";
      info.el.style.cursor = "pointer";
    } else if (info.event.extendedProps.status === "scheduled") {
      info.el.style.boxShadow = "inset 0 0 0 3px blue";
      info.el.style.cursor = "pointer";
    } else if (info.event.extendedProps.status === "parts") {
      info.el.style.boxShadow = "inset 0 0 0 3px orange";
      info.el.style.cursor = "pointer";
    } else {
      info.el.style.boxShadow = "inset 0 0 0 1px black";
      info.el.style.cursor = "pointer";
    }
  };

  const customDateHeader = ({
    date,
    dayNumberText,
    dow,
    isDisabled,
    isFuture,
    isOther,
    isPast,
    isToday,
    view,
  }) => {
    if (labels.length > 0) {
      let cityLabels = [];
      let dayLabels = getFilteredLabels();

      dayLabels.forEach((label) => {
        if (label.labelDate.getTime() === date.getTime()) {
          cityLabels.push(label.locationName.toString());
        }
      });
      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={settingsButton}
            onClick={() => openDailyOptionsMenu(date)}
          >
            <SettingsOutlined style={{ margin: "0px", padding: "0px" }} />
          </Button>

          <Typography
            sx={{
              flexGrow: 5,
              wordWrap: "break-word",
              wordBreak: "break-word",
              textAlign: "center",
            }}
            color="primary"
            variant="body1"
            gutterBottom
          >
            {cityLabels.join(" ")}
          </Typography>

          <Button
            variant="outlined"
            color="primary"
            size="small"
            sx={regButton}
            onClick={() => openCalendarCustomerSearch(date)}
          >
            <strong>{dayNumberText}</strong>
          </Button>
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button style={settingsButton}>
            <SettingsOutlined style={{ margin: "0px", padding: "0px" }} />
          </button>
          <Typography
            sx={{ flexGrow: 5 }}
            variant="body1"
            gutterBottom
          ></Typography>
          <Button variant="outlined" size="small" sx={regButton}>
            <strong>{dayNumberText}</strong>
          </Button>
        </div>
      );
    }
  };

  const selectEvent = (eventInfo) => {
    openDispatchDetails(eventInfo.event);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        events={[...getFilteredEvents()]}
        eventDisplay="block"
        eventDataTransform={eventColorSetter}
        displayEventTime={false}
        dayCellContent={customDateHeader}
        eventClick={selectEvent}
        eventDidMount={eventBorderColorSetter}
        height={1000}
      />
    </ThemeProvider>
  );
};

export default Calendar;
