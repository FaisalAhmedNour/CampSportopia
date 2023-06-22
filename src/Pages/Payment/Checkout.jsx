import { Button } from "@material-tailwind/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";

const Checkout = ({ price }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('')
    const { user } = useContext(AuthContext)

    useEffect(() => {
        axios.post('https://camp-sportopia-server-faisalahmednour.vercel.app/create-payment-intent', { price })
            .then(res => {
                setClientSecret(res.data.clientSecret)
                // console.log(res.data.clientSecret);
            })
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        }
        else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmPayment(
            {
                clientSecret,
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                }
            });
        if (confirmError) {
            console.log(confirmError);
        }
        console.log(paymentIntent)
    }

    return (
        <form
            className="w-96 mt-5 text-center"
            onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <Button
                type="submit"
                size="sm"
                disabled={!stripe || !clientSecret}
                className="w-[250px] text-lg mt-5 "
            >
                Pay
            </Button>
        </form>
    );
};

export default Checkout;