import React, { useState } from "react";

import {
  Card,
  CardContent,
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import {
  AccessTime,
  AirportShuttle,
  Announcement,
  BorderOuter,
  Call,
  Construction,
  CreateNewFolder,
  ExpandLess,
  ExpandMore,
  FileCopy,
  Keyboard,
  PhoneCallback,
  ViewModule,
} from "@mui/icons-material";

const DailyTaskList = () => {
  //collapse office daily
  const [isOfficeDailyOpen, setOfficeDailyOpen] = useState(false);
  const handleOpenOfficeDaily = () => {
    setOfficeDailyOpen(!isOfficeDailyOpen);
  };

  //collapse material orders tracking
  const [isMaterialTrackingOpen, setMaterialTrackingOpen] = useState(false);
  const handleOpenMaterialTracking = () => {
    setMaterialTrackingOpen(!isMaterialTrackingOpen);
  };

  //stock orders
  const [stockOrdersCheck, setStockOrdersCheck] = useState(false);
  const handleStockOrdersCheck = () => {
    setStockOrdersCheck(!stockOrdersCheck);
  };

  //maintenance orders
  const [maintenanceOrdersCheck, setMaintenanceOrdersCheck] = useState(false);
  const handleMaintenanceOrdersCheck = () => {
    setMaintenanceOrdersCheck(!maintenanceOrdersCheck);
  };

  //commercial orders
  const [commercialOrdersCheck, setCommercialOrdersCheck] = useState(false);
  const handleCommercialOrdersCheck = () => {
    setCommercialOrdersCheck(!commercialOrdersCheck);
  };

  //collapse next service day
  const [isNextServiceDayOpen, setNextServiceDayOpen] = useState(false);
  const handleOpenNextServiceDay = () => {
    setNextServiceDayOpen(!isNextServiceDayOpen);
  };

  //collapse next maintenance day
  const [isNextMaintenanceDayOpen, setNextMaintenanceDayOpen] = useState(false);
  const handleOpenNextMaintenanceDay = () => {
    setNextMaintenanceDayOpen(!isNextMaintenanceDayOpen);
  };

  //collapse next install day
  const [isNextInstallDayOpen, setNextInstallDayOpen] = useState(false);
  const handleOpenNextInstallDay = () => {
    setNextInstallDayOpen(!isNextInstallDayOpen);
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
          subheader={
            <ListSubheader
              component="div"
              id="nested-todo-list"
              sx={{ paddingY: "8px" }}
            >
              <Typography variant="h6" color="primary">
                Daily Task List
              </Typography>
            </ListSubheader>
          }
        >
          <hr />
          <ListItem button onClick={handleOpenOfficeDaily}>
            <ListItemIcon>
              <Keyboard sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Office Daily" />
            {isOfficeDailyOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isOfficeDailyOpen} timeout="auto" unmountOnExit>
            <List dense component="div" disablePadding>
              <ListItem button sx={{ paddingLeft: "32px" }}>
                <ListItemIcon>
                  <Announcement style={{ color: "brown" }} />
                </ListItemIcon>
                <ListItemText primary="After Hours List" />
              </ListItem>

              <ListItem button sx={{ paddingLeft: "32px" }}>
                <ListItemIcon>
                  <PhoneCallback style={{ color: "blue" }} />
                </ListItemIcon>
                <ListItemText primary="Phones Redirected" />
              </ListItem>
            </List>
          </Collapse>
          <hr />
          <ListItem button onClick={handleOpenMaterialTracking}>
            <ListItemIcon>
              <AccessTime sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Material Orders Tracking" />
            {isMaterialTrackingOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isMaterialTrackingOpen} timeout="auto" unmountOnExit>
            <List dense component="div" disablePadding>
              <ListItem
                button
                sx={{ paddingLeft: "32px" }}
                onClick={handleStockOrdersCheck}
              >
                <ListItemIcon>
                  <ViewModule sx={{ color: "brown" }} />
                </ListItemIcon>
                <ListItemText primary="Stock Orders" />
                <Checkbox
                  edge="start"
                  checked={stockOrdersCheck}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItem>

              <ListItem
                button
                sx={{ paddingLeft: "32px" }}
                onClick={handleMaintenanceOrdersCheck}
              >
                <ListItemIcon>
                  <ViewModule sx={{ color: "brown" }} />
                </ListItemIcon>
                <ListItemText primary="Maintenance Orders" />
                <Checkbox
                  edge="start"
                  checked={maintenanceOrdersCheck}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItem>

              <ListItem
                button
                sx={{ paddingLeft: "32px" }}
                onClick={handleCommercialOrdersCheck}
              >
                <ListItemIcon>
                  <ViewModule sx={{ color: "brown" }} />
                </ListItemIcon>
                <ListItemText primary="Commercial HT Orders" />
                <Checkbox
                  edge="start"
                  checked={commercialOrdersCheck}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItem>
            </List>
          </Collapse>
          <hr />
          <ListItem button onClick={handleOpenNextServiceDay}>
            <ListItemIcon>
              <AirportShuttle sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Next Service Day" />
            {isNextServiceDayOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isNextServiceDayOpen} timeout="auto" unmountOnExit>
            <List dense component="div" disablePadding>
              <ListItem button sx={{ paddingLeft: "32px" }}>
                <ListItemIcon>
                  <Call style={{ color: "blue" }} />
                </ListItemIcon>
                <ListItemText primary="Appointment Confirmation" />
              </ListItem>

              <ListItem button sx={{ paddingLeft: "32px" }}>
                <ListItemIcon>
                  <BorderOuter style={{ color: "brown" }} />
                </ListItemIcon>
                <ListItemText primary="Pull Material" />
              </ListItem>
            </List>
          </Collapse>
          <hr />
          <ListItem button onClick={handleOpenNextInstallDay}>
            <ListItemIcon>
              <AirportShuttle sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Next Install Day" />
            {isNextInstallDayOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isNextInstallDayOpen} timeout="auto" unmountOnExit>
            <List dense component="div" disablePadding>
              <ListItem button sx={{ paddingLeft: "32px" }}>
                <ListItemIcon>
                  <Call style={{ color: "blue" }} />
                </ListItemIcon>
                <ListItemText primary="Appointment Confirmation" />
              </ListItem>

              <ListItem button sx={{ paddingLeft: "32px" }}>
                <ListItemIcon>
                  <CreateNewFolder style={{ color: "tan" }} />
                </ListItemIcon>
                <ListItemText primary="Install Invoice" />
              </ListItem>

              <ListItem button sx={{ paddingLeft: "32px" }}>
                <ListItemIcon>
                  <CreateNewFolder style={{ color: "tan" }} />
                </ListItemIcon>
                <ListItemText primary="Startup Invoice" />
              </ListItem>

              <ListItem button sx={{ paddingLeft: "32px" }}>
                <ListItemIcon>
                  <CreateNewFolder style={{ color: "tan" }} />
                </ListItemIcon>
                <ListItemText primary="Install Checklists" />
              </ListItem>

              <ListItem button sx={{ paddingLeft: "32px" }}>
                <ListItemIcon>
                  <CreateNewFolder style={{ color: "tan" }} />
                </ListItemIcon>
                <ListItemText primary="Permit" />
              </ListItem>

              <ListItem button sx={{ paddingLeft: "32px" }}>
                <ListItemIcon>
                  <FileCopy />
                </ListItemIcon>
                <ListItemText primary="Copies" />
              </ListItem>
            </List>
          </Collapse>
          <hr />
          <ListItem button onClick={handleOpenNextMaintenanceDay}>
            <ListItemIcon>
              <AirportShuttle sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Next Maintenance Day" />
            {isNextMaintenanceDayOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isNextMaintenanceDayOpen} timeout="auto" unmountOnExit>
            <List dense component="div" disablePadding>
              <ListItem button sx={{ paddingLeft: "32px" }}>
                <ListItemIcon>
                  <Call style={{ color: "blue" }} />
                </ListItemIcon>
                <ListItemText primary="Appointment Confirmation" />
              </ListItem>

              <ListItem button sx={{ paddingLeft: "32px" }}>
                <ListItemIcon>
                  <CreateNewFolder style={{ color: "tan" }} />
                </ListItemIcon>
                <ListItemText primary="Maintenance Invoices" />
              </ListItem>
            </List>
          </Collapse>
          <hr />

          <ListItem button sx={{ paddingLeft: "32px" }}>
            <ListItemIcon>
              <Construction style={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Hot items" />
          </ListItem>

          <ListItem button sx={{ paddingLeft: "32px" }}>
            <ListItemIcon>
              <Construction style={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Custom Items" />
          </ListItem>

          <ListItem button sx={{ paddingLeft: "32px" }}>
            <ListItemIcon>
              <Construction style={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Sub Menus?" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default DailyTaskList;
