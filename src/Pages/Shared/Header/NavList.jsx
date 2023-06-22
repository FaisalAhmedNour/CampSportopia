import React, { useContext } from "react";
import {
    Typography,
    MenuItem,
} from "@material-tailwind/react";
import {
    CodeBracketSquareIcon,
    HomeIcon,
    UsersIcon,
    UserGroupIcon,
    SunIcon
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../../Providers/AuthProviders";

// nav list component
let navListItems = [
    {
        label: "Home",
        icon: HomeIcon,
        href: "/"
    },
    {
        label: "Instructors",
        icon: UsersIcon,
        href: '/instructors'
    },
    {
        label: "Classes",
        icon: UserGroupIcon,
        href: '/all-classes'
    },
    {
        label: "Dashboard",
        icon: CodeBracketSquareIcon,
        href: '/dashboard'
    }
];

const NavList = () => {

    const { user, handleDark, isDark } = useContext(AuthContext);

    return (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            {
                user ?
                    navListItems.map(({ label, icon, href }) => (
                        <Typography
                            key={label}
                            as="a"
                            href={href}
                            variant="small"
                            color={`${isDark ? 'white' : "blue-gray"}`}
                            className="font-normal"
                        >
                            <MenuItem 
                            href={href}
                            className="flex items-center gap-2 lg:rounded-full"
                            >
                                {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                                {label}
                            </MenuItem>
                        </Typography>
                    )) :
                    navListItems.slice(0, 3).map(({ label, icon, href }) => (
                        <Typography
                            key={label}
                            as="a"
                            href={href}
                            variant="small"
                            color={`${isDark ? 'white' : "blue-gray"}`}
                            className="font-normal"
                        >
                            <MenuItem className="flex items-center gap-2 lg:rounded-full">
                                {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                                {label}
                            </MenuItem>
                        </Typography>
                    ))
            }
            <Typography
                as="a"
                variant="small"
                color={`${isDark ? 'white' : "blue-gray"}`}
                className="font-normal"
                onClick={handleDark}
            >
                <MenuItem className="flex items-center gap-2 lg:rounded-full">
                    {React.createElement(SunIcon, { className: "h-[18px] w-[18px]" })}{" "}
                    {isDark ? "Light" : "Dark"}
                </MenuItem>
            </Typography>
        </ul>
    );
}

export default NavList;