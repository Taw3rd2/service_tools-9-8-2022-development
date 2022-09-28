import NoCustomerLoaded from "./views/NoCustomerLoaded.view";
import NoServiceCustomer from "./views/NoServiceCustomer.view";
import ServiceCustomer from "./views/ServiceCustomer.view";

const CustomerInformation = ({
  customer,
  openEditCustomerDetails,
  openEditCustomerBilling,
  openCustomerEquipmentList,
}) => {
  if (customer === null || customer.id === "" || customer.id === null) {
    return <NoCustomerLoaded />;
  } else if (customer.noService) {
    return (
      <NoServiceCustomer
        customer={customer}
        openEditCustomerDetails={openEditCustomerDetails}
        openEditCustomerBilling={openEditCustomerBilling}
        openCustomerEquipmentList={openCustomerEquipmentList}
      />
    );
  } else {
    return (
      <ServiceCustomer
        customer={customer}
        openEditCustomerDetails={openEditCustomerDetails}
        openEditCustomerBilling={openEditCustomerBilling}
        openCustomerEquipmentList={openCustomerEquipmentList}
      />
    );
  }
};

export default CustomerInformation;
