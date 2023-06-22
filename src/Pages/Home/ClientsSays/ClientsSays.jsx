import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const ClientsSays = () => {

    const font = {
        fontFamily: 'Dancing Script'
    }

    const { isDark } = useContext(AuthContext)

    return (
        <div className="mb-20 max-w-screen-2xl mx-auto">
            <h1
                className="text-5xl mb-5 text-center font-bold text-[#2d2929]"
            >Top Classes</h1>
            <h3
                style={font}
                className="text-center text-2xl font-bold text-[#efc429] mt-4 mb-5"
            >Choose Yours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div
                    data-aos="fade-right"
                    className="text-center p-5 py-14 order-1 md:order-2 lg:order-1"
                >
                    <img className="w-[120px] mb-4 mx-auto h-[120px] rounded-full border-4 border-white" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="" />
                    <p className="mb-4">
                        Our second expedition was excellent. We will be hiking with them again in Summer of 2016 and I’d have no hesitation recommending them. Thank you, guys.
                    </p>
                    <h3 className="text-xl font-semibold">Robert Tony</h3>
                    <h4
                        className="text-[#efc429] font-semibold"
                        style={font}
                    >28 y.o.</h4>
                </div>
                <div
                    data-aos="fade-up"
                    className={`text-center p-5 py-14  order-2 md:order-1 lg:order-2 col-span-1 md:col-span-2 lg:col-span-1 md:w-2/3 lg:w-full mx-auto ${isDark ? 'bg-[#324249]' : 'bg-white'}`}
                >
                    <img className="w-[120px] mb-4 mx-auto h-[120px] rounded-full border-4 border-[#5b9a42]" src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg" alt="" />
                    <p className="mb-4">
                        We’re a fit and experienced hiking group and Gary worked with us to create a hiking experience customized to challenge the group perfectly. We will choose you again.
                    </p>
                    <h3 className="text-xl font-semibold">JJ Thomson</h3>
                    <h4
                        className="text-[#efc429] font-semibold"
                        style={font}
                    >25 y.o.</h4>
                </div>
                <div
                    data-aos="fade-left"
                    className="text-center p-5 py-14 order-last"
                >
                    <img className="w-[120px] mb-4 mx-auto h-[120px] rounded-full border-4 border-white" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                    <p className="mb-4">
                        Our guide delivered to this itinerary superbly, catering to our every need and acting as a font of knowledge and our tour photographer as an added bonus. Thanks.
                    </p>
                    <h3 className="text-xl font-semibold">Don Lee</h3>
                    <h4
                        className="text-[#efc429] font-semibold"
                        style={font}
                    >32 y.o.</h4>
                </div>
            </div>
        </div>
    );
};

export default ClientsSays;