import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const UpdateItem = () => {


    const item = useLoaderData();
    const {name, category, recipe, price, _id} = item;
    console.log(item)


    const { register, handleSubmit,reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data);
        // upload image to imagebb and get a url
        const imageFile = {image : data.image[0]}
        const res = await axiosPublic.post(image_hosting_api,imageFile,{
            headers : {
                 'Content-Type': 'multipart/form-data'
            }
        })
        console.log(res.data)
        if(res.data.success){
            // save data to the server whith photo url {image bb link whis is in the res.data}
            const menuItem = {
                name : data.name,
                category : data.category,
                price : parseFloat(data.price),
                recipe : data.recipe,
                image : res.data.data.display_url
            }
            // post data to the database
            const menuRes = await axiosSecure.patch(`/menu/${_id}`,menuItem)
            console.log(menuRes);
            if(menuRes.data.modifiedCount > 0){
                // show popup success
           
                Swal.fire({
                    
                    icon: "success",
                    title: `${data.name} updated successfully`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }

        }

    }

    return (
        <div>
            <SectionTitle heading={"update Item"} subHeading={"Refresh data"} />
            <form onSubmit={handleSubmit(onSubmit)}>

                <label className="form-control w-full my-6">
                    <div className="label">
                        <span className="label-text">Recipe Name*</span>

                    </div>
                    <input
                        {...register('name')}
                        defaultValue={name}
                        type="text"
                        placeholder="Recipe Name"
                        className="input input-bordered w-full " />

                </label>
                <div className="flex gap-6 justify-center items-center">
                    {/* category */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Category*</span>

                        </div>
                        <select defaultValue={category}
                            {...register('category')}
                            className="select select-bordered w-full ">
                            <option disabled value="default">Select a category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="desser">Desser</option>
                            <option value="drinks">Drinks</option>

                        </select>

                    </label>

                    {/* price */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Price*</span>

                        </div>
                        <input
                            {...register('price')}
                            defaultValue={price}
                            type="number"
                            placeholder="enter price"
                            className="input input-bordered w-full " />

                    </label>
                </div>
                {/* recipe details */}
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Recipe details</span>

                    </div>
                    <textarea
                        {...register('recipe')}
                        defaultValue={recipe}
                        className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                    <div className="label">

                    </div>
                </label>

                <div className="form-control w-full my-6">
                    <input
                     {...register('image')}
                     
                    type="file" 
                    className="file-input w-full max-w-xs" />
                </div>



                <button className="btn">Update Item</button>
            </form>
        </div>
    );
};

export default UpdateItem;