// TODO: move component to Dashboard layout
import { useState, useEffect } from "react";
import {
    Navbar,
    Typography,
    IconButton,
} from "@material-tailwind/react";

export default function DashboardNavbar({ isOpen, toggleDrawer }) {
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
    }, []);

    return (
        <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-3 mb-5 lg:mb-10">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="/"
                    className="mr-4 cursor-pointer py-1.5 font-bold text-xl lg:mx-auto"
                >
                    CampSportopia
                </Typography>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    <button
                        className={`lg:hidden  ${isOpen ? 'hidden' : 'block'}`}
                        onClick={toggleDrawer}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </IconButton>
            </div>
        </Navbar>
    );
}