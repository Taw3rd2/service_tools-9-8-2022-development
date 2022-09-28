import BusinessContactField from "../fields/BusinessContactField";
import ContactField from "../fields/ContactField";
import EmailField from "../fields/EmailField";
import MainField from "../fields/MainField";
import Spinner from "../../spinner/Spinner";
import { Edit, Hvac } from "@mui/icons-material";

const ServiceCustomer = ({
  customer,
  openEditCustomerDetails,
  openEditCustomerBilling,
  openCustomerEquipmentList,
}) => {
  if (customer.lastname === "") {
    return <Spinner />;
  } else {
    return (
      <div
        style={{
          flexGrow: 1,
          border: "1px solid black",
          backgroundColor: "lightgray",
        }}
      >
        <div className="noServiceTitle">
          {customer.billingiscommercial && (
            <div className="noServiceTitle">Commercial</div>
          )}
        </div>
        <div className="row" style={{ margin: "8px" }}>
          <div className="doubleRowInput">
            <MainField
              title={"Customer Information"}
              name={`${customer.firstname} ${customer.lastname}`}
              address={customer.street}
              address2={`${customer.city},${customer.state} ${customer.zip}`}
              business={false}
            />
          </div>
          <div className="doubleRowInput">
            <MainField
              title={"Billing Information"}
              name={customer.billingorg}
              address={customer.billingstreet}
              address2={`${customer.billingcity},${customer.billingstate} ${customer.billingzip}`}
              business={true}
            />
          </div>
        </div>
        <div className="row" style={{ margin: "8px" }}>
          <div className="doubleRowInput">
            {customer.phoneName || customer.phone ? (
              <ContactField
                title={"Primary Contact"}
                name={customer.phoneName}
                phone={customer.phone}
              />
            ) : null}
          </div>
          <div className="doubleRowInput">
            {customer.billingPrimaryName || customer.billingPrimaryPhone ? (
              <BusinessContactField
                title={"Primary Billing Contact"}
                name={customer.billingPrimaryName}
                phone={customer.billingPrimaryPhone}
                email={customer.billingPrimaryEmail}
              />
            ) : null}
          </div>
        </div>
        <div className="row" style={{ margin: "8px" }}>
          <div className="doubleRowInput">
            {customer.altphone || customer.altPhoneName ? (
              <ContactField
                title={"Alternate Contact"}
                name={customer.altPhoneName}
                phone={customer.altphone}
              />
            ) : null}
          </div>
          <div className="doubleRowInput">
            {customer.billingAlternateName || customer.billingAlternatePhone ? (
              <BusinessContactField
                title={"Alternate Billing Contact"}
                name={customer.billingAlternateName}
                phone={customer.billingAlternatePhone}
                email={customer.billingAlternateEmail}
              />
            ) : null}
          </div>
        </div>
        <div className="row" style={{ margin: "8px" }}>
          <div className="doubleRowInput">
            {customer.otherPhone || customer.otherPhoneName ? (
              <ContactField
                title={"Other Contact"}
                name={customer.otherPhoneName}
                phone={customer.otherPhone}
              />
            ) : null}
          </div>
          <div className="doubleRowInput">
            {customer.billingOtherPhone || customer.billingOtherName ? (
              <BusinessContactField
                title={"Other Billing Contact"}
                name={customer.billingOtherName}
                phone={customer.billingOtherPhone}
                email={customer.billingOtherEmail}
              />
            ) : null}
          </div>
        </div>
        <div className="row" style={{ margin: "8px" }}>
          <div className="doubleRowInput">
            {customer.email && (
              <EmailField title={"Customers Email"} email={customer.email} />
            )}
          </div>
          <div className="doubleRowInput"></div>
        </div>
        <div className="buttonBarFullWidth">
          <button
            type="button"
            className="standardButtonFullWidth"
            onClick={() => openEditCustomerDetails()}
          >
            <Edit />
            <span className="iconSeperation">Edit Client</span>
          </button>

          <button
            type="button"
            className="standardButtonFullWidth"
            onClick={() => openCustomerEquipmentList()}
          >
            <Hvac />
            <span className="iconSeperation">Equipment</span>
          </button>

          <button
            type="button"
            className="standardButtonFullWidth"
            onClick={() => openEditCustomerBilling()}
          >
            <Edit />
            <span className="iconSeperation">Edit Billing</span>
          </button>
        </div>
      </div>
    );
  }
};

export default ServiceCustomer;
