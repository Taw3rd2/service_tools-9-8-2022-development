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

const WorkList = ({ openWorkListItemDetails, openDeleteWorkListItem }) => {
  const workList = useSyncedCollection("workList");

  return (
    <div className="settingsCard">
      <div className="settingsCardTitle">Work List</div>
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
                Work Item
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: 20, fontWeight: "bold" }}
              >
                Shorthand
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: 20, fontWeight: "bold" }}
              >
                Edit
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: 20, fontWeight: "bold" }}
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workList
              .sort((a, b) => a.item.localeCompare(b.item))
              .map((option, index) => (
                <TableRow key={option.id} sx={{ cursor: "pointer" }}>
                  <TableCell align="left" sx={{ fontSize: 20 }}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: 20 }}>
                    {option.item}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 20 }}>
                    {option.shorthand}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 20 }}>
                    <button
                      type="button"
                      className="standardButton"
                      style={{ margin: "0 auto" }}
                      onClick={() => openWorkListItemDetails(option)}
                    >
                      <Edit />
                      <span className="iconSeperation">Edit</span>
                    </button>
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: 20 }}>
                    <button
                      type="button"
                      className="deleteButton"
                      style={{ margin: "0 auto" }}
                      onClick={() => openDeleteWorkListItem(option)}
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
          onClick={() => openWorkListItemDetails()}
        >
          <Add />
          <span className="iconSeperation">Add Work Item</span>
        </button>
      </div>
    </div>
  );
};

export default WorkList;
