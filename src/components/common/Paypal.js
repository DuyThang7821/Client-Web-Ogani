import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";


const style = { "layout": "vertical" };

const ButtonWrapper = ({ currency, showSpinner, amount, handleCheckout, cartId }) => { 
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options, currency: currency,
      }
    })
  }, [currency, showSpinner])

  return (
    <>
      { (showSpinner && isPending) && <div className="spinner" /> }
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(data, actions) => actions.order.create({
          purchase_units: [
            { amount: { currency_code: currency, value: amount } }
          ]
        }).then(orderId => orderId)}
        onApprove={(data, actions) => actions.order.capture().then(async (response) => {
          if (response.status === 'COMPLETED') {
            handleCheckout(); 
          }
        })}
      />
    </>
  );
}

const Paypal = ({ amount, handleCheckout }) => { 
  const cartId = useSelector((state) => state.user.cartId);

  return (
    <div style={{ width: "450px", minHeight: "80px", margin: 'auto', padding: '10px' }}>
      <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
        {/* Truyền cartId từ props vào component ButtonWrapper */}
        <ButtonWrapper currency={'USD'} amount={amount} showSpinner={false} cartId={cartId} handleCheckout={handleCheckout} />
      </PayPalScriptProvider>
    </div>
  );
}

export default Paypal;
