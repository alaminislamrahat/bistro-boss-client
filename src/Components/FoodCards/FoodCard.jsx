import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCart from '../../Hooks/useCart';


const FoodCard = ({ item }) => {
    const { name, image, price, recipe ,_id} = item || {};
    const {user} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure()
    const [,refetch] = useCart()

    const handleFoodItem = () => {
        if(user && user.email){
            const cartItem = {
                menuId : _id,
                email : user.email,
                name,
                image,
                price
            };

            axiosSecure.post('/carts',cartItem)
            .then(res => {
                console.log(res.data);
                if(res.data.insertedId){
                    Swal.fire({
                        
                        icon: "success",
                        title: `${name} added to cart`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                    //   for data update reload / refetch 
                    refetch()
                }
            })
        }
        else{
            Swal.fire({
                title: "Are not login?",
                text: "Please login to add to the cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, go to login page!"
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/login',{state :{from : location}})
                }
              });
        }
    }
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={image}
                    alt="Shoes" />
            </figure>
            <p className='bg-black text-white right-0 absolute px-4 mt-3 mr-5 rounded-md'> ${price} </p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button
                    onClick={ handleFoodItem}
                     className="btn btn-outline border-black text-black border-0 border-b-4  mt-9">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;