import React, { useState } from "react";

import DeleteItem from "./DeleteItem.modal";
import Dispatcher from "./dispatchers/Dispatcher.modal";
import DispatcherList from "./dispatchers/DispatcherList";
import Payment from "./payments/Payment.modal";
import PaymentList from "./payments/PaymentList";
import Technician from "./technicians/Technician.modal";
import TechnicianList from "./technicians/TechnicianList";
import Work from "./work_list/Work.modal";
import WorkList from "./work_list/WorkList";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const Settings = () => {
  //Delete a settings list item
  const [isDeleteItemModalOpen, setDeleteitemModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({});
  const [parentCollection, setParentCollection] = useState("");
  const openDeleteItemModal = (item, parent) => {
    setItemToDelete(item);
    setParentCollection(parent);
    setDeleteitemModalOpen(true);
  };
  const closeDeleteItemModal = () => {
    setDeleteitemModalOpen(false);
  };

  //Dispatchers
  const [isDispatcherModalOpen, setDispatcherModalOpen] = useState(false);
  const [dispatcher, setDispatcher] = useState({});
  const openDispatcherModal = (disp) => {
    setDispatcher(disp);
    setDispatcherModalOpen(true);
  };
  const closeDispatcherModal = () => {
    setDispatcherModalOpen(false);
  };

  //Payments
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [payment, setPayment] = useState({});
  const openPaymentModal = (item) => {
    setPayment(item);
    setPaymentModalOpen(true);
  };
  const closePaymentModal = () => {
    setPaymentModalOpen(false);
  };

  //Work list
  const [isWorkModalOpen, setWorkModalOpen] = useState(false);
  const [work, setWork] = useState({});
  const openWorkModal = (item) => {
    setWork(item);
    setWorkModalOpen(true);
  };
  const closeWorkModal = () => {
    setWorkModalOpen(false);
  };

  //Technicians
  const [isTechnicianModalOpen, setTechnicianModalOpen] = useState(false);
  const [technician, setTechnician] = useState({});
  const openTechnicianModal = (tech) => {
    setTechnician(tech);
    setTechnicianModalOpen(true);
  };
  const closeTechnicianModal = () => {
    setTechnicianModalOpen(false);
  };

  return (
    <>
      <Grid2 container spacing={1}>
        <Grid2 xs={4}>
          <DispatcherList
            openDispatcherModal={openDispatcherModal}
            openDeleteItemModal={openDeleteItemModal}
          />
        </Grid2>
        <Grid2 xs={4}>
          <PaymentList
            openDeleteItemModal={openDeleteItemModal}
            openPaymentModal={openPaymentModal}
          />
        </Grid2>
        <Grid2 xs={4}>
          <WorkList
            openDeleteItemModal={openDeleteItemModal}
            openWorkModal={openWorkModal}
          />
        </Grid2>
        <Grid2 xs={8}>
          <TechnicianList
            openDeleteItemModal={openDeleteItemModal}
            openTechnicianModal={openTechnicianModal}
          />
        </Grid2>
        <Grid2 xs={4}></Grid2>
      </Grid2>
      {isDispatcherModalOpen && (
        <Dispatcher
          isDispatcherModalOpen={isDispatcherModalOpen}
          closeDispatcherModal={closeDispatcherModal}
          dispatcher={dispatcher}
        />
      )}
      {isDeleteItemModalOpen && (
        <DeleteItem
          isDeleteItemModalOpen={isDeleteItemModalOpen}
          closeDeleteItemModal={closeDeleteItemModal}
          parentCollection={parentCollection}
          item={itemToDelete}
        />
      )}
      {isPaymentModalOpen && (
        <Payment
          isPaymentModalOpen={isPaymentModalOpen}
          closePaymentModal={closePaymentModal}
          payment={payment}
        />
      )}
      {isWorkModalOpen && (
        <Work
          isWorkModalOpen={isWorkModalOpen}
          closeWorkModal={closeWorkModal}
          work={work}
        />
      )}
      {isTechnicianModalOpen && (
        <Technician
          isTechnicianModalOpen={isTechnicianModalOpen}
          closeTechnicianModal={closeTechnicianModal}
          technician={technician}
        />
      )}
    </>
  );
};

export default Settings;
