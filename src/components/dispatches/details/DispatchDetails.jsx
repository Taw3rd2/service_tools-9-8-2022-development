import { useContext, useState } from "react";

import { collection, doc, getFirestore } from "firebase/firestore";
import {
  createNamedDocument,
  deleteDocument,
  updateDocument,
  useSyncedCollection,
} from "../../../firebase/firestore.utils";
import { ToastContext } from "../../../context/toastContext";
import {
  getFormattedExactTime,
  setDateToZeroHours,
} from "../../../utilities/dateUtils";
import {
  compareEvents,
  compareHelper,
  compareLead,
  finalUpdate,
} from "../../../utilities/scheduleUtils";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "../../../global_style/style.css";
import { ArrowUpward, Close, DeleteForever } from "@mui/icons-material";

const DispatchDetails = ({
  selectedDispatch,
  closeModalOne,
  openJobCompleted,
  openSameTech,
  openDeleteDispatch,
}) => {
  const { dispatch } = useContext(ToastContext);

  const dispatchers = useSyncedCollection("dispatchers");
  const technicians = useSyncedCollection("technicians");
  const workList = useSyncedCollection("workList");
  const payments = useSyncedCollection("payments");

  const [dispatchData, setDispatchData] = useState({
    altPhoneName: selectedDispatch.extendedProps.altPhoneName
      ? selectedDispatch.extendedProps.altPhoneName
      : "",
    altphone: selectedDispatch.extendedProps.altphone
      ? selectedDispatch.extendedProps.altphone
      : "",
    city: selectedDispatch.extendedProps.city
      ? selectedDispatch.extendedProps.city
      : "",
    firstname: selectedDispatch.extendedProps.firstname
      ? selectedDispatch.extendedProps.firstname
      : "",
    issue: selectedDispatch.extendedProps.issue
      ? selectedDispatch.extendedProps.issue
      : "",
    jobNumber: selectedDispatch.extendedProps.jobNumber
      ? selectedDispatch.extendedProps.jobNumber
      : "",
    lastname: selectedDispatch.extendedProps.lastname
      ? selectedDispatch.extendedProps.lastname
      : "",
    leadSource: selectedDispatch.extendedProps.leadSource
      ? selectedDispatch.extendedProps.leadSource
      : "PC",
    notes: selectedDispatch.extendedProps.notes
      ? selectedDispatch.extendedProps.notes
      : "",
    payment: selectedDispatch.extendedProps.payment
      ? selectedDispatch.extendedProps.payment
      : "C.O.D.",
    phone: selectedDispatch.extendedProps.phone
      ? selectedDispatch.extendedProps.phone
      : "",
    phoneName: selectedDispatch.extendedProps.phoneName
      ? selectedDispatch.extendedProps.phoneName
      : "",
    shorthand: selectedDispatch.extendedProps.shorthand
      ? selectedDispatch.extendedProps.shorthand
      : "",
    start: selectedDispatch.start
      ? selectedDispatch.start
      : setDateToZeroHours(new Date()),
    street: selectedDispatch.extendedProps.street
      ? selectedDispatch.extendedProps.street
      : "",
    takenBy: selectedDispatch.extendedProps.takenBy
      ? selectedDispatch.extendedProps.takenBy
      : "",
    techHelper: selectedDispatch.extendedProps.techHelper
      ? selectedDispatch.extendedProps.techHelper
      : "NONE",
    techLead: selectedDispatch.extendedProps.techLead
      ? selectedDispatch.extendedProps.techLead
      : "",
    timeAlotted: selectedDispatch.extendedProps.timeAlotted
      ? selectedDispatch.extendedProps.timeAlotted
      : "1.5",
    timeOfDay: selectedDispatch.extendedProps.timeOfDay
      ? selectedDispatch.extendedProps.timeOfDay
      : "Anytime",
  });

  const handleDispatchDataChange = (prop) => (event) => {
    setDispatchData({ ...dispatchData, [prop]: event.target.value });
  };

  const handleDispatchDateChange = (prop) => (value) => {
    setDispatchData({ ...dispatchData, [prop]: value });
  };

  const handleIssueChange = (event) => {
    const option = workList.filter((i) => event.target.value === i.item);

    setDispatchData({
      ...dispatchData,
      issue: event.target.value,
      shorthand: option[0].shorthand,
    });
  };

  const updateDispatch = (event) => {
    event.preventDefault();

    //validation
    //The office should not be able to update a dispatch that is done, or needs parts.
    if (
      selectedDispatch.extendedProps.status === "done" ||
      selectedDispatch.extendedProps.status === "parts"
    ) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          id: getFormattedExactTime(new Date()),
          type: "INFO",
          title: "Update Dispatch",
          message: "The job was already done...",
        },
      });
      openJobCompleted();
      return;
      //The office should not be able to select the same tech for lead and helper
    } else if (dispatchData.techLead === dispatchData.techHelper) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          id: getFormattedExactTime(new Date()),
          type: "INFO",
          title: "Update Dispatch",
          message: "Lead, and Helper are the same...",
        },
      });
      openSameTech();
      return;
    } else {
      const db = getFirestore();
      const updatedDispatch = {
        ...dispatchData,
        customerId: selectedDispatch.extendedProps.customerId,
        dateCreated: selectedDispatch.extendedProps.dateCreated,
        dateModified: new Date(),
        dateScheduled: dispatchData.start,
        end: selectedDispatch.end,
        id: selectedDispatch.id,
        scheduledDate: selectedDispatch.extendedProps.scheduledDate, //nope
        status: selectedDispatch.extendedProps.status,
        techHelperId: selectedDispatch.extendedProps.techHelperId,
        title: selectedDispatch.title,
      };
      //compare old dispatch with changes to see if techs changed
      const noTechChange = compareEvents(
        selectedDispatch.extendedProps,
        updatedDispatch
      );
      if (noTechChange === true) {
        console.log("no tech change");
        if (
          selectedDispatch.extendedProps.techHelperId === "" ||
          selectedDispatch.extendedProps.techHelperId === undefined
        ) {
          console.log("there is no extra dispatch to change");
          // update the original dispatch only
          const eventToUpdate = finalUpdate(updatedDispatch);
          updateDocument(doc(db, "events", eventToUpdate.id), eventToUpdate)
            .then(() => {
              dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                  id: getFormattedExactTime(new Date()),
                  type: "SUCCESS",
                  title: "Update Dispatch",
                  message: "Updated the dispatch in the cloud",
                },
              });
              closeModalOne();
            })
            .catch((error) => {
              dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                  id: getFormattedExactTime(new Date()),
                  type: "ERROR",
                  title: "Update Dispatch",
                  message: "There was an error updating",
                },
              });
              console.log("Firebase error: ", error);
            });
        } else {
          console.log("there is a extra dispatch to update");
          //update the first dispatch
          const firstEventToUpdate = finalUpdate(updatedDispatch);
          updateDocument(
            doc(db, "events", firstEventToUpdate.id),
            firstEventToUpdate
          ).then(() => console.log("first event updated"));
          //update the second dispatch
          let newEvent = { ...updatedDispatch };
          newEvent.id = updatedDispatch.techHelperId;
          newEvent.techLead = updatedDispatch.techHelper;
          newEvent.techHelper = updatedDispatch.techLead;
          newEvent.techHelperId = updatedDispatch.id;
          const secondEventToUpdate = finalUpdate(newEvent);
          updateDocument(
            doc(db, "events", secondEventToUpdate.id),
            secondEventToUpdate
          )
            .then(() => {
              dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                  id: getFormattedExactTime(new Date()),
                  type: "SUCCESS",
                  title: "Update Dispatch",
                  message: "Updated the dispatch in the cloud",
                },
              });
              closeModalOne();
            })
            .catch((error) => {
              dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                  id: getFormattedExactTime(new Date()),
                  type: "ERROR",
                  title: "Update Dispatch",
                  message: "There was an error updating",
                },
              });
              console.log("Firebase error: ", error);
            });
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: getFormattedExactTime(new Date()),
              type: "SUCCESS",
              title: "Update Dispatch",
              message: "Updated the dispatch in the cloud",
            },
          });
          closeModalOne();
        }
      } else {
        console.log("techs have changed");
        //decide if techLead or techHelper has changed (boolean)
        const helperHasChanged = compareHelper(
          selectedDispatch.extendedProps,
          updatedDispatch
        );
        const leadHasChanged = compareLead(
          selectedDispatch.extendedProps,
          updatedDispatch
        );

        if (helperHasChanged === false) {
          console.log("helper has not changed");
        } else {
          console.log("helper has changed");
          //what has the techHelper changed to?
          if (updatedDispatch.techHelper === "NONE") {
            console.log("techHelper === NONE");
            if (
              selectedDispatch.extendedProps.techHelperId === "" ||
              selectedDispatch.extendedProps.techHelperId === undefined
            ) {
              //TODO: is the original dispatch getting updated here? or maybe its not possible to have this situation?
              console.log(
                "techHelper changed to NONE but there is no second dispatch to delete"
              );
            } else {
              console.log(
                "techHelper changed to NONE and there is a second dispatch to delete"
              );
              const eventToDelete = {
                id: selectedDispatch.extendedProps.techHelperId,
              };
              deleteDocument(doc(db, "events", eventToDelete.id)).then(() => {
                dispatch({
                  type: "ADD_NOTIFICATION",
                  payload: {
                    id: getFormattedExactTime(new Date()),
                    type: "INFO",
                    title: "Submitted",
                    message: "Deleted Tech Helper Dispatch",
                  },
                });
                console.log("event deleted");
              });
              const eventWithNoTechHelperId = { ...updatedDispatch };
              eventWithNoTechHelperId.techHelperId = "";
              const changedEvent = finalUpdate(eventWithNoTechHelperId);
              updateDocument(doc(db, "events", changedEvent.id), changedEvent)
                .then(() => {
                  dispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                      id: getFormattedExactTime(new Date()),
                      type: "SUCCESS",
                      title: "Updated Dispatch",
                      message: "Dispatch updated in the cloud",
                    },
                  });
                  closeModalOne();
                })
                .catch((error) => {
                  dispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                      id: getFormattedExactTime(new Date()),
                      type: "ERROR",
                      title: "Updated Dispatch",
                      message: "There was an error updating",
                    },
                  });
                  console.log("firebase error: ", error);
                });
            }
          } else {
            if (
              selectedDispatch.extendedProps.techHelperId === "" ||
              selectedDispatch.extendedProps.techHelperId === undefined
            ) {
              console.log(
                "techHelper changed to another tech but there is no second dispatch to change"
              );
              let newEvent = { ...updatedDispatch };
              const docForId = doc(collection(db, "events"));
              const generatedId = docForId.id;
              newEvent.techHelper = updatedDispatch.techLead;
              newEvent.techLead = updatedDispatch.techHelper;
              newEvent.id = generatedId;
              newEvent.techHelperId = selectedDispatch.id;
              const eventToUpdate = finalUpdate(newEvent);

              //this should be named doc, and named the name we supply it
              createNamedDocument(doc(db, "events", newEvent.id), eventToUpdate)
                .then(() => {
                  dispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                      id: getFormattedExactTime(new Date()),
                      type: "SUCCESS",
                      title: "Update Dispatch",
                      message: "Added second dispatch for helper",
                    },
                  });
                  console.log("added event");
                })
                .catch((error) => {
                  dispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                      id: getFormattedExactTime(new Date()),
                      type: "ERROR",
                      title: "Update Dispatch",
                      message: "There was a error updating",
                    },
                  });
                  console.log("firebase error: ", error);
                });

              const originalEvent = { ...updatedDispatch };
              originalEvent.techHelperId = generatedId;
              const originalEventToUpdate = finalUpdate(originalEvent);
              updateDocument(
                doc(db, "events", originalEventToUpdate.id),
                originalEventToUpdate
              )
                .then(() => {
                  dispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                      id: getFormattedExactTime(new Date()),
                      type: "SUCCESS",
                      title: "Update Dispatch",
                      message: "Updated the dispatch in the cloud",
                    },
                  });
                  closeModalOne();
                })
                .catch((error) => {
                  dispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                      id: getFormattedExactTime(new Date()),
                      type: "ERROR",
                      title: "Update Dispatch",
                      message: "There was a error updating",
                    },
                  });
                  console.log("Firestore error: ", error);
                });
            } else {
              console.log(
                "techHelper changed to another tech and there is a second dispatch",
                selectedDispatch.extendedProps.techHelperId
              );
              const firstEventToUpdate = finalUpdate(updatedDispatch);
              updateDocument(
                doc(db, "events", firstEventToUpdate.id),
                firstEventToUpdate
              )
                .then(() => {
                  dispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                      id: getFormattedExactTime(new Date()),
                      type: "SUCCESS",
                      title: "Update Dispatch",
                      message: "Updated the dispatch in the cloud",
                    },
                  });
                  console.log("updated first event");
                })
                .catch((error) => {
                  dispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                      id: getFormattedExactTime(new Date()),
                      type: "ERROR",
                      title: "Update Dispatch",
                      message: "There was a error updating",
                    },
                  });
                  console.log("Firebase error: ", error);
                });

              let newEvent = { ...updatedDispatch };
              console.log("newEvent: ", newEvent);
              newEvent.id = updatedDispatch.techHelperId;
              newEvent.techLead = updatedDispatch.techHelper;
              newEvent.techHelper = updatedDispatch.techLead;
              newEvent.techHelperId = updatedDispatch.id;
              const secondEventToUpdate = finalUpdate(newEvent);
              updateDocument(
                doc(db, "events", secondEventToUpdate.id),
                secondEventToUpdate
              )
                .then(() => {
                  dispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                      id: getFormattedExactTime(new Date()),
                      type: "SUCCESS",
                      title: "Update Dispatch",
                      message: "Updated the dispatch in the cloud",
                    },
                  });
                  closeModalOne();
                })
                .catch((error) => {
                  dispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                      id: getFormattedExactTime(new Date()),
                      type: "ERROR",
                      title: "Update Dispatch",
                      message: "There was a error updating",
                    },
                  });
                  console.log("Firebase error: ", error);
                });
            }
          }
        }

        if (leadHasChanged === false) {
          console.log("lead has not changed");
        } else {
          console.log("lead has changed");
          const eventToUpdate = finalUpdate(updatedDispatch);
          updateDocument(doc(db, "events", eventToUpdate.id), eventToUpdate)
            .then(() => {
              dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                  id: getFormattedExactTime(new Date()),
                  type: "SUCCESS",
                  title: "Update Dispatch",
                  message: "Updated the dispatch in the cloud",
                },
              });
              closeModalOne();
            })
            .catch((error) => {
              dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                  id: getFormattedExactTime(new Date()),
                  type: "ERROR",
                  title: "Update Dispatch",
                  message: "There was a error updating",
                },
              });
              console.log("Firebase error: ", error);
            });
          if (
            selectedDispatch.extendedProps.techHelperId === "" ||
            selectedDispatch.extendedProps.techHelperId === undefined
          ) {
            console.log(
              "techLead has changed but there is no techHelper event to update"
            );
          } else {
            console.log(
              "techLead has changed and there is a techHelper event to change"
            );

            let newEvent = { ...updatedDispatch };
            newEvent.id = updatedDispatch.techHelperId;
            newEvent.techLead = updatedDispatch.techHelper;
            newEvent.techHelper = updatedDispatch.techLead;
            newEvent.techHelperId = updatedDispatch.id;
            const eventToUpdate = finalUpdate(newEvent);
            console.log("eventToUpdate: ", eventToUpdate);
            updateDocument(doc(db, "events", eventToUpdate.id), eventToUpdate)
              .then(() => {
                dispatch({
                  type: "ADD_NOTIFICATION",
                  payload: {
                    id: getFormattedExactTime(new Date()),
                    type: "SUCCESS",
                    title: "Update Dispatch",
                    message: "Updated the dispatch in the cloud",
                  },
                });
                closeModalOne();
              })
              .catch((error) => {
                dispatch({
                  type: "ADD_NOTIFICATION",
                  payload: {
                    id: getFormattedExactTime(new Date()),
                    type: "ERROR",
                    title: "Update Dispatch",
                    message: "There was a error updating",
                  },
                });
                console.log("Firebase error: ", error);
              });
          }
        }
      }
    }
  };

  return (
    <form onSubmit={updateDispatch} autoComplete="new-password">
      <div className="row" style={{ marginTop: "16px" }}>
        <div className="tripleRowInput">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Scheduled Date"
              fullWidth
              value={dispatchData.start}
              onChange={handleDispatchDateChange("start")}
              color="primary"
              inputProps={{ tabIndex: "1" }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="tripleRowInput">
          <TextField
            label="Lead Source"
            value={dispatchData.leadSource}
            fullWidth
            required
            onChange={handleDispatchDataChange("leadSource")}
            inputProps={{ tabIndex: "2" }}
          />
        </div>
        <div className="tripleRowInput">
          {dispatchers.length > 0 && (
            <FormControl fullWidth>
              <InputLabel id="select-operator">Dispatcher</InputLabel>
              <Select
                labelId="select-operator"
                id="operator"
                value={dispatchData.takenBy}
                label="Dispatcher"
                onChange={handleDispatchDataChange("takenBy")}
                inputProps={{ tabIndex: "3" }}
              >
                {dispatchers
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((dispatcher, index) => (
                    <MenuItem key={index} value={dispatcher.name}>
                      {dispatcher.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </div>
      </div>
      <div className="row">
        <div className="doubleRowInput">
          <TextField
            label="First Name"
            fullWidth
            value={dispatchData.firstname}
            onChange={handleDispatchDataChange("firstname")}
            inputProps={{ tabIndex: "4" }}
          />
        </div>
        <div className="doubleRowInput">
          <TextField
            label="Last Name"
            fullWidth
            required
            value={dispatchData.lastname}
            onChange={handleDispatchDataChange("lastname")}
            inputProps={{ tabIndex: "5" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="doubleRowInput">
          <TextField
            label="Job Address"
            fullWidth
            required
            value={dispatchData.street}
            onChange={handleDispatchDataChange("street")}
            inputProps={{ tabIndex: "6" }}
          />
        </div>
        <div className="doubleRowInput">
          <TextField
            label="City, State, Zip Code"
            fullWidth
            value={dispatchData.city}
            onChange={handleDispatchDataChange("city")}
            inputProps={{ tabIndex: "7" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="doubleRowInput">
          <TextField
            label="Primary Contact"
            fullWidth
            value={dispatchData.phoneName}
            onChange={handleDispatchDataChange("phoneName")}
            inputProps={{ tabIndex: "8" }}
          />
        </div>
        <div className="doubleRowInput">
          <TextField
            label="Alternate Contact"
            fullWidth
            value={dispatchData.altPhoneName}
            onChange={handleDispatchDataChange("altPhoneName")}
            inputProps={{ tabIndex: "10" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="doubleRowInput">
          <TextField
            label="Primary Phone Number"
            fullWidth
            value={dispatchData.phone}
            onChange={handleDispatchDataChange("phone")}
            inputProps={{ tabIndex: "9" }}
          />
        </div>
        <div className="doubleRowInput">
          <TextField
            label="Alternate Phone Number"
            fullWidth
            value={dispatchData.altphone}
            onChange={handleDispatchDataChange("altphone")}
            inputProps={{ tabIndex: "11" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="doubleRowInput">
          {workList.length > 0 && (
            <FormControl fullWidth>
              <InputLabel id="select-work-ordered">Work Ordered</InputLabel>
              <Select
                labelId="select-work-ordered"
                id="work-ordered"
                value={dispatchData.issue}
                label="Work ordered"
                onChange={handleIssueChange}
                inputProps={{ tabIndex: "12" }}
              >
                {workList
                  .sort((a, b) => a.item.localeCompare(b.item))
                  .map((issue) => (
                    <MenuItem key={issue.id} value={issue.item}>
                      {issue.item}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </div>
        <div className="doubleRowInput">
          <TextField
            label="Slotted Time"
            fullWidth
            value={dispatchData.timeAlotted}
            onChange={handleDispatchDataChange("timeAlotted")}
            inputProps={{ tabIndex: "13" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="tripleRowInput">
          {technicians.length > 0 && (
            <FormControl fullWidth>
              <InputLabel id="select-tech-lead">Tech Lead</InputLabel>
              <Select
                labelId="select-tech-lead"
                id="tech-lead"
                value={dispatchData.techLead}
                label="Tech Lead"
                onChange={handleDispatchDataChange("techLead")}
                inputProps={{ tabIndex: "14" }}
              >
                {technicians
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((technician) => (
                    <MenuItem key={technician.id} value={technician.name}>
                      {technician.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </div>
        <div className="tripleRowInput">
          {technicians.length > 0 && (
            <FormControl fullWidth>
              <InputLabel id="select-tech-helper">Tech Helper</InputLabel>
              <Select
                labelId="select-tech-helper"
                id="tech-helper"
                value={dispatchData.techHelper}
                label="Tech helper"
                onChange={handleDispatchDataChange("techHelper")}
                inputProps={{ tabIndex: "15" }}
              >
                <MenuItem value={"NONE"}>None</MenuItem>
                {technicians
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((technician) => (
                    <MenuItem key={technician.id} value={technician.name}>
                      {technician.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </div>
        <div className="tripleRowInput">
          {payments.length > 0 && (
            <FormControl fullWidth>
              <InputLabel id="select-payment">Payment</InputLabel>
              <Select
                labelId="select-payment"
                id="payment"
                value={dispatchData.payment}
                label="Payment"
                onChange={handleDispatchDataChange("payment")}
                inputProps={{ tabIndex: "16" }}
              >
                {payments
                  .sort((a, b) => a.item.localeCompare(b.item))
                  .map((payment) => (
                    <MenuItem key={payment.id} value={payment.item}>
                      {payment.item}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </div>
      </div>
      <div className="row">
        <div className="singleRowInput">
          <TextField
            label="Notes"
            multiline
            fullWidth
            rows={5}
            variant="outlined"
            value={dispatchData.notes}
            onChange={handleDispatchDataChange("notes")}
            inputProps={{ tabIndex: "17" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="tripleRowInput">
          <FormControl fullWidth>
            <InputLabel id="time-of-day-select">Time Of Day</InputLabel>
            <Select
              labelId="time-of-day-select"
              id="time-of-day"
              value={dispatchData.timeOfDay}
              label="Time Of Day"
              onChange={handleDispatchDataChange("timeOfDay")}
              inputProps={{ tabIndex: "18" }}
            >
              <MenuItem value="AM">AM</MenuItem>
              <MenuItem value="Anytime">Anytime</MenuItem>
              <MenuItem value="First Call">First Call</MenuItem>
              <MenuItem value="Last Call">Last Call</MenuItem>
              <MenuItem value="overtime">Overtime</MenuItem>
              <MenuItem value="PM">PM</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="tripleRowInput">
          <TextField
            label="Job Number"
            fullWidth
            required
            value={dispatchData.jobNumber}
            onChange={handleDispatchDataChange("jobNumber")}
            inputProps={{ tabIndex: "19" }}
          />
        </div>
        <div className="tripleRowInput">
          <div />
        </div>
      </div>
      <div className="buttonBar">
        <button
          type="button"
          className="deleteButton"
          onClick={() => openDeleteDispatch(selectedDispatch)}
        >
          <DeleteForever />
          <span className="iconSeperation">Delete This Dispatch</span>
        </button>
        <button type="submit" className="standardButton" tabIndex={20}>
          <ArrowUpward />
          <span className="iconSeperation">Update The Dispatch</span>
        </button>
        <button
          type="button"
          className="standardButton"
          tabIndex={21}
          onClick={() => closeModalOne()}
        >
          <Close />
          <span className="iconSeperation">Close</span>
        </button>
      </div>
    </form>
  );
};

export default DispatchDetails;
