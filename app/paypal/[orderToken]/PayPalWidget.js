import React, { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
  PayPalMarks,
} from "@paypal/react-paypal-js";

const PaypalWidget = ({ receivedData }) => {
  const amount = receivedData?.order?.amount;
  const currency = receivedData?.order?.currency;
  const [showSpinner, setShowSpinner] = useState(false);
  const fundingSources = receivedData.funding_sources;
  const initialOptions = receivedData.script_provider_options;
  const style = receivedData.button_style;
  const createOrderOptions = receivedData.createOrder;
  const onApproveOptions = receivedData.onApprove;
  const onCancelOptions = receivedData.onCancel;
  const onErrorOptions = receivedData.onError;
  const [loading, setLoading] = useState(false);
  // Remember the amount props is received from the control panel
  const [selectedFundingSource, setSelectedFundingSource] = useState(
    fundingSources[0]
  );

  const onChange = (event) => {
    setSelectedFundingSource(event.target.value);
  };

  const createOrder = async (data) => {
    return fetch(createOrderOptions.url, {
      method: createOrderOptions.method,
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        send: createOrderOptions.body,
        response: data,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((order) => {
        return order.payload.id;
      });
  };

  const onApprove = async (data) => {
    setLoading(true);

    return fetch(onApproveOptions.url, {
      method: onApproveOptions.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        send: onApproveOptions.body,
        response: data,
      }),
    })
      .then((response) => {
        setShowSpinner(true);

        return response.json();
      })
      .then((orderData) => {
        // Your code here after capture the order
        orderData?.payload?.redirect_url
          ? (window.location.href = orderData.payload.redirect_url)
          : null;
      });
  };

  const onCancel = async (data) => {
    setLoading(true);

    return fetch(onCancelOptions.url, {
      method: onCancelOptions.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        send: onCancelOptions.body,
        response: data,
      }),
    })
      .then((response) => {
        setShowSpinner(true);
        return response.json();
      })
      .then((orderData) => {
        orderData?.payload?.redirect_url
          ? (window.location.href = orderData.payload.redirect_url)
          : null;
      });
  };

  const onError = (data) => {
    setLoading(true);
    return fetch(onErrorOptions.url, {
      method: onErrorOptions.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        send: onErrorOptions.body,
        response: data,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((orderData) => {
        setLoading(true);

        // Your code here after capture the order
        orderData?.payload?.redirect_url
          ? (window.location.href = orderData.payload.redirect_url)
          : null;
      })
      .catch((err) => console.log(err));
  };

  const ButtonWrapper = ({ showSpinner }) => {
    const [{ isPending }] = usePayPalScriptReducer();

    return (
      <>
        {(showSpinner || isPending || loading) && <div className="spinner" />}
        <PayPalButtons
          fundingSource={selectedFundingSource}
          style={style}
          disabled={false}
          forceReRender={[selectedFundingSource, style, amount, currency]}
          createOrder={createOrder}
          onApprove={onApprove}
          onCancel={onCancel}
          onError={onError}
        />
      </>
    );
  };

  return (
    <>
      <div
        style={{
          minHeight: "0px",
          margin: "auto",
          position: "relative",
          zIndex: 0,
        }}
      >
        <PayPalScriptProvider options={initialOptions}>
          <form
            style={
              fundingSources.length > 1
                ? { minHeight: "300px", minWidth: "300px" }
                : { visibility: "hidden", zIndex: -100, height: "30px" }
            }
          >
            {fundingSources?.map((fundingSource, index) => (
              <div key={index}>
                <label className="mark">
                  <input
                    defaultChecked={fundingSource === selectedFundingSource}
                    onChange={onChange}
                    type="radio"
                    name="fundingSource"
                    value={fundingSource}
                  />
                  <PayPalMarks fundingSource={fundingSource} /> {fundingSource}
                </label>
                <br />
              </div>
            ))}
          </form>

          <ButtonWrapper showSpinner={showSpinner} />
        </PayPalScriptProvider>
      </div>
      {loading && (
        <div
          className={`fixed top-0 left-0 w-full h-full z-[9999999999999] bg-black bg-opacity-50`}
        >
          <div className={`flex items-center justify-center h-full`}>
            <i className={`fas fa-spinner text-white fa-spin text-2xl`} />
          </div>
        </div>
      )}
    </>
  );
};

export default PaypalWidget;
