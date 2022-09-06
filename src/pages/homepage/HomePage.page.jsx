import React, { useState, lazy, Suspense } from "react";

import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme/Theme";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import CustomerInformation from "../../components/customer_information/CustomerInformation.component";
import CustomerSearch from "../../components/customer_search/CustomerSearch.component";
import TaskList from "../../components/task_list/TaskList.component";
import NavigationButtons from "../../components/navigation_buttons/NavigationButtons.component";
import Spinner from "../../components/spinner/Spinner";
import CustomerNotesList from "../../components/customer_notes/list/CustomerNotesList";

//Customer
const AddCustomerModal = lazy(() =>
  import("../../components/customer_search/AddCustomer.modal")
);
const EditCustomerInfoModal = lazy(() =>
  import(
    "../../components/customer_information/modals/customer/EditCustomerInfo.modal"
  )
);
const EditBillingModal = lazy(() =>
  import(
    "../../components/customer_information/modals/customer/EditCustomerBilling.modal"
  )
);
const DeleteCustomerModal = lazy(() =>
  import(
    "../../components/customer_information/modals/customer/DeleteCustomer.modal"
  )
);

//Dispatch
const CreateDispatchModal = lazy(() =>
  import(
    "../../components/navigation_buttons/create_new_dispatch/CreateDispatch.modal"
  )
);

//new
//Modals
const ModalOne = lazy(() =>
  import("../../components/basic_components/modal_one/ModalOne")
);
const BasicContentModal = lazy(() =>
  import("../../components/basic_components/BasicModal.modal")
);
const BasicSecondContentModal = lazy(() =>
  import("../../components/basic_components/BasicSecondModal.modal")
);
const BasicThirdContentModal = lazy(() =>
  import("../../components/basic_components/BasicThirdModal.modal")
);
const BasicDeleteContent = lazy(() =>
  import("../../components/basic_components/BasicDeleteContent")
);
//Customer Notes
const CustomerNote = lazy(() =>
  import("../../components/customer_notes/create/CustomerNote")
);
const DeleteCustomerNote = lazy(() =>
  import("../../components/customer_notes/delete/DeleteCustomerNote")
);
//Customer Equipment
const CreateCustomerEquipment = lazy(() =>
  import("../../components/customer_equipment/create/CreateCustomerEquipment")
);
const DeleteCustomerEquipment = lazy(() =>
  import("../../components/customer_equipment/delete/DeleteCustomerEquipment")
);
const CustomerEquipmentList = lazy(() =>
  import(
    "../../components/customer_equipment/list/CustomerEquipmentListContent"
  )
);
const CustomerEquipmentDetails = lazy(() =>
  import("../../components/customer_equipment/details/CustomerEquipmentDetails")
);
const ImageViewer = lazy(() =>
  import("../../components/customer_equipment/shared/ImageViewer")
);
const EditSingleField = lazy(() =>
  import("../../components/customer_equipment/shared/EditSingleField")
);
//Dispatch History
const DispatchHistoryList = lazy(() =>
  import("../../components/dispatches/dispatch_history/DispatchHistoryList")
);
//Maintenance Content
const CreateMaintenance = lazy(() =>
  import("../../components/maintenance_manager/create/CreateMaintenanceContent")
);
const DeleteMaintenanceContent = lazy(() =>
  import("../../components/maintenance_manager/delete/DeleteMaintenanceContent")
);
const MaintenanceList = lazy(() =>
  import("../../components/maintenance_manager/list/MaintenanceListContent")
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
  import("../../components/warranty_manager/list/WarrantyListContent")
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

const HomePage = () => {
  //CustomerSearch
  const [customer, setCustomer] = useState({ id: "" });
  const handleCustomerSelected = (customer) => {
    setCustomer(customer);
  };

  const [currentCustomer, setCurrentCustomer] = useState({});
  const getCurrentCustomer = (currentCustomerData) => {
    setCurrentCustomer(currentCustomerData);
  };

  //Add Customer Modal
  const [isAddCustomerModalOpen, setAddCustomerModalOpen] = useState(false);
  const openAddCustomerModal = () => {
    setAddCustomerModalOpen(true);
  };
  const closeAddCustomerModal = () => {
    setAddCustomerModalOpen(false);
  };

  //Edit Customer Modal
  const [isEditCustomerModalOpen, setEditCustomerModalOpen] = useState(false);
  const openEditCustomerModal = () => {
    setEditCustomerModalOpen(true);
  };
  const closeEditCustomerModal = () => {
    setEditCustomerModalOpen(false);
  };

  //Edit Customer Billing Modal
  const [isEditBillingModalOpen, setEditBillingModalOpen] = useState(false);
  const openEditBillingModal = () => {
    setEditBillingModalOpen(true);
  };
  const closeEditBillingModal = () => {
    setEditBillingModalOpen(false);
  };

  //Delete Customer Confirmation Modal
  const [isDeleteCustomerModalOpen, setDeleteCustomerModalOpen] =
    useState(false);
  const openDeleteCustomerModal = () => {
    setDeleteCustomerModalOpen(true);
  };
  const closeDeleteCustomerModal = () => {
    setDeleteCustomerModalOpen(false);
  };

  //Create Disptch
  const [isCreateDispatchModalOpen, setCreateDispatchmodalOpen] =
    useState(false);
  const openCreateDispatchModal = () => {
    setCreateDispatchmodalOpen(true);
  };
  const closeCreateDispatchModal = () => {
    setCreateDispatchmodalOpen(false);
  };

  //NEW
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

  //Basic Modal
  const [isBasicModalOpen, setBasicModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState("45%");
  const [modalAriaLabel, setModalAriaLabel] = useState("default-label");
  const [modalTitle, setModalTitle] = useState("Basic Modal");
  const [modalContent, setModalContent] = useState(<div>Default Content</div>);
  const openBasicModal = (size, label, title, content) => {
    setModalSize(size);
    setModalAriaLabel(label);
    setModalTitle(title);
    setModalContent(content);
    setBasicModalOpen(true);
  };
  const closeBasicModal = () => {
    setModalSize("45%");
    setModalAriaLabel("default-label");
    setModalTitle("Basic Modal");
    setModalContent(<div>Default Content</div>);
    setBasicModalOpen(false);
  };

  //Basic Second Modal
  const [isBasicSecondModalOpen, setBasicSecondModalOpen] = useState(false);
  const [secondModalSize, setSecondModalSize] = useState("45%");
  const [secondModalAriaLabel, setSecondModalAriaLabel] =
    useState("default-label");
  const [secondModalTitle, setSecondModalTitle] = useState("Basic Modal");
  const [secondModalContent, setSecondModalContent] = useState(
    <div>Default Content</div>
  );
  const openBasicSecondModal = (size, label, title, content) => {
    setSecondModalSize(size);
    setSecondModalAriaLabel(label);
    setSecondModalTitle(title);
    setSecondModalContent(content);
    setBasicSecondModalOpen(true);
  };
  const closeBasicSecondModal = () => {
    setSecondModalSize("45%");
    setSecondModalAriaLabel("default-label");
    setSecondModalTitle("Basic Modal");
    setSecondModalContent(<div>Default Content</div>);
    setBasicSecondModalOpen(false);
  };

  //Basic third Modal
  const [isBasicThirdModalOpen, setBasicThirdModalOpen] = useState(false);
  const [thirdModalSize, setThirdModalSize] = useState("45%");
  const [thirdModalAriaLabel, setThirdModalAriaLabel] =
    useState("default-label");
  const [thirdModalTitle, setThirdModalTitle] = useState("Basic Modal");
  const [thirdModalContent, setThirdModalContent] = useState(
    <div>Default Content</div>
  );
  const openBasicThirdModal = (size, label, title, content) => {
    setThirdModalSize(size);
    setThirdModalAriaLabel(label);
    setThirdModalTitle(title);
    setThirdModalContent(content);
    setBasicThirdModalOpen(true);
  };
  const closeBasicThirdModal = () => {
    setThirdModalSize("45%");
    setThirdModalAriaLabel("default-label");
    setThirdModalTitle("Basic Modal");
    setThirdModalContent(<div>Default Content</div>);
    setBasicThirdModalOpen(false);
  };

  //Customer Notes
  const openCreateCustomerNote = () => {
    openBasicModal(
      "30%",
      "create-customer-note",
      "Note",
      <CustomerNote customer={customer} closeCustomerNote={closeBasicModal} />
    );
  };

  const openDeleteCustomerNote = (note) => {
    openBasicSecondModal(
      "30%",
      "delete-customer-note",
      "Delete Note",
      <DeleteCustomerNote
        customer={customer}
        selectedNote={note}
        closeDetails={closeBasicModal}
        closeDelete={closeBasicSecondModal}
      />
    );
  };

  const openCustomerNoteDetails = (note) => {
    openBasicModal(
      "30%",
      "customer-note-details",
      "Note Details",
      <CustomerNote
        customer={customer}
        closeCustomerNote={closeBasicModal}
        selectedNote={note}
        openDeleteCustomerNote={openDeleteCustomerNote}
      />
    );
  };

  //Customer Equipment
  const openCreateCustomerEquipment = () => {
    openBasicSecondModal(
      "30%",
      "create-customer-equipment",
      "Create Equipment",
      <CreateCustomerEquipment
        customer={customer}
        closeBasicSecondModal={closeBasicSecondModal}
      />
    );
  };

  const openDeleteCustomerEquipment = (equipment) => {
    openBasicThirdModal(
      "25%",
      "delete-customer-equipment",
      "Delete Equipment",
      <DeleteCustomerEquipment
        customer={customer}
        selectedEquipment={equipment}
        closeDetails={closeBasicSecondModal}
        closeDelete={closeBasicThirdModal}
      />
    );
  };

  const openCustomerEquipmentDetails = (equipment) => {
    openBasicSecondModal(
      385,
      "customer-equipment-details",
      "Equipment Details",
      <CustomerEquipmentDetails
        customer={customer}
        selectedEquipment={equipment}
        closeBasicSecondModal={closeBasicSecondModal}
        openDeleteCustomerEquipment={openDeleteCustomerEquipment}
        openImageViewer={openImageViewer}
        openEditSingleField={openEditSingleField}
      />
    );
  };

  const openCustomerEquipmentList = () => {
    openBasicModal(
      "70%",
      "customer-equipment-list",
      "Customer Equipment",
      <CustomerEquipmentList
        customer={customer}
        openCustomerEquipmentDetails={openCustomerEquipmentDetails}
        openCreateCustomerEquipment={openCreateCustomerEquipment}
        closeBasicModal={closeBasicModal}
      />
    );
  };

  //EditSingleField
  const openEditSingleField = (
    customerId,
    equipmentId,
    fieldName,
    fieldKey,
    fieldValue
  ) => {
    openBasicThirdModal(
      "15%",
      "edit-single-field",
      "",
      <EditSingleField
        customerId={customerId}
        equipmentId={equipmentId}
        fieldName={fieldName}
        fieldKey={fieldKey}
        fieldValue={fieldValue}
        closeEditSingleField={closeBasicThirdModal}
      />
    );
  };

  //Image Viewer
  const openImageViewer = (img) => {
    openBasicThirdModal(
      "80%",
      "enlarged-image",
      ``,
      <ImageViewer src={img} closeImageViewer={closeBasicThirdModal} />
    );
  };

  const openDispatchDetails = (dispatch) => {
    openBasicSecondModal("", "dispatch-details", <div />);
  };

  const openDispatchHistory = () => {
    openBasicModal(
      "60%",
      "disptch-history-list",
      "Dispatch History",
      <DispatchHistoryList
        customer={customer}
        openDispatchDetails={openDispatchDetails}
        closeDispatchHistory={closeBasicModal}
      />
    );
  };

  const openCreateWarranty = () => {
    openBasicSecondModal(
      "45%",
      "create-warranty",
      "Create New Warranty",
      <CreateWarranty
        customer={customer}
        closeBasicSecondModal={closeBasicSecondModal}
      />
    );
  };

  const openWarrantyDetails = (warr) => {
    openBasicSecondModal(
      "20%",
      "warranty-details",
      `${warr.equipmentName} Warranty Details`,
      <WarrantyDetails
        customer={customer}
        selectedWarranty={warr}
        openDeleteWarranty={openDeleteWarranty}
        closeBasicSecondModal={closeBasicSecondModal}
      />
    );
  };

  const openDeleteWarranty = (warr) => {
    openBasicThirdModal(
      "30%",
      "delete-warranty",
      "Delete Warranty",
      <DeleteWarrantyContent
        customer={customer}
        selectedWarranty={warr}
        closeDetails={closeBasicSecondModal}
        closeDelete={closeBasicThirdModal}
      />
    );
  };

  // (1)
  const openWarrantyList = () => {
    openModalOne(
      "55%",
      "Warranty",
      <WarrantyList
        customer={customer}
        openWarrantyDetails={openWarrantyDetails}
        openCreateWarranty={openCreateWarranty}
        closeModalOne={closeModalOne}
      />
    );
  };

  // (2)
  const openCreateMaintenance = () => {
    openBasicSecondModal(
      "45%",
      "create-maintenance",
      "Create New Maintenance",
      <CreateMaintenance
        customer={customer}
        closeBasicSecondModal={closeBasicSecondModal}
      />
    );
  };

  // (2)
  const openMaintenanceDetails = (maint) => {
    openBasicSecondModal(
      "20%",
      "maintenance-details",
      `${maint.equipmentName} Maintenance Details`,
      <MaintenanceDetails
        customer={customer}
        selectedMaintenance={maint}
        openDeleteMaintenance={openDeleteMaintenance}
        closeBasicSecondModal={closeBasicSecondModal}
      />
    );
  };

  //Delete Maintenance (3)
  const openDeleteMaintenance = (selectedMaintenance) => {
    openBasicThirdModal(
      "30%",
      "delete-maintenance",
      `Delete Maintenance for ${selectedMaintenance.equipmentName}`,
      <DeleteMaintenanceContent
        customer={customer}
        selectedMaintenance={selectedMaintenance}
        closeDetailsModal={closeBasicSecondModal}
        closeDeleteModal={closeBasicThirdModal}
      />
    );
  };

  //Maintenance List (1)
  const openMaintenanceList = () => {
    openModalOne(
      "70%",
      "Maintenance List",
      <MaintenanceList
        customer={customer}
        openMaintenanceDetails={openMaintenanceDetails}
        openCreateMaintenance={openCreateMaintenance}
        closeModalOne={closeModalOne}
      />
    );
  };

  //parts quote details (2)
  const [partsQuote, setPartsQuote] = useState({});
  const openPartQuoteDetails = (quote) => {
    setPartsQuote(quote);
    openBasicSecondModal(
      "65%",
      "parts-quote-details",
      "Part Quote Details",
      <PartQuoteDetails
        customer={customer}
        partsQuote={quote}
        openDeletePartsQuote={openDeletePartsQuote}
        closeBasicSecondModal={closeBasicSecondModal}
      />
    );
  };

  //delete parts quotes (3)
  const openDeletePartsQuote = () => {
    openBasicThirdModal(
      "35%",
      "parts-quote-delete",
      "Delete Parts Quote",
      <BasicDeleteContent
        customer={customer}
        itemToDelete={partsQuote}
        closeModal={closeBasicThirdModal}
      />
    );
  };

  //parts quote list (1)
  const openPartsQuoteList = () => {
    openModalOne(
      "45%",
      "Parts Quotes",
      <PartsQuoteList
        customer={customer}
        openPartQuoteDetails={openPartQuoteDetails}
        openCreatePartsQuote={openCreatePartsQuote}
        closeBasicModal={closeModalOne}
      />
    );
  };

  //create parts Quotes (2)
  const openCreatePartsQuote = () => {
    openBasicSecondModal(
      "65%",
      "create-parts-quote",
      "Create New Parts Quote",
      <CreatePartsQuote closeBasicSecondModal={closeBasicSecondModal} />
    );
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Grid2 container spacing={2}>
        <Grid2 xs={4} sx={{ marginTop: "4px" }}>
          <CustomerSearch
            handleCustomerSelected={handleCustomerSelected}
            openAddCustomerModal={openAddCustomerModal}
          />
        </Grid2>
        <Grid2 xs={4} sx={{ marginTop: "4px" }}>
          <CustomerInformation
            customer={customer}
            openEditCustomerModal={openEditCustomerModal}
            openCustomerEquipmentList={openCustomerEquipmentList}
            openEditBillingModal={openEditBillingModal}
            getCurrentCustomer={getCurrentCustomer}
          />
        </Grid2>
        <Grid2 xs={4} sx={{ marginTop: "4px" }}>
          <NavigationButtons
            openCreateDispatchModal={openCreateDispatchModal}
            openDispatchHistory={openDispatchHistory}
            openMaintenanceList={openMaintenanceList}
            openWarrantyList={openWarrantyList}
            openPartsQuoteList={openPartsQuoteList}
            customer={customer}
          />
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2}>
        <Grid2 xs={6} sx={{ marginTop: "4px" }}>
          <TaskList />
        </Grid2>
        <Grid2 xs={6} sx={{ marginTop: "4px" }}>
          <CustomerNotesList
            customer={customer}
            openCreateCustomerNote={openCreateCustomerNote}
            openCustomerNoteDetails={openCustomerNoteDetails}
          />
        </Grid2>
      </Grid2>
      {isAddCustomerModalOpen && (
        <Suspense fallback={<Spinner />}>
          <AddCustomerModal
            isAddCustomerModalOpen={isAddCustomerModalOpen}
            closeAddCustomerModal={closeAddCustomerModal}
          />
        </Suspense>
      )}
      {isEditCustomerModalOpen && (
        <Suspense fallback={<Spinner />}>
          <EditCustomerInfoModal
            customer={currentCustomer}
            isEditCustomerModalOpen={isEditCustomerModalOpen}
            closeEditCustomerModal={closeEditCustomerModal}
            openDeleteCustomerModal={openDeleteCustomerModal}
          />
        </Suspense>
      )}
      {isEditBillingModalOpen && (
        <Suspense fallback={<Spinner />}>
          <EditBillingModal
            customer={currentCustomer}
            isEditBillingModalOpen={isEditBillingModalOpen}
            closeEditBillingModal={closeEditBillingModal}
          />
        </Suspense>
      )}
      {isDeleteCustomerModalOpen && (
        <Suspense fallback={<Spinner />}>
          <DeleteCustomerModal
            isDeleteCustomerModalOpen={isDeleteCustomerModalOpen}
            closeEditCustomerModal={closeEditCustomerModal}
            closeDeleteCustomerModal={closeDeleteCustomerModal}
            setCustomer={setCustomer}
            customer={customer}
          />
        </Suspense>
      )}
      {isCreateDispatchModalOpen && (
        <Suspense fallback={<Spinner />}>
          <CreateDispatchModal
            isCreateDispatchModalOpen={isCreateDispatchModalOpen}
            closeCreateDispatchModal={closeCreateDispatchModal}
            customer={customer}
          />
        </Suspense>
      )}
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
      {isBasicModalOpen && (
        <Suspense fallback={<Spinner />}>
          <BasicContentModal
            isBasicModalOpen={isBasicModalOpen}
            closeBasicModal={closeBasicModal}
            modalSize={modalSize}
            modalAriaLabel={modalAriaLabel}
            modalTitle={modalTitle}
            modalContent={modalContent}
          />
        </Suspense>
      )}
      {isBasicSecondModalOpen && (
        <Suspense fallback={<Spinner />}>
          <BasicSecondContentModal
            isBasicSecondModalOpen={isBasicSecondModalOpen}
            closeBasicSecondModal={closeBasicSecondModal}
            secondModalSize={secondModalSize}
            secondModalAriaLabel={secondModalAriaLabel}
            secondModalTitle={secondModalTitle}
            secondModalContent={secondModalContent}
          />
        </Suspense>
      )}
      {isBasicThirdModalOpen && (
        <Suspense fallback={<Spinner />}>
          <BasicThirdContentModal
            isBasicThirdModalOpen={isBasicThirdModalOpen}
            closeBasicThirdModal={closeBasicThirdModal}
            thirdModalSize={thirdModalSize}
            thirdModalAriaLabel={thirdModalAriaLabel}
            thirdModalTitle={thirdModalTitle}
            thirdModalContent={thirdModalContent}
          />
        </Suspense>
      )}
    </ThemeProvider>
  );
};

export default HomePage;
