import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";
import { AddCircle, Assignment, BuildCircle } from "@mui/icons-material"; //Assignment, AddCircle } from "@mui/icons-material";

const reportButton = {
  border: "1px solid teal",
  textAlign: "center",
  cursor: "pointer",
  padding: "8px",
};

const ActiveButtons = ({
  customer,
  openCreateDispatch,
  openCreateMaintenance,
  openDispatchHistory,
  openWarrantyList,
  openPartsQuoteList,
  openPartsQuoteListModal,
}) => {
  const navigate = useNavigate();

  const routeToPartsQuoteCreator = () => {
    const selectedEquipment = {
      equipmentName: "",
      equipmentBrand: "",
      equipmentModel: "",
      equipmentSerial: "",
    };
    const quoteData = {
      id: "",
      jobNumber: "",
      quoteDate: new Date(),
      partsList: [],
      laborHours: 1,
      laborRate: 9900,
      addMaintenance: false,
      addRediagnostic: false,
      regularShippingTime: "5-7 days",
      quickShippingTime: "1-3 days",
      regularShippingRate: 25.0,
      quickShippingRate: 75.0,
      shippingNotes: "",
      selectedShipping: "none",
      selectedDiscount: "none",
      disclaimerRed: false,
    };
    navigate("/parts_quote", {
      state: {
        customer: customer,
        selectedEquipment: selectedEquipment,
        quoteData: quoteData,
      },
    });
  };

  return (
    <div
      style={{
        flexGrow: 1,
        border: "2px solid teal",
        padding: "4px",
      }}
    >
      <div className="row">
        <div className="quadRowInput" onClick={() => openCreateDispatch()}>
          <div style={reportButton}>
            <AddCircle
              sx={{
                color: "teal",
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
                color: "teal",
                fontSize: 60,
              }}
            />
            <Typography variant="subtitle1">Customer</Typography>
            <Typography variant="subtitle1">Dispatches</Typography>
          </div>
        </div>

        <div className="quadRowInput" onClick={() => openCreateMaintenance()}>
          <div style={reportButton}>
            <BuildCircle
              sx={{
                color: "teal",
                fontSize: 60,
              }}
            />
            <Typography variant="subtitle1">Add</Typography>
            <Typography variant="subtitle1">Maintenance</Typography>
          </div>
        </div>

        <div className="quadRowInput" onClick={() => openWarrantyList()}>
          <div style={reportButton}>
            <BuildCircle
              sx={{
                color: "teal",
                fontSize: 60,
              }}
            />
            <Typography variant="subtitle1">Warranty</Typography>
            <Typography variant="subtitle1">Manager</Typography>
          </div>
        </div>
      </div>

      <div className="row">
        <div
          className="quadRowInput"
          onClick={() => routeToPartsQuoteCreator()}
        >
          <div style={reportButton}>
            <AddCircle
              sx={{
                color: "teal",
                fontSize: 60,
              }}
            />
            <Typography variant="subtitle1">Blank</Typography>
            <Typography variant="subtitle1">Parts Quote</Typography>
          </div>
        </div>
        <div className="quadRowInput">
          {" "}
          {/*//onClick={() => openPartsQuoteList()}> */}
          <div style={reportButton}>
            <Assignment
              style={{ fontSize: 60, color: "grey" }}
              // sx={{
              //   background: lightTheme.palette.primary.contrastText,
              //   color: lightTheme.palette.primary.light,
              //   fontSize: 60,
              // }}
            />
            <Typography variant="subtitle1">Parts</Typography>
            <Typography variant="subtitle1">Quotes</Typography>
          </div>
        </div>

        <div className="quadRowInput">
          <div style={reportButton}>
            <Assignment style={{ fontSize: 60, color: "grey" }} />
            <Typography variant="subtitle1">Equipment</Typography>
            <Typography variant="subtitle1">Quotes</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveButtons;
