import { useEffect, useState } from "react";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firestore.utils";

import { useLocation } from "react-router-dom";

import PrintDailySlip from "./print_daily/PrintDailySlip";
import ViewDailySlip from "./view_daily/ViewDailySlip";

import { useMediaQuery } from "@mui/material";

const PrintDailySlips = () => {
  const location = useLocation();
  const matchesPrint = useMediaQuery("print");

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventReference = collection(db, "events");
    const eventQuery = query(
      eventReference,
      where("dateScheduled", "==", location.state.date),
      where("techLead", "==", location.state.techLead)
    );

    const unsubscribe = onSnapshot(eventQuery, (snapshot) => {
      setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe();
  }, [location.state.date, location.state.techLead]);

  return (
    <>
      {matchesPrint ? (
        <div
          style={{
            pageBreakAfter: "always",
            display: "grid",
            gridTemplateColumns: "48%48%",
          }}
        >
          {events.map((event, index) => (
            <PrintDailySlip key={index}> {event} </PrintDailySlip>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {events.map((event, index) => (
            <ViewDailySlip key={index}> {event} </ViewDailySlip>
          ))}
        </div>
      )}
    </>
  );
};

export default PrintDailySlips;
