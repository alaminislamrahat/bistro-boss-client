import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';

const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()
    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user
                console.log(user)
                updateUserProfile(data.name, data.photo)
                    .then(() => {

                        // create user antry in database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({

                                        icon: "success",
                                        title: "user created",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                    console.log(('user updated to database'));
                                }
                            })



                    })
                    .catch(err => console.log(err))
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error.message}`,
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            })
    }

    console.log(watch("example"));

    return (
        <>
            <Helmet>
                <title>
                    Rahat Restaurant | Sign Up
                </title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"  {...register("name")} placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text"  {...register("photo")} placeholder="Photo Url" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"  {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"  {...register("password",

                                    {
                                        maxLength: 20,
                                        minLength: 6,
                                        pattern: /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/
                                    })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'minLength' && <span className='text-red-700'>password must be 6</span>}
                                {errors.password?.type === 'pattern' && <span className='text-red-700'>password must have one small letter,one capital letter,one number,one special charecter</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />

                            </div>
                        </form>
                        <p className='px-8'><small>New here <Link to="/login">Create a account</Link></small></p>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;