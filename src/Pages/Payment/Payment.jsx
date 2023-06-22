import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {

    const classToPay = useLoaderData();
    // console.log(classToPay.price);
    const price = classToPay.price;

    return (
        <div className="flex flex-col justify-center pt-[200px] items-center">
            <h2 
            className="uppercase text-4xl"
            >Payment</h2>
            <p className="text-xl text-[#ff0000f8] mt-5">Price: ${price}</p>
            <Elements stripe={stripePromise}>
                <Checkout price={price}></Checkout>
            </Elements>
        </div>
    );
};

export default Payment;