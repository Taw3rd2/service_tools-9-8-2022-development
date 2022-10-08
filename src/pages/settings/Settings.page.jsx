import { useState } from "react";

import DeleteItem from "./DeleteItem.modal";
import Dispatcher from "./dispatchers/Dispatcher.modal";
import DispatcherList from "./dispatchers/list/DispatcherList";
import Payment from "./payments/Payment.modal";
import PaymentList from "./payments/list/PaymentList";
import Technician from "./technicians/Technician.modal";
import TechnicianList from "./technicians/list/TechnicianList";
import Work from "./work_list/Work.modal";
import WorkList from "./work_list/list/WorkList";
import Toast from "../../components/basic_components/toast/Toast";

import "../../global_style/style.css";

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
    <div className="settings">
      <Toast />
      <div className="settingsTopRow">
        <div className="settingsTopLeft">
          <DispatcherList
            openDispatcherModal={openDispatcherModal}
            openDeleteItemModal={openDeleteItemModal}
          />
        </div>
        <div className="settingsTopMiddle">
          <PaymentList
            openDeleteItemModal={openDeleteItemModal}
            openPaymentModal={openPaymentModal}
          />
        </div>
        <div className="settingsTopRight">
          <WorkList
            openDeleteItemModal={openDeleteItemModal}
            openWorkModal={openWorkModal}
          />
        </div>
      </div>
      <div className="settingsBottomRow">
        <div className="settingsBottomLeft"></div>
        <div className="settingsBottomRight">
          <TechnicianList
            openDeleteItemModal={openDeleteItemModal}
            openTechnicianModal={openTechnicianModal}
          />
        </div>
      </div>
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
    </div>
  );
};

export default Settings;
