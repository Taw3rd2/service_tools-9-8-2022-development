import { Suspense, lazy, useState } from "react";
import { useLocation } from "react-router-dom";

import "../../global_style/style.css";
import SiteInfo from "../../components/parts_quotes/details/SiteInfo";
import EquipmentInfo from "../../components/parts_quotes/details/EquipmentInfo";
import PartsQuotePartsList from "../../components/parts_quotes/list/PartsQuotePartsList";
import Labor from "../../components/parts_quotes/details/Labor";
import Shipping from "../../components/parts_quotes/details/Shipping";
import Totals from "../../components/parts_quotes/details/Totals";
import Spinner from "../../components/spinner/Spinner";

const ModalOne = lazy(() =>
  import("../../components/basic_components/modal_one/ModalOne")
);
const AddPartToList = lazy(() =>
  import("../../components/parts_quotes/details/AddPartToList")
);

const PartsQuote = () => {
  const location = useLocation();
  const client = location.state.customer;
  const quoteData = location.state.quoteData;
  const selectedEquipment = location.state.selectedEquipment;
  const TAX_RATE = 0.06;

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

  const [customerValues, setCustomerValues] = useState({
    iscommercial:
      client !== undefined && client.iscommercial !== undefined
        ? client.iscommercial
        : false,
    customerFirstName:
      client !== undefined && client.firstname !== undefined
        ? client.firstname
        : "",
    customerLastName:
      client !== undefined && client.lastname !== undefined
        ? client.lastname
        : "",
    customerStreet:
      client !== undefined && client.street !== undefined ? client.street : "",
    customerCity:
      client !== undefined && client.city !== undefined ? client.city : "",
    customerState:
      client !== undefined && client.state !== undefined ? client.state : "MI",
    customerZip:
      client !== undefined && client.zip !== undefined ? client.zip : "48867",
  });

  const [equipmentValues, setEquipmentValues] = useState({
    equipmentName: selectedEquipment.equipmentName
      ? selectedEquipment.equipmentName
      : "",
    equipmentBrand: selectedEquipment.equipmentBrand
      ? selectedEquipment.equipmentBrand
      : "",
    equipmentModel: selectedEquipment.equipmentModel
      ? selectedEquipment.equipmentModel
      : "",
    equipmentSerial: selectedEquipment.equipmentSerial
      ? selectedEquipment.equipmentSerial
      : "",
  });

  const [quoteValues, setQuoteValues] = useState({
    id: quoteData.id ? quoteData.id : "",
    notModelSpecific:
      quoteData !== undefined && quoteData.notModelSpecific !== undefined
        ? quoteData.notModelSpecific
        : false,
    jobNumber: quoteData.jobNumber ? quoteData.jobNumber : "",
    quoteDate: quoteData.quoteDate ? quoteData.quoteDate : new Date(),
    partsList: quoteData.partsList ? quoteData.partsList : [],
    laborHours: quoteData.laborHours ? quoteData.laborHours : 1,
    laborRate: quoteData.laborRate ? quoteData.laborRate : 9900,
    laborNotes: quoteData.laborNotes ? quoteData.laborNotes : "",
    addMaintenance: quoteData.addMaintenance ? quoteData.addMaintenance : false,
    addRediagnostic: quoteData.addRediagnostic
      ? quoteData.addRediagnostic
      : false,
    regularShippingTime: quoteData.regularShippingTime
      ? quoteData.regularShippingTime
      : "5-7 days",
    quickShippingTime: quoteData.quickShippingTime
      ? quoteData.quickShippingTime
      : "1-3 days",
    regularShippingRate: quoteData.regularShippingRate
      ? quoteData.regularShippingRate
      : 25.0,
    quickShippingRate: quoteData.quickShippingRate
      ? quoteData.quickShippingRate
      : 75.0,
    shippingNotes: quoteData.shippingNotes ? quoteData.shippingNotes : "",
    disclaimerRed: quoteData.disclaimerRed ? quoteData.disclaimerRed : false,
    selectedShipping: quoteData.selectedShipping
      ? quoteData.selectedShipping
      : "none",
    selectedDiscount: quoteData.selectedDiscount
      ? quoteData.selectedDiscount
      : "none",
  });

  const handleCustomerValueChange = (prop) => (event) => {
    setCustomerValues({ ...customerValues, [prop]: event.target.value });
  };

  const handleCustomerCheckChange = (prop) => (event) => {
    setCustomerValues({ ...customerValues, [prop]: event.target.checked });
  };

  const handleEquipmentValueChange = (prop) => (event) => {
    setEquipmentValues({ ...equipmentValues, [prop]: event.target.value });
  };

  const handleQuoteValueChange = (prop) => (event) => {
    setQuoteValues({ ...quoteValues, [prop]: event.target.value });
  };

  const handleQuoteCheckChange = (prop) => (event) => {
    setQuoteValues({ ...quoteValues, [prop]: event.target.checked });
  };

  const handleQuoteDateChange = (prop) => (value) => {
    setQuoteValues({ ...quoteValues, [prop]: value });
  };

  const handleShippingRateChange = (event) => {
    console.log("rate: ", event);
    if (event.target.id === "regularShippingRate") {
      setQuoteValues({
        ...quoteValues,
        regularShippingRate: parseFloat(event.target.value),
      });
    } else {
      setQuoteValues({
        ...quoteValues,
        quickShippingRate: parseFloat(event.target.value),
      });
    }
  };

  const openAddPartToList = () => {
    openModalOne(
      "40%",
      "Add Part To Quote",
      <AddPartToList
        quoteValues={quoteValues}
        setQuoteValues={setQuoteValues}
        closeModalOne={closeModalOne}
      />
    );
  };

  const getTotalPartsCost = () => {
    const tempArray = [];
    if (quoteValues.partsList.length > 0) {
      for (const part of quoteValues.partsList) {
        tempArray.push(parseFloat(part.partCost) * 100 * part.quantity);
      }
      return tempArray.map((item) => item).reduce((prev, next) => prev + next);
    } else {
      return 0;
    }
  };

  const getTotalPartsTax = () => {
    if (getTotalPartsCost() === 0) {
      return 0;
    } else {
      return getTotalPartsCost() * TAX_RATE;
    }
  };

  const getTotalCustomerCost = () => {
    const tempArray = [];
    if (quoteValues.partsList.length > 0) {
      for (const part of quoteValues.partsList) {
        const markedUpPart = parseFloat(part.partCost) * 2.25;
        tempArray.push(markedUpPart * 100 * part.quantity);
      }
      return tempArray.map((item) => item).reduce((prev, next) => prev + next);
      // return quoteValues.partsList
      //   .map((item) => parseFloat(item.partCost) * 2.25)
      //   .reduce((prev, next) => prev + next);
    } else {
      return 0;
    }
  };

  const getTotalLabor = () => {
    return quoteValues.laborHours * quoteValues.laborRate;
  };

  const getMaintenance = () => {
    if (quoteValues.addMaintenance) {
      return 12995;
    } else {
      return 0;
    }
  };
  const getRediagnostic = () => {
    if (quoteValues.addRediagnostic) {
      if (
        quoteValues.laborRate === "" ||
        quoteValues.laborRate === undefined ||
        quoteValues.laborRate === null
      ) {
        return 9900;
      } else {
        return parseFloat(quoteValues.laborRate);
      }
    } else {
      return 0;
    }
  };

  const getShipping = () => {
    if (quoteValues.selectedShipping === "regular") {
      return quoteValues.regularShippingRate * 100;
    } else if (quoteValues.selectedShipping === "quick") {
      return quoteValues.quickShippingRate * 100;
    } else {
      return 0;
    }
  };
  const getSubtotal = () => {
    return (
      getTotalPartsTax() +
      getTotalCustomerCost() +
      getTotalLabor() +
      getMaintenance() +
      getRediagnostic()
    );
  };
  const getDiscount = () => {
    if (quoteValues.selectedDiscount === "maintenance") {
      const subTotal = getSubtotal() + getShipping();
      return subTotal * 0.1;
    } else {
      return 0;
    }
  };
  const getTotalQuote = () => {
    return getSubtotal() + getShipping() - getDiscount();
  };

  const saveQuote = () => {
    const partsQuote = {
      jobNumber: quoteValues.jobNumber,
      quoteDate: quoteValues.quoteDate,
      equipmentName: equipmentValues.equipmentName,
      equipmentBrand: equipmentValues.equipmentBrand,
      equipmentModel: equipmentValues.equipmentModel,
      equipmentSerial: equipmentValues.equipmentSerial,
      partsList: quoteValues.partsList,
      laborRate: quoteValues.laborRate,
      maintenance: quoteValues.addMaintenance,
      rediagnostic: quoteValues.addRediagnostic,
      selectedShipping: quoteValues.selectedShipping,
      regularShippingTime: quoteValues.regularShippingTime,
      regularShippingRate: quoteValues.regularShippingRate,
      quickShippingTime: quoteValues.quickShippingTime,
      quickShippingRate: quoteValues.quickShippingRate,
      shippingNotes: quoteValues.shippingNotes,
      selectedDiscount: quoteValues.selectedDiscount,
    };

    if (quoteValues.id === "") {
      console.log("partsQuote no id: ", partsQuote);
    } else {
      console.log("partsQuote: has id", partsQuote);
    }
  };

  return (
    <div className="pageContainer">
      <div className="row">
        <div className="doubleRowInput">
          <div className="row">
            <div className="doubleRowInput">
              <SiteInfo
                customerValues={customerValues}
                handleCustomerCheckChange={handleCustomerCheckChange}
                handleCustomerValueChange={handleCustomerValueChange}
              />
            </div>
            <div className="doubleRowInput">
              <EquipmentInfo
                equipmentValues={equipmentValues}
                handleEquipmentValueChange={handleEquipmentValueChange}
                quoteValues={quoteValues}
                handleQuoteCheckChange={handleQuoteCheckChange}
                handleQuoteDateChange={handleQuoteDateChange}
                handleQuoteValueChange={handleQuoteValueChange}
              />
            </div>
          </div>
        </div>

        <div className="doubleRowInput">
          <div className="row">
            <div className="doubleRowInput">
              <Labor
                quoteValues={quoteValues}
                handleQuoteValueChange={handleQuoteValueChange}
              />
              <Shipping
                quoteValues={quoteValues}
                handleQuoteValueChange={handleQuoteValueChange}
                handleShippingRateChange={handleShippingRateChange}
              />
            </div>
            <div className="doubleRowInput">
              <Totals
                quoteValues={quoteValues}
                getTotalLabor={getTotalLabor}
                getTotalPartsCost={getTotalPartsCost}
                getTotalPartsTax={getTotalPartsTax}
                getTotalCustomerCost={getTotalCustomerCost}
                getMaintenance={getMaintenance}
                getRediagnostic={getRediagnostic}
                getShipping={getShipping}
                getDiscount={getDiscount}
                getTotalQuote={getTotalQuote}
                setQuoteValues={setQuoteValues}
                getSubtotal={getSubtotal}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="singleRowInput">
          <PartsQuotePartsList
            quoteValues={quoteValues}
            openAddPartToList={openAddPartToList}
            saveQuote={saveQuote}
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

export default PartsQuote;
