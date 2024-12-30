import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payment/${user.email}`)
            return data
        }
    })
    return (
        <div>
            <h2 className="text-3xl">Total Pyment : {payments?.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Price</th>
                            <th>Transaction Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((item ,idx)=> <tr key={item._id}>
                            <th>{idx + 1}</th>
                            <td>{item.price}</td>
                            <td>{item.transactionId}</td>
                            <td>{item.status}</td>
                        </tr>)}



                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PaymentHistory;