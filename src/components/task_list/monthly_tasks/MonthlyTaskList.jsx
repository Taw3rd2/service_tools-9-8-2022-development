import React, { useState } from "react";

import {
  Card,
  CardContent,
  Collapse,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { Bathtub, Business, ExpandLess, ExpandMore } from "@mui/icons-material";

const MonthlyTaskList = () => {
  //collapse HT list
  const [isHTListOpen, setHTListOpen] = useState(false);
  const handleOpenHTList = () => {
    setHTListOpen(!isHTListOpen);
  };

  return (
    <Card
      variant="outlined"
      sx={{ marginTop: "16px", overflow: "auto", maxHeight: 312 }}
    >
      <CardContent>
        <List
          dense
          component="nav"
          aria-labelledby="nested-todo-list"
          sx={{ paddingY: "8px" }}
          subheader={
            <ListSubheader component="div" id="nested-todo-list">
              <Typography variant="h6" color="primary">
                Monthly Task List
              </Typography>
            </ListSubheader>
          }
        >
          <hr />

          <ListItem button onClick={handleOpenHTList}>
            <ListItemIcon>
              <Business sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="HT List" />
            {isHTListOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={isHTListOpen} timeout="auto" unmountOnExit>
            <List dense component="div" disablePadding>
              <ListItem button sx={{ paddingLeft: "32px" }}>
                <ListItemIcon>
                  <Bathtub sx={{ color: "brown" }} />
                </ListItemIcon>
                <ListItemText primary="Bath And Body Hong Kong" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </CardContent>
    </Card>
  );
};

export default MonthlyTaskList;
