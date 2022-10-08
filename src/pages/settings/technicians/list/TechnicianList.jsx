import { useSyncedCollection } from "../../../../firebase/firestore.utils";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "../../../../global_style/style.css";
import { Add, DeleteForever, Edit } from "@mui/icons-material";

const TechnicianList = ({ openTechnicianDetails, openDeleteTechnician }) => {
  const technicians = useSyncedCollection("technicians");
  return (
    <div className="settingsCard">
      <div className="settingsCardTitle">Technicians</div>
      <TableContainer
        component={Paper}
        sx={{ overflow: "auto", maxHeight: 275 }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                sx={{ width: 25, fontSize: 20, fontWeight: "bold" }}
              >
                #
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 20, fontWeight: "bold" }}>
                Technician
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 20, fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: 20, fontWeight: "bold" }}
              >
                Color
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: 20, fontWeight: "bold" }}
              >
                Edit
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: 20, fontWeight: "Bold" }}
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {technicians
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((technician, index) => (
                <TableRow key={technician.id} sx={{ cursor: "pointer" }}>
                  <TableCell align="left" sx={{ fontSize: 20 }}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: 20 }}>
                    {technician.name}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: 20 }}>
                    {technician.email}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: 20,
                      backgroundColor: technician.color,
                      color: "white",
                    }}
                  >
                    {technician.color}
                  </TableCell>
                  <TableCell align="center">
                    <button
                      type="button"
                      className="standardButton"
                      style={{ margin: "0 auto" }}
                      onClick={() => openTechnicianDetails(technician)}
                    >
                      <Edit />
                      <span className="iconSeperation">Edit</span>
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    <button
                      type="button"
                      className="deleteButton"
                      style={{ margin: "0 auto" }}
                      onClick={() => openDeleteTechnician(technician)}
                    >
                      <DeleteForever />
                      <span className="iconSeperation">Delete</span>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="buttonBar">
        <button
          type="button"
          className="standardButton"
          onClick={() => openTechnicianDetails()}
        >
          <Add />
          <span className="iconSeperation">Add Technician</span>
        </button>
      </div>
    </div>
  );
};

export default TechnicianList;
