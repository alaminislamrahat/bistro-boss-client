import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { MdShoppingCartCheckout } from "react-icons/md";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";


const Navbar = () => {
    const [cart] = useCart()

    const { user, logOut } = useContext(AuthContext);

    const [isAdmin] = useAdmin()

    const handleLogout = () => {
        logOut()
            .then(result => console.log(result))
            .catch(error => console.log(error))
    }

    const navOptions = <>
        <li> <NavLink to="/">Home</NavLink> </li>
        <li> <NavLink to="/menu">Menu</NavLink> </li>
        <li> <NavLink to="/order/salad">Order</NavLink> </li>
        {
            user && isAdmin && <li> <NavLink to="/dashboard/adminHome">dashboard</NavLink> </li>
        }
        {
            user && !isAdmin && <li> <NavLink to="/dashboard/userHome">dashboard</NavLink> </li>
        }
        <li>
            <Link to="/dashboard/cart"><button className="btn bg-opacity-40">
            <MdShoppingCartCheckout size={30} color="white" />
                <div className="badge badge-secondary">{cart.length}</div>
            </button></Link>
        </li>

        {
            user ? <><button onClick={handleLogout} className="btn btn-ghost">Logout</button></> : <><li> <NavLink to="/login">Login</NavLink> </li></>
        }

    </>
    return (
        <div>
            <div className="navbar bg-black text-white fixed bg-opacity-30 z-30 max-w-screen-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Rahat Restaurant</a>
                </div>
                <div className="navbar-center hidden lg:flex justify-center items-center">
                    <ul className="menu menu-horizontal px-1 flex items-center justify-center">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;