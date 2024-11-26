import { useEffect } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useState } from "react";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";

const PopularMenu = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');
    // const [menu, setMenu] = useState([]);
    // useEffect(() => {
    //     fetch('../menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularItem = [...data].filter(item => item.category === "popular");
    //             setMenu(popularItem);
    //         });
    // }, [])
    // console.log(menu)

    return (
        <div className="mb-12">
            <SectionTitle
                subHeading={"Populour items"}
                heading={"from our menu"} />
            <div className="grid md:grid-cols-2 gap-4">
                {
                    popular.map(item => <MenuItem key={item._id} item={item} />)
                }
            </div>
            <div className="flex items-center justify-center">
                <button className="btn btn-outline mx-auto border-0 border-b-4  mt-9">Purchase Now</button>
            </div>
        </div>
    );
};

export default PopularMenu;