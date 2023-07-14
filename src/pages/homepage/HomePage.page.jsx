import React, { useEffect, useState, lazy, Suspense } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firestore.utils";

import CustomerInformation from "../../components/customer_information/CustomerInformation.component";
import CustomerSearch from "../../components/customer_search/CustomerSearch.component";
import NavigationButtons from "../../components/navigation_buttons/NavigationButtons.component";
import Spinner from "../../components/spinner/Spinner";
import Toast from "../../components/basic_components/toast/Toast";
import CustomerNotesList from "../../components/customer_notes/list/CustomerNotesList";

import "../../global_style/style.css";

//Base Modals
const ModalOne = lazy(() =>
  import("../../components/basic_components/modal_one/ModalOne")
);
const ModalTwo = lazy(() =>
  import("../../components/basic_components/modal_two/ModalTwo")
);
const ModalThree = lazy(() =>
  import("../../components/basic_components/modal_three/ModalThree")
);
const ModalFour = lazy(() =>
  import("../../components/basic_components/modal_four/ModalFour")
);
//Customer
const CreateCustomer = lazy(() =>
  import("../../components/customer_information/create/CreateCustomer")
);
const DeleteCustomer = lazy(() =>
  import("../../components/customer_information/delete/DeleteCustomer")
);
const EditCustomerDetails = lazy(() =>
  import("../../components/customer_information/details/EditCustomerDetails")
);
const EditCustomerBilling = lazy(() =>
  import("../../components/customer_information/details/EditCustomerBilling")
);
//Customer Notes
const CustomerNote = lazy(() =>
  import("../../components/customer_notes/create_and_details/CustomerNote")
);
const DeleteCustomerNote = lazy(() =>
  import("../../components/customer_notes/delete_note/DeleteCustomerNote")
);
//Customer Equipment
const CreateCustomerEquipment = lazy(() =>
  import("../../components/customer_equipment/create/CreateCustomerEquipment")
);
const DeleteCustomerEquipment = lazy(() =>
  import("../../components/customer_equipment/delete/DeleteCustomerEquipment")
);
const CustomerEquipmentList = lazy(() =>
  import("../../components/customer_equipment/list/CustomerEquipmentList")
);
const CustomerEquipmentDetails = lazy(() =>
  import("../../components/customer_equipment/details/CustomerEquipmentDetails")
);
const ImageViewer = lazy(() =>
  import("../../components/customer_equipment/gallery/image_viewer/ImageViewer")
);
const DeleteGalleryImage = lazy(() =>
  import(
    "../../components/customer_equipment/gallery/delete/DeleteGalleryImage"
  )
);
const EditSingleField = lazy(() =>
  import("../../components/customer_equipment/shared/EditSingleField")
);
//Dispatch
const CreateDispatch = lazy(() =>
  import("../../components/dispatches/create_dispatch/CreateDispatch")
);
const DispatchHistoryList = lazy(() =>
  import("../../components/dispatches/dispatch_history/DispatchList")
);
const CompletedDispatchViewer = lazy(() =>
  import(
    "../../components/dispatches/completed_dispatch/CompletedDispatchViewer"
  )
);
//Maintenance Content
const CreateMaintenance = lazy(() =>
  import("../../components/maintenance_manager/create/CreateMaintenanceContent")
);
const DeleteMaintenanceContent = lazy(() =>
  import("../../components/maintenance_manager/delete/DeleteMaintenanceContent")
);
const MaintenanceList = lazy(() =>
  import("../../components/maintenance_manager/list/MaintenanceCustomerList")
);
const MaintenanceDetails = lazy(() =>
  import(
    "../../components/maintenance_manager/details/MaintenanceDetailsContent"
  )
);
//Warranty Content
const CreateWarranty = lazy(() =>
  import("../../components/warranty_manager/create/CreateWarrantyContent")
);
const DeleteWarrantyContent = lazy(() =>
  import("../../components/warranty_manager/delete/DeleteWarrantyContent")
);
const WarrantyList = lazy(() =>
  import("../../components/warranty_manager/list/WarrantyList")
);
const WarrantyDetails = lazy(() =>
  import("../../components/warranty_manager/details/WarrantyDetailsContent")
);
//Parts Quote Content
const PartsQuoteList = lazy(() =>
  import("../../components/parts_quotes/list/PartsQuotesListContent")
);
const PartQuoteDetails = lazy(() =>
  import("../../components/parts_quotes/details/PartsQuoteDetailsContent")
);
const CreatePartsQuote = lazy(() =>
  import("../../components/parts_quotes/create/CreatePartsQuoteContent")
);
const DeletePartsQuote = lazy(() => {
  import("../../components/parts_quotes/delete/DeletePartsQuote");
});

const HomePage = () => {
  //CustomerSearch
  const [customer, setCustomer] = useState({ id: "" });
  const [client, setClient] = useState({ id: "" });
  const handleCustomerSelected = (customer) => {
    setCustomer(customer);
  };

  //keep customer data display current
  useEffect(() => {
    if (customer === null || customer.id === "") {
      setClient({ id: "" });
    } else {
      console.log("homepage useEffect");
      const subscribeToCustomer = onSnapshot(
        doc(db, "customers", customer.id),
        (doc) => {
          setClient({ ...doc.data(), id: doc.id });
        }
      );
      return () => subscribeToCustomer();
    }
  }, [customer]);

  //ModalOne
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

  //ModalTwo
  const [isModalTwoOpen, setModalTwoOpen] = useState(false);
  const [modalTwoSize, setModalTwoSize] = useState("45%");
  const [modalTwoTitle, setModalTwoTitle] = useState("Modal Two");
  const [modalTwoContent, setModalTwoContent] = useState(
    <div>Modal Two Content</div>
  );
  const openModalTwo = (size, title, content) => {
    setModalTwoSize(size);
    setModalTwoTitle(title);
    setModalTwoContent(content);
    setModalTwoOpen(true);
  };
  const closeModalTwo = () => {
    setModalTwoSize("45%");
    setModalTwoTitle("Modal Two");
    setModalTwoContent(<div>Modal Two Content</div>);
    setModalTwoOpen(false);
  };

  //ModalThree
  const [isModalThreeOpen, setModalThreeOpen] = useState(false);
  const [modalThreeSize, setModalThreeSize] = useState("45%");
  const [modalThreeTitle, setModalThreeTitle] = useState("Modal Three");
  const [modalThreeContent, setModalThreeContent] = useState(
    <div>Modal Three Content</div>
  );
  const openModalThree = (size, title, content) => {
    setModalThreeSize(size);
    setModalThreeTitle(title);
    setModalThreeContent(content);
    setModalThreeOpen(true);
  };
  const closeModalThree = () => {
    setModalThreeSize("45%");
    setModalThreeTitle("Modal Three");
    setModalThreeContent(<div>Modal Three Content</div>);
    setModalThreeOpen(false);
  };

  //ModalFour
  const [isModalFourOpen, setModalFourOpen] = useState(false);
  const [modalFourSize, setModalFourSize] = useState("45%");
  const [modalFourTitle, setModalFourTitle] = useState("Modal Four");
  const [modalFourContent, setModalFourContent] = useState(
    <div>Modal Four Content</div>
  );
  const openModalFour = (size, title, content) => {
    setModalFourSize(size);
    setModalFourTitle(title);
    setModalFourContent(content);
    setModalFourOpen(true);
  };
  const closeModalFour = () => {
    setModalFourSize("45%");
    setModalFourTitle("Modal Three");
    setModalFourContent(<div>Modal Three Content</div>);
    setModalFourOpen(false);
  };

  const openCreateCustomer = () => {
    openModalOne(
      "30%",
      "Create Customer",
      <CreateCustomer closeModalOne={closeModalOne} />
    );
  };

  const openEditCustomerDetails = () => {
    openModalOne(
      "30%",
      "Edit Customer Details",
      <EditCustomerDetails
        customer={client}
        openDeleteCustomer={openDeleteCustomer}
        closeModalOne={closeModalOne}
      />
    );
  };

  const openEditCustomerBilling = () => {
    openModalOne(
      "30%",
      "Edit Customer Billing",
      <EditCustomerBilling customer={client} closeModalOne={closeModalOne} />
    );
  };

  const openDeleteCustomer = () => {
    openModalTwo(
      "20%",
      "Delete Customer",
      <DeleteCustomer
        customer={client}
        handleCustomerSelected={handleCustomerSelected}
        closeDetails={closeModalOne}
        closeDelete={closeModalTwo}
      />
    );
  };

  const openCreateDispatch = () => {
    openModalOne(
      "25%",
      "Create Dispatch",
      <CreateDispatch customer={client} closeModalOne={closeModalOne} />
    );
  };

  const openCreateCustomerNote = () => {
    openModalOne(
      "30%",
      "Note",
      <CustomerNote customer={client} closeModalOne={closeModalOne} />
    );
  };

  const openDeleteCustomerNote = (note) => {
    openModalTwo(
      "20%",
      "Delete Note",
      <DeleteCustomerNote
        customer={client}
        selectedNote={note}
        closeDetails={closeModalOne}
        closeDelete={closeModalTwo}
      />
    );
  };

  const openCustomerNoteDetails = (note) => {
    openModalOne(
      "30%",
      "Note Details",
      <CustomerNote
        customer={client}
        closeModalOne={closeModalOne}
        selectedNote={note}
        openDeleteCustomerNote={openDeleteCustomerNote}
      />
    );
  };

  const openCreateCustomerEquipment = () => {
    openModalTwo(
      "30%",
      "Create Equipment",
      <CreateCustomerEquipment
        customer={client}
        closeModalTwo={closeModalTwo}
      />
    );
  };

  const openDeleteCustomerEquipment = (equipment) => {
    openModalThree(
      "25%",
      "Delete Equipment",
      <DeleteCustomerEquipment
        customer={client}
        selectedEquipment={equipment}
        closeDetails={closeModalTwo}
        closeDelete={closeModalThree}
      />
    );
  };

  const openCustomerEquipmentDetails = (equipment) => {
    openModalTwo(
      420,
      "Equipment Details",
      <CustomerEquipmentDetails
        customer={client}
        selectedEquipment={equipment}
        closeBasicSecondModal={closeModalTwo}
        openDeleteCustomerEquipment={openDeleteCustomerEquipment}
        openImageViewer={openImageViewer}
        openEditSingleField={openEditSingleField}
      />
    );
  };

  const openCustomerEquipmentList = () => {
    openModalOne(
      "55%",
      "Customer Equipment",
      <CustomerEquipmentList
        customer={client}
        openCustomerEquipmentDetails={openCustomerEquipmentDetails}
        openCreateCustomerEquipment={openCreateCustomerEquipment}
        closeModalOne={closeModalOne}
      />
    );
  };

  const openEditSingleField = (
    customerId,
    equipmentId,
    fieldName,
    fieldKey,
    fieldValue
  ) => {
    openModalThree(
      "15%",
      "",
      <EditSingleField
        customerId={customerId}
        equipmentId={equipmentId}
        fieldName={fieldName}
        fieldKey={fieldKey}
        fieldValue={fieldValue}
        closeEditSingleField={closeModalThree}
      />
    );
  };

  const openImageViewer = (img, selectedEquipment) => {
    openModalThree(
      "80%",
      ``,
      <ImageViewer
        src={img}
        selectedEquipment={selectedEquipment}
        closeImageViewer={closeModalThree}
        openDeleteGalleryImage={openDeleteGalleryImage}
      />
    );
  };

  const openDeleteGalleryImage = (img, equip) => {
    openModalFour(
      "30%",
      "Delete Gallery Image",
      <DeleteGalleryImage
        customer={customer}
        selectedEquipment={equip}
        selectedImage={img}
        closeImageViewer={closeModalThree}
        closeDelete={closeModalFour}
      />
    );
  };

  const openDispatchDetails = (dispatch) => {
    openModalTwo(
      "30%",
      "Dispatch Details",
      <CompletedDispatchViewer
        selectedDispatch={dispatch}
        closeModalOne={closeModalTwo}
      />
    );
  };

  const openDispatchHistory = () => {
    openModalOne(
      "60%",
      "Dispatch History",
      <DispatchHistoryList
        customer={client}
        openDispatchDetails={openDispatchDetails}
        closeModalOne={closeModalOne}
      />
    );
  };

  const openCreateWarranty = () => {
    openModalTwo(
      "45%",
      "Create New Warranty",
      <CreateWarranty customer={client} closeModalTwo={closeModalTwo} />
    );
  };

  const openWarrantyDetails = (warr) => {
    openModalTwo(
      "20%",
      `${warr.equipmentName} Warranty Details`,
      <WarrantyDetails
        customer={client}
        selectedWarranty={warr}
        openDeleteWarranty={openDeleteWarranty}
        closeModalTwo={closeModalTwo}
      />
    );
  };

  const openDeleteWarranty = (warr) => {
    openModalThree(
      "30%",
      "Delete Warranty",
      <DeleteWarrantyContent
        customer={client}
        selectedWarranty={warr}
        closeDetails={closeModalTwo}
        closeDelete={closeModalThree}
      />
    );
  };

  const openWarrantyList = () => {
    openModalOne(
      "35%",
      "Warranty",
      <WarrantyList
        customer={client}
        openWarrantyDetails={openWarrantyDetails}
        openCreateWarranty={openCreateWarranty}
        closeModalOne={closeModalOne}
      />
    );
  };

  const openCreateMaintenance = () => {
    openModalTwo(
      "45%",
      "Create New Maintenance",
      <CreateMaintenance customer={client} closeModalTwo={closeModalTwo} />
    );
  };

  const openMaintenanceDetails = (maint, equipment, equipmentIndex) => {
    openModalTwo(
      "25%",
      `${equipment.equipmentName} Maintenance Details`,
      <MaintenanceDetails
        closeModalTwo={closeModalTwo}
        customer={client}
        equipmentIndex={equipmentIndex}
        openDeleteMaintenance={openDeleteMaintenance}
        selectedMaintenance={maint}
        unit={equipment}
      />
    );
  };

  const openDeleteMaintenance = (maint, equipment) => {
    openModalThree(
      "30%",
      `Delete Maintenance for ${equipment.equipmentName}`,
      <DeleteMaintenanceContent
        customer={client}
        selectedMaintenance={maint}
        unit={equipment}
        closeDetailsModal={closeModalTwo}
        closeDeleteModal={closeModalThree}
      />
    );
  };

  const openMaintenanceList = () => {
    openModalOne(
      "80%",
      "Maintenance List",
      <MaintenanceList
        customer={client}
        openMaintenanceDetails={openMaintenanceDetails}
        closeModalOne={closeModalOne}
      />
    );
  };

  const [partsQuote, setPartsQuote] = useState({});
  const openPartQuoteDetails = (quote) => {
    setPartsQuote(quote);
    openModalTwo(
      "65%",
      "Part Quote Details",
      <PartQuoteDetails
        customer={client}
        partsQuote={quote}
        openDeletePartsQuote={openDeletePartsQuote}
        closeModalTwo={closeModalTwo}
      />
    );
  };

  const openDeletePartsQuote = () => {
    openModalThree(
      "35%",
      "Delete Parts Quote",
      <DeletePartsQuote
        customer={client}
        itemToDelete={partsQuote}
        closeModal={closeModalThree}
      />
    );
  };

  const openPartsQuoteList = () => {
    openModalOne(
      "45%",
      "Parts Quotes",
      <PartsQuoteList
        customer={client}
        openPartQuoteDetails={openPartQuoteDetails}
        openCreatePartsQuote={openCreatePartsQuote}
        closeBasicModal={closeModalOne}
      />
    );
  };

  const openCreatePartsQuote = () => {
    openModalTwo(
      "65%",
      "Create New Parts Quote",
      <CreatePartsQuote closeModalTwo={closeModalTwo} />
    );
  };

  return (
    <div className="homePage">
      <Toast />
      <div className="homepageTopRow">
        <div className="homepageTopLeft">
          <CustomerSearch
            handleCustomerSelected={handleCustomerSelected}
            openCreateCustomer={openCreateCustomer}
            openMaintenanceList={openMaintenanceList}
          />
        </div>
        <div className="homepageTopMiddle">
          <CustomerInformation
            customer={client}
            openEditCustomerDetails={openEditCustomerDetails}
            openEditCustomerBilling={openEditCustomerBilling}
            openCustomerEquipmentList={openCustomerEquipmentList}
          />
        </div>
        <div className="homepageTopRight">
          <NavigationButtons
            openCreateDispatch={openCreateDispatch}
            openCreateMaintenance={openCreateMaintenance}
            openDispatchHistory={openDispatchHistory}
            openWarrantyList={openWarrantyList}
            openPartsQuoteList={openPartsQuoteList}
            customer={client}
          />
        </div>
      </div>
      <div className="homepageBottomRow">
        <div className="homepageBottomLeft"></div>
        <div className="homepageBottomRight">
          <CustomerNotesList
            customer={client}
            openCreateCustomerNote={openCreateCustomerNote}
            openCustomerNoteDetails={openCustomerNoteDetails}
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
      {isModalTwoOpen && (
        <Suspense fallback={<Spinner />}>
          <ModalTwo
            modalTwoSize={modalTwoSize}
            modalTwoTitle={modalTwoTitle}
            modalTwoContent={modalTwoContent}
            closeModalTwo={closeModalTwo}
          />
        </Suspense>
      )}
      {isModalThreeOpen && (
        <Suspense fallback={<Spinner />}>
          <ModalThree
            modalThreeSize={modalThreeSize}
            modalThreeTitle={modalThreeTitle}
            modalThreeContent={modalThreeContent}
            closeModalThree={closeModalThree}
          />
        </Suspense>
      )}
      {isModalFourOpen && (
        <Suspense fallback={<Spinner />}>
          <ModalFour
            modalFourSize={modalFourSize}
            modalFourTitle={modalFourTitle}
            modalFourContent={modalFourContent}
            closeModalFour={closeModalFour}
          />
        </Suspense>
      )}
    </div>
  );
};

export default HomePage;
