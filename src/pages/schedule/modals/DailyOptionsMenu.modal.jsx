import React, { useEffect, useState } from "react";

import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
//import { getFormattedDate } from "../../../utilities/dateUtils";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Backdrop, Button, Fade, Modal, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../theme/Theme";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: lightTheme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: 24,
  padding: "32px",
};

const DailyOptionsMenu = ({
  isDailyOptionsMenuOpen,
  closeDailyOptionsMenu,
  calendarDateSelected,
  openDayLabelEditor,
}) => {
  const db = getFirestore();

  const [technicians, setTechnicians] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(db, "technicians"), (snapshot) =>
        setTechnicians(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      ),
    [db]
  );

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="daily-options-menu-modal"
        aria-describedby="daily-options"
        open={isDailyOptionsMenuOpen}
        onClose={closeDailyOptionsMenu}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isDailyOptionsMenuOpen}>
          <div style={modalStyle}>
            <Grid2 container>
              <Grid2 xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  Daily Options Menu
                </Typography>
              </Grid2>
              <Grid2 container spacing={1}>
                {technicians &&
                  technicians
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((tech) => (
                      <Grid2 key={tech.id} xs={12}>
                        <Link
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
                            style={{
                              backgroundColor: tech.color,
                              color: "white",
                            }}
                          >
                            {`Print ${tech.name}'s Daily Slips`}
                          </Button>
                        </Link>
                      </Grid2>
                    ))}
              </Grid2>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ marginTop: "12px" }}
                onClick={() => openDayLabelEditor()}
              >
                Day Label Editor
              </Button>
            </Grid2>
            <Grid2
              container
              alignItems="flex-start"
              justifyContent="flex-end"
              direction="row"
              sx={{ marginTop: "16px" }}
            >
              <Button
                size="large"
                variant="outlined"
                color="primary"
                startIcon={<Close />}
                onClick={() => closeDailyOptionsMenu()}
              >
                Close
              </Button>
            </Grid2>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default DailyOptionsMenu;
