import { lazy, Suspense, useState } from "react";

import DispatcherList from "./dispatchers/list/DispatcherList";
import PaymentList from "./payments/list/PaymentList";
import TechnicianList from "./technicians/list/TechnicianList";
import WorkList from "./work_list/list/WorkList";
import Toast from "../../components/basic_components/toast/Toast";

import "../../global_style/style.css";
import Spinner from "../../components/spinner/Spinner";
import DeleteTechnician from "./technicians/delete/DeleteTechnician";

const ModalOne = lazy(() =>
  import("../../components/basic_components/modal_one/ModalOne")
);
const DeleteDispatcher = lazy(() =>
  import("./dispatchers/delete/DeleteDispatcher")
);
const DispatcherDetails = lazy(() =>
  import("./dispatchers/create_details/DispatcherDetails")
);
const DeletePayment = lazy(() => import("./payments/delete/DeletePayment"));
const PaymentDetails = lazy(() =>
  import("./payments/create_details/PaymentDetails")
);
const WorkListItemDetails = lazy(() =>
  import("./work_list/create_details/WorkListItemDetails")
);
const DeleteWorkListItem = lazy(() =>
  import("./work_list/delete/DeleteWorkListItem")
);
const TechnicianDetails = lazy(() =>
  import("./technicians/create_details/TechnicianDetails")
);

const Settings = () => {
  //Modal One
  const [isModalOneOpen, setModalOneOpen] = useState(false);
  const [modalOneSize, setModalOneSize] = useState("45%");
  const [modalOneTitle, setModalOneTitle] = useState("Modal One");
  const [modalOneContent, setModalOneContent] = useState(
    <div>Modal One Content</div>
  );
  const openModalOne = (size, title, content) => {
    setModalOneSize(size);
    setModalOneTitle(title);
    setModalOneContent(content);
    setModalOneOpen(true);
  };
  const closeModalOne = () => {
    setModalOneSize("45%");
    setModalOneTitle("Modal One");
    setModalOneContent(<div>Modal One Content</div>);
    setModalOneOpen(false);
  };

  const openDeleteDispatcher = (dispatcher) => {
    openModalOne(
      "20%",
      "Delete Dispatcher",
      <DeleteDispatcher dispatcher={dispatcher} closeModalOne={closeModalOne} />
    );
  };

  const openDispatcherDetails = (dispatcher) => {
    openModalOne(
      "10%",
      <>{dispatcher !== undefined ? "Dispatcher Details" : "New Dispatcher"}</>,
      <DispatcherDetails
        dispatcher={dispatcher}
        closeModalOne={closeModalOne}
      />
    );
  };

  const openDeletePayment = (payment) => {
    openModalOne(
      "20%",
      "Delete Payment",
      <DeletePayment payment={payment} closeModalOne={closeModalOne} />
    );
  };

  const openPaymentDetails = (payment) => {
    openModalOne(
      "10%",
      <>{payment !== undefined ? "Payment Details" : "New Payment"}</>,
      <PaymentDetails payment={payment} closeModalOne={closeModalOne} />
    );
  };

  const openWorkListItemDetails = (item) => {
    openModalOne(
      "20%",
      <>
        {item !== undefined ? "Work List Item Details" : "New Worklist Item"}
      </>,
      <WorkListItemDetails workListItem={item} closeModalOne={closeModalOne} />
    );
  };

  const openDeleteWorklistItem = (item) => {
    openModalOne(
      "20%",
      "Delete Work List Item",
      <DeleteWorkListItem workListItem={item} closeModalOne={closeModalOne} />
    );
  };

  const openTechnicianDetails = (tech) => {
    openModalOne(
      "30%",
      <>{tech !== undefined ? "Technician Details" : "New Technician"}</>,
      <TechnicianDetails technician={tech} closeModalOne={closeModalOne} />
    );
  };

  const openDeleteTechnician = (tech) => {
    openModalOne(
      "20%",
      "Delete Technician",
      <DeleteTechnician technician={tech} closeModalOne={closeModalOne} />
    );
  };

  return (
    <div className="settings">
      <Toast />
      <div className="settingsTopRow">
        <div className="settingsTopLeft">
          <DispatcherList
            openDispatcherDetails={openDispatcherDetails}
            openDeleteDispatcher={openDeleteDispatcher}
          />
        </div>
        <div className="settingsTopMiddle">
          <PaymentList
            openDeletePayment={openDeletePayment}
            openPaymentDetails={openPaymentDetails}
          />
        </div>
        <div className="settingsTopRight">
          <WorkList
            openDeleteWorkListItem={openDeleteWorklistItem}
            openWorkListItemDetails={openWorkListItemDetails}
          />
        </div>
      </div>
      <div className="settingsBottomRow">
        <div className="settingsBottomLeft"></div>
        <div className="settingsBottomRight">
          <TechnicianList
            openDeleteTechnician={openDeleteTechnician}
            openTechnicianDetails={openTechnicianDetails}
          />
        </div>
      </div>
      {isModalOneOpen && (
        <Suspense fallback={<Spinner />}>
          <ModalOne
            modalOneSize={modalOneSize}
            modalOneTitle={modalOneTitle}
            modalOneContent={modalOneContent}
            closeModalOne={closeModalOne}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Settings;
