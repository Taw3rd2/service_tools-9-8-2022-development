//import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";
import { AddCircle, Assignment, BuildCircle } from "@mui/icons-material"; //Assignment, AddCircle } from "@mui/icons-material";
import { lightTheme } from "../../theme/Theme";

const reportButton = {
  border: "1px solid black",
  textAlign: "center",
  cursor: "pointer",
  background: "#FFF",
  padding: "8px",
};

const ActiveButtons = ({
  customer,
  openCreateDispatch,
  openDispatchHistory,
  openWarrantyList,
  openMaintenanceList,
  openPartsQuoteList,
  //openPartsQuoteListModal,
}) => {
  //const navigate = useNavigate();

  // const routeToPartsQuoteCreator = () => {
  //   const selectedEquipment = {
  //     equipmentName: "",
  //     equipmentBrand: "",
  //     equipmentModel: "",
  //     equipmentSerial: "",
  //   };
  //   const quoteData = {
  //     id: "",
  //     jobNumber: "",
  //     quoteDate: new Date(),
  //     parts: [],
  //     laborHours: 1,
  //     laborRate: 79,
  //     maintenance: false,
  //     rediagnostic: false,
  //     regularShippingTime: "5-7 days",
  //     quickShippingTime: "1-3 days",
  //     regularShippingRate: 25,
  //     quickShippingRate: 75,
  //     shippingNotes: "",
  //     selectedShipping: "none",
  //     selectedDiscount: "none",
  //     disclaimerRed: false,
  //   };
  //   navigate("/parts_quote", {
  //     state: {
  //       customer: customer,
  //       selectedEquipment: selectedEquipment,
  //       quoteData: quoteData,
  //     },
  //   });
  // };

  return (
    <div
      style={{
        flexGrow: 1,
        border: "2px solid black",
        backgroundColor: "lightgray",
        padding: "4px",
      }}
    >
      <div className="row">
        <div className="quadRowInput" onClick={() => openCreateDispatch()}>
          <div style={reportButton}>
            <AddCircle
              sx={{
                background: lightTheme.palette.primary.contrastText,
                color: "green",
                fontSize: 60,
              }}
            />
            <Typography variant="subtitle1">Create New</Typography>
            <Typography variant="subtitle1">Dispatch</Typography>
          </div>
        </div>
        <div className="quadRowInput" onClick={() => openDispatchHistory()}>
          <div style={reportButton}>
            <Assignment
              sx={{
                background: lightTheme.palette.primary.contrastText,
                color: lightTheme.palette.primary.light,
                fontSize: 60,
              }}
            />
            <Typography variant="subtitle1">All Customer</Typography>
            <Typography variant="subtitle1">Dispatches</Typography>
          </div>
        </div>
        <div className="quadRowInput" onClick={() => openMaintenanceList()}>
          <div style={reportButton}>
            <BuildCircle
              sx={{
                background: lightTheme.palette.primary.contrastText,
                color: lightTheme.palette.primary.light,
                fontSize: 60,
              }}
            />
            <Typography variant="subtitle1">Maintenance</Typography>
            <Typography variant="subtitle1">Manager</Typography>
          </div>
        </div>
        <div className="quadRowInput" onClick={() => openWarrantyList()}>
          <div style={reportButton}>
            <BuildCircle
              sx={{
                background: lightTheme.palette.primary.contrastText,
                color: lightTheme.palette.primary.light,
                fontSize: 60,
              }}
            />
            <Typography variant="subtitle1">Warranty</Typography>
            <Typography variant="subtitle1">Manager</Typography>
          </div>
        </div>
      </div>

      {/* <Grid2 xs={3} onClick={() => openPartsQuoteList()}>
            <div style={reportButton}>
              <Assignment
                sx={{
                  background: lightTheme.palette.primary.contrastText,
                  color: lightTheme.palette.primary.light,
                  fontSize: 60,
                }}
              />
              <Typography variant="subtitle1">Customer</Typography>
              <Typography variant="subtitle1">Parts Quotes</Typography>
            </div>
          </Grid2> */}
    </div>
  );
};

export default ActiveButtons;
