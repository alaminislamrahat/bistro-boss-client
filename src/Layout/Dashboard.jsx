import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    // console.log(isAdmin)
  
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu">

                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/adminHome"><FaHome /> Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addItems"><FaUtensils /> Add Items</NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/manageItems"><FaList /> Manage Items</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings"><FaBook />Manage Bookings</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users"><FaUsers />All Users</NavLink>
                            </li>
                        </>
                            :
                            <>
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
                            </>
                    }
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/"><FaHome /> Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad"><FaSearch /> menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact"><FaEnvelope /> Contact</NavLink>
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