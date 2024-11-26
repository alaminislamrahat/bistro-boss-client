import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const MenuCategory = ({items,title,coverImg}) => {
    return (
        <div className="pt-10">
             {title && <Cover img={coverImg} title={title}/>}
             <div className="grid md:grid-cols-2 gap-8 p-16">
                {
                    items.map(item => <MenuItem key={item._id} item={item} />)
                }
            </div>
            <Link to={`/order/${title}`} className="btn btn-outline border-black text-black border-0 border-b-4  mt-9">Purchase Now</Link>
        </div>
    );
};

export default MenuCategory;