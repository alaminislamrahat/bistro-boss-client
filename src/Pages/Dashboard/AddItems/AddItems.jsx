import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddItems = () => {
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
            const menuRes = await axiosSecure.post('/menu',menuItem)
            console.log(menuRes);
            if(menuRes.data.insertedId){
                // show popup success
                reset();
                Swal.fire({
                    
                    icon: "success",
                    title: `${data.name} addeded to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }

        }

    }
    return (
        <div>
            <SectionTitle heading={"add items"} subHeading={"whats new"}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>

                        </div>
                        <input
                            {...register('name')}
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
                            <select defaultValue="default"
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
                            className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                        <div className="label">

                        </div>
                    </label>

                    <div className="form-control w-full my-6">
                        <input {...register('image')} type="file" className="file-input w-full max-w-xs" />
                    </div>



                    <button className="btn">Add Items <FaUtensils/></button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;