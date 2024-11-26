import React from 'react';
import FoodCard from '../../../Components/FoodCards/FoodCard';

const OrderTab = ({items}) => {
    return (
        <div className='grid md:grid-cols-3 gap-10'>
            {
                items.map(item => <FoodCard item={item} />)
            }
        </div>
    );
};

export default OrderTab;