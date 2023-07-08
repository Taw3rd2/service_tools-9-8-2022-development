import React from "react";

const PartsQuoteSheet = ({ customerValues }) => {
  return (
    <>
      <div className="row">
        <div className="doubleRowInput">
          <div className="columnContainer">
            <div className="pageCationText">Hi-Temp</div>
            <div className="pageCaptionText">2500 E M21 STE C</div>
            <div className="pageCaptionText">Corunna, MI 48817</div>
          </div>
        </div>
        <div className="doubleRowInput">
          <div className="columnContainer">
            <div className="pageCaptionText">
              {`${customerValues.customerFirstName} ${customerValues.customerLastName}`}
            </div>
            <div className="pageCaptionText">
              {customerValues.customerStreet}
            </div>
            <div className="pageCaptionText">{`${customerValues.customerCity} ${customerValues.customerState} ${customerValues.customerZip}`}</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="singleRowInput">
          <div className="columnContainer">
            <div className="pageCaptionText">We propose...</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartsQuoteSheet;
