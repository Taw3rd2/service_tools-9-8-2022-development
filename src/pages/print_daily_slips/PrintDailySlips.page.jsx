import React, { useEffect, useState } from "react";
import PrintDailySlip from "./PrintDailySlip";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";

import ViewDailySlip from "./ViewDailySlip";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useMediaQuery } from "@mui/material";

const PrintDailySlips = () => {
  const db = getFirestore();
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
  }, [db, location.state.date, location.state.techLead]);

  return (
    <>
      {matchesPrint ? (
        <div style={{ marginTop: "16px", pageBreakAfter: "always" }}>
          <Grid2 container spacing={3}>
            {events.map((event, index) => (
              <PrintDailySlip key={index}> {event} </PrintDailySlip>
            ))}
          </Grid2>
        </div>
      ) : (
        <div style={{ marginTop: "16px", flexGrow: 1 }}>
          <Grid2 container>
            {events.map((event, index) => (
              <ViewDailySlip key={index}> {event} </ViewDailySlip>
            ))}
          </Grid2>
        </div>
      )}
    </>
  );
};

export default PrintDailySlips;
