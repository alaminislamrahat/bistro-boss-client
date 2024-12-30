import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheakoutForm from "./CheakoutForm";

// todo: add  a publishable key. :)
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
const Payment = () => {
    return (
        <div>
            <SectionTitle heading={"Payment"} subHeading={"pay to eat"}/>

            <div>
                <Elements stripe={stripePromise}>
                    <CheakoutForm/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;