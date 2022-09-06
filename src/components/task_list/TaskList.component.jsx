import React, { useState } from "react";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Button,
  Collapse,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { AddTask, ExpandLess, ExpandMore } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme/Theme";
import DailyTaskList from "./daily_task/DailyTaskList";
import MonthlyTaskList from "./monthly_tasks/MonthlyTaskList";

const TaskList = () => {
  const [isTaskListOpen, setTaskListOpen] = useState(false);
  const handleOpenTaskList = () => {
    setTaskListOpen(!isTaskListOpen);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Container
        sx={{
          flexGrow: 1,
          border: "1px solid black",
          backgroundColor: "lightgray",
          m: "4px",
        }}
      >
        <List dense component="nav" aria-labelledby="nested-task-list">
          <ListItem button onClick={handleOpenTaskList}>
            <ListItemText>
              <Typography variant="h5" gutterBottom color="primary">
                Task List
              </Typography>
            </ListItemText>
            {isTaskListOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </List>
      </Container>
      <Container
        component={Paper}
        sx={{ overflow: "auto", maxHeight: "340px" }}
      >
        <Collapse in={isTaskListOpen} timeout="auto" unmountOnExit>
          <Grid2 container spacing={2} sx={{ mb: "8px" }}>
            <Grid2 xs={6}>
              <DailyTaskList />
            </Grid2>

            <Grid2 xs={6}>
              <MonthlyTaskList />
            </Grid2>
          </Grid2>
        </Collapse>
      </Container>

      <Grid2
        container
        alignItems="flex-start"
        justifyContent="flex-end"
        direction="row"
        mt={1}
        mb={2}
      >
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddTask />}
          sx={{ background: lightTheme.palette.primary.contrastText }}
          onClick={() => alert("Soon...")}
        >
          Task Manager
        </Button>
      </Grid2>
    </ThemeProvider>
  );
};

export default TaskList;
