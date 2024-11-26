import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import bg from '../../../assets/menu/banner3.jpg'
import DesertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";


const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');
    return (
        <div>
            <Helmet>
                <title>
                    Rahat Restaurant | Menu
                </title>
            </Helmet>

            {/* main cover */}
            <Cover img={bg} title={"our menu"}/>
            <SectionTitle subHeading={"don't miss"} heading={"today's offer"}/>
            {/* offered item */}
            <MenuCategory items={offered}/>
            {/* desserts */}
            <MenuCategory items={dessert} title={"dessert"} coverImg={DesertImg}/>
            {/* pizza */}
            <MenuCategory items={pizza} title={"pizza"} coverImg={pizzaImg}/>
            {/* salad */}
            <MenuCategory items={salad} title={"salad"} coverImg={saladImg}/>
            {/* soup */}
            <MenuCategory items={soup} title={"soup"} coverImg={soupImg}/>
           
        </div>
    );
};

export default Menu;