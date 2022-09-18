import { addHours, getUnixTime } from "date-fns";
import { collection, doc, getFirestore } from "firebase/firestore";
import { createNamedDocument } from "../../firebase/firestore.utils";
import { setDateToZeroHours } from "../../utilities/dateUtils";

export const submitDispatchToFirestore = (
  customer,
  dispatch,
  closeModalOne
) => {
  const db = getFirestore();
  const docForId = doc(collection(db, "events"));
  const techLeadGeneratedId = docForId.id;
  if (dispatch.techHelper === "NONE") {
    const newDispatch = {
      id: techLeadGeneratedId,
      techHelperId: "",
      firstname: dispatch.firstname,
      lastname: dispatch.lastname,
      street: dispatch.street,
      city: dispatch.city,
      leadSource: dispatch.leadSource,
      phoneName: dispatch.phoneName,
      phone: dispatch.phone,
      altPhoneName: dispatch.altPhoneName,
      altphone: dispatch.altphone,
      timeAlotted: dispatch.timeAlotted,
      issue: dispatch.issue,
      payment: dispatch.payment,
      techLead: dispatch.techLead,
      techHelper: dispatch.techHelper,
      start: dispatch.start,
      end: addHours(setDateToZeroHours(dispatch.start), 1),
      timeOfDay: dispatch.timeOfDay,
      shorthand: dispatch.shorthand,
      notes: dispatch.notes,
      title: `${dispatch.timeAlotted} /${dispatch.lastname} /${dispatch.shorthand} /${dispatch.timeOfDay}`,
      takenBy: dispatch.takenBy,
      dateCreated: new Date(),
      dateScheduled: dispatch.start,
      dateModified: new Date(),
      scheduledDate: getUnixTime(setDateToZeroHours(dispatch.start)),
      status: "scheduled",
      jobNumber: dispatch.jobNumber,
      customerId: customer.id,
      invoiceId: "",
    };

    createNamedDocument(doc(db, "events", techLeadGeneratedId), newDispatch)
      .then(() => closeModalOne())
      .catch((error) => console.log("error: ", error));
  } else {
    const docForhelperId = doc(collection(db, "events"));
    const techHelperGeneratedId = docForhelperId.id;

    const newLeadDispatch = {
      id: techLeadGeneratedId,
      techHelperId: techHelperGeneratedId,
      firstname: dispatch.firstname,
      lastname: dispatch.lastname,
      street: dispatch.street,
      city: dispatch.city,
      leadSource: dispatch.leadSource,
      phoneName: dispatch.phoneName,
      phone: dispatch.phone,
      altPhoneName: dispatch.altPhoneName,
      altphone: dispatch.altphone,
      timeAlotted: dispatch.timeAlotted,
      issue: dispatch.issue,
      payment: dispatch.payment,
      techLead: dispatch.techLead,
      techHelper: dispatch.techHelper,
      start: dispatch.start,
      end: addHours(setDateToZeroHours(dispatch.start), 1),
      timeOfDay: dispatch.timeOfDay,
      shorthand: dispatch.shorthand,
      notes: dispatch.notes,
      title: `${dispatch.timeAlotted} /${dispatch.lastname} /${dispatch.shorthand} /${dispatch.timeOfDay}`,
      takenBy: dispatch.takenBy,
      dateCreated: new Date(),
      dateScheduled: dispatch.start,
      dateModified: new Date(),
      scheduledDate: getUnixTime(setDateToZeroHours(dispatch.start)),
      status: "scheduled",
      jobNumber: dispatch.jobNumber,
      customerId: customer.id,
      invoiceId: "",
    };
    const newhelperDispatch = {
      id: techHelperGeneratedId,
      techHelperId: techLeadGeneratedId,
      firstname: dispatch.firstname,
      lastname: dispatch.lastname,
      street: dispatch.street,
      city: dispatch.city,
      leadSource: dispatch.leadSource,
      phoneName: dispatch.phoneName,
      phone: dispatch.phone,
      altPhoneName: dispatch.altPhoneName,
      altphone: dispatch.altphone,
      timeAlotted: dispatch.timeAlotted,
      issue: dispatch.issue,
      payment: dispatch.payment,
      techLead: dispatch.techHelper,
      techHelper: dispatch.techLead,
      start: dispatch.start,
      end: addHours(setDateToZeroHours(dispatch.start), 1),
      timeOfDay: dispatch.timeOfDay,
      shorthand: dispatch.shorthand,
      notes: dispatch.notes,
      title: `${dispatch.timeAlotted} /${dispatch.lastname} /${dispatch.shorthand} /${dispatch.timeOfDay}`,
      takenBy: dispatch.takenBy,
      dateCreated: new Date(),
      dateScheduled: dispatch.start,
      dateModified: new Date(),
      scheduledDate: getUnixTime(setDateToZeroHours(dispatch.start)),
      status: "scheduled",
      jobNumber: dispatch.jobNumber,
      customerId: customer.id,
      invoiceId: "",
    };

    createNamedDocument(doc(db, "events", techLeadGeneratedId), newLeadDispatch)
      .then(() =>
        createNamedDocument(
          doc(db, "events", techHelperGeneratedId),
          newhelperDispatch
        )
      )
      .then(() => closeModalOne())
      .catch((error) => console.log("error: ", error));
  }
};
