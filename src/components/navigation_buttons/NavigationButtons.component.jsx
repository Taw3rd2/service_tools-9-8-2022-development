import React from "react";

import ActiveButtons from "./ActiveButtons.component";
import InactiveButtons from "./InactiveButtons.component";

const NavigationButtons = ({
  customer,
  openCreateDispatchModal,
  openDispatchHistory,
  openPartsQuoteList,
  openEquipmentQuotesModal,
  openMaintenanceList,
  openWarrantyList,
}) => {
  if (customer === null || customer.id === "") {
    return <InactiveButtons />;
  } else {
    return (
      <ActiveButtons
        customer={customer}
        openCreateDispatchModal={openCreateDispatchModal}
        openDispatchHistory={openDispatchHistory}
        openPartsQuoteList={openPartsQuoteList}
        openEquipmentQuotesModal={openEquipmentQuotesModal}
        openWarrantyList={openWarrantyList}
        openMaintenanceList={openMaintenanceList}
      />
    );
  }
};

export default NavigationButtons;
