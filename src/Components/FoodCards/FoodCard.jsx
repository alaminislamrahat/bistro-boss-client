import React from 'react';

const FoodCard = ({ item }) => {
    const { name, image, price, recipe } = item || {};
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
                    <button className="btn btn-outline border-black text-black border-0 border-b-4  mt-9">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;