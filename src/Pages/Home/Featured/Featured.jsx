import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

import featuredImg from '../../../assets/home/featured.jpg'

const Featured = () => {
    return (
        <div
            style={{ backgroundImage: `url(${featuredImg})` }}
            className="bg-no-repeat bg-center bg-fixed bg-cover my-20 pt-6">
            <SectionTitle subHeading={"cheak it out"} heading={"featured item"} />

            <div className="md:flex items-center justify-center gap-6 py-16 px-36 bg-black bg-opacity-40">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="text-white">
                    <p>Aug 20, 2050</p>
                    <p className="uppercase">Where I can get some</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis similique, dignissimos reprehenderit cupiditate corporis aliquam labore veniam amet magnam qui aut eveniet ratione totam ut suscipit quam hic accusamus atque aperiam laborum voluptatum. Voluptate eaque, consequatur at nihil reprehenderit enim libero, voluptas vel suscipit id inventore quasi tempora sunt velit.</p>
                    <button className="btn btn-outline border-white text-white border-0 border-b-4  mt-9">Purchase Now</button>
                </div>
            </div>

        </div>
    );
};

export default Featured;