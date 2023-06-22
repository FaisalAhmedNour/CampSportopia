import { Outlet, useLocation } from "react-router-dom";
import Header from "../../Pages/Shared/Header/Header";
import Footer from "../../Pages/Shared/Footer/Footer";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";

const Main = () => {

    const location = useLocation();
    const noLoginSignUp = location.pathname.includes('login') || location.pathname.includes('signup');
    const { isDark } = useContext(AuthContext)

    return (
        <div className={`${isDark ? 'bg-[#515b60]' : 'bg-[#EFEEEA]'}`}>
            <div className="mx-auto max-w-[1800px]">
                {noLoginSignUp || <Header></Header>}
                <Outlet></Outlet>
                {noLoginSignUp || <Footer></Footer>}
            </div>
        </div>
    );
};

export default Main;