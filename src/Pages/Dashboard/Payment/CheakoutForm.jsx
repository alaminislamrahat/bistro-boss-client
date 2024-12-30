import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheakoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')

    const navigate = useNavigate();


    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()
    const [cart,refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    useEffect(()=>{
      if(totalPrice > 0){
        axiosSecure.post('/create-payment-intent',{price : totalPrice})
        .then(res => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret)
        })
      }
    },[axiosSecure,totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement);
        if(card == null){
            return;
        }

        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type : 'card',
            card
        })
        if(error){
            console.log('payment error',error)
            setError(error.message)
        }
        else{
            console.log('payment',paymentMethod)
            setError('')
        }
        // confirm payment
        const {paymentIntent,error : confirmError} = await stripe.confirmCardPayment(
            clientSecret, {
                payment_method : {
                    card : card,
                    billing_details : {
                        name : user?.displayName || 'anonymous',
                        email : user?.email || 'anonymous'
                    }
                }
            }
        )

        if(confirmError){
            console.log('confirmError')
        }
        else{
            console.log('payment intent',paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                console.log('transection id :', paymentIntent.id )
                setTransactionId(paymentIntent.id)

                // now save payment in database 
                const payment = {
                    email : user.email,
                    price : totalPrice,
                    transactionId : paymentIntent.id,
                    date : new Date() ,//utc date convert.use moment js
                    cartIds : cart.map(item => item._id),
                    menuItemIds : cart.map(item => item.menuId),
                    status : 'pending'
                }

                const {data} = await axiosSecure.post('/payment', payment);
                console.log(data,'payment saved');
                refetch();
                if(data.paymentResult.insertedId){
                    Swal.fire({
                        
                        icon: "success",
                        title: "Thanks for payment",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      
                      navigate('/dashboard/paymentHistory')
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
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
            <button className="btn btn-primary" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="font-bold text-red-600">{error}</p>
            {
                transactionId && <p>Your transaction id : {transactionId}</p>
            }
        </form>
    );
};

export default CheakoutForm;