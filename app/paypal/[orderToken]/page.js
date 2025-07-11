import PayPalPage from "./PayPalPage";
import { Suspense } from "react";

const PayPal = ({ params: { orderToken } }) => {
  return (
    <Suspense>
      <PayPalPage token={orderToken} />
    </Suspense>
  );
};

export default PayPal;
