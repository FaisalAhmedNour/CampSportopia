import React, { useContext } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import {
    Bars2Icon
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../../Providers/AuthProviders";
import NavList from "./NavList";
import ProfileMenu from "./ProfileMenu";
import { Link } from "react-router-dom";

export default function ComplexNavbar() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    
    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false)
            );
    }, []);
    const { user, isDark } = useContext(AuthContext);
    
    return (
        <Navbar className={`sticky inset-0 z-10 mx-auto max-w-[1800px] p-2 lg:rounded-full lg:pl-6 ${isDark ? 'bg-[#263238] border-0' : ''}`}>
            <div className={`relative mx-auto flex items-center  ${isDark ? 'text-[#d4c7c7]' : 'text-blue-gray-900'}`}>
                <Typography
                    as="a"
                    href="/"
                    className="mr-4 ml-2 cursor-pointer font-medium flex"
                >
                    <img className="w-14 rounded-full" src="https://media.istockphoto.com/id/1154399582/pl/wektor/koncepcja-summer-sports-camp-z-r%C3%B3%C5%BCnymi-pi%C5%82kami-sportowymi-abstrakcyjnym-s%C5%82o%C5%84cem-i-fal%C4%85.jpg?s=612x612&w=0&k=20&c=w1kNPHegVLhh56l-iLbgiSsQAci3rGcd576Qr5riJfY=" alt="" />
                    <span className="mt-2 text-xl font-[600]">CampSportopia</span>
                </Typography>
                <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
                    <NavList />
                </div>
                <IconButton
                    size="sm"
                    color={`${isDark ? 'white' : "blue-gray"}`}
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden"
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>
                {
                    user ?
                        <ProfileMenu /> :
                        <Link className="text-right ms-auto mr-8" to='/login'><Button variant="outlined" >Log in</Button></Link>
                }
            </div>
            <MobileNav open={isNavOpen} className="overflow-scroll">
                <NavList />
            </MobileNav>
        </Navbar>
    );
}