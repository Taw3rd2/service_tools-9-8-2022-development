import React, { useState } from "react";
import { useSyncedCollection } from "../../../firebase/firestore.utils";
import { setDateToZeroHours } from "../../../utilities/dateUtils";

const CreateDispatch = ({ customer, closeCreateDispatch }) => {
  const [dispatchData, setDispatchData] = useState({
    altPhoneName: customer.altPhoneName ? customer.altPhoneName : "",
    altphone: customer.altphone ? customer.altphone : "",
    city: customer.city
      ? `${customer.city}, ${customer.state} ${customer.zip}`
      : "",
    firstname: customer.firstname ? customer.firstname : "",
    issue: "",
    jobNumber: "",
    lastname: customer.lastname ? customer.lastname : "",
    leadSource: "PC",
    notes: "",
    payment: "C.O.D.",
    phone: customer.phone ? customer.phone : "",
    phoneName: customer.phoneName ? customer.phoneName : "",
    shorthand: "",
    start: setDateToZeroHours(new Date()),
    street: customer.street ? customer.street : "",
    takenBy: "",
    techHelper: "NONE",
    techLead: "",
    timeAlotted: "1.5",
    timeOfDay: "Anytime",
  });

  const handleDispatchDataChange = (prop) => (event) => {
    setDispatchData({ ...dispatchData, [prop]: event.target.value });
  };

  const handleDispatchDateChange = (prop, value) => {
    setDispatchData({ ...dispatchData, [prop]: value });
  };

  const handleIssueChange = (event) => {
    const { value } = event.target;
    // finish this
  };

  const dispatchers = useSyncedCollection("dispatchers");
  const technicians = useSyncedCollection("technicians");
  const workList = useSyncedCollection("workList");
  const payments = useSyncedCollection("payments");

  const submitDispatch = (event) => {
    event.preventDefault();
  };

  //   const localInvoiceId = invoiceId !== undefined ? invoiceId : "";
  //   const [jobNumber, setJobNumber] = useState(
  //     invoiceData
  //       ? `${invoiceData.invoiceNumberPrefix}${invoiceData.userCreatedjobNumber}`
  //       : ""
  //   );

  return <div>CreateDispatch</div>;
};

export default CreateDispatch;
