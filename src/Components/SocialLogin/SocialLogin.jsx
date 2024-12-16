import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()
    const handleGoogle = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user)
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        Swal.fire({

                            icon: "success",
                            title: "user created",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/')
                    })
            })
            .catch(err => console.log(err.message))
    }
    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button
                    onClick={handleGoogle}
                    className="btn text-green-700">
                    <FaGoogle /> Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;