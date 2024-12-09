import { FaAd, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";


const Dashboard = () => {
    const [cart] = useCart()
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu">

                    <li>
                        <NavLink to="/dashboard/userHome"><FaHome /> User Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/reservation"><FaCalendar /> Reservation</NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/cart"><FaShoppingCart /> My cart ({cart.length})</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/review"><FaAd />Add Review</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/bookings"><FaList />Add Bookings</NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/"><FaHome /> Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad"><FaSearch /> menu</NavLink>
                    </li>

                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;