import React, { useContext } from "react";
import {
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Tooltip,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    PowerIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../../Providers/AuthProviders";

// profile menu component
const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
        href: "/"
    },
    {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
        href: '/edit-profile'
    },
    {
        label: "Inbox",
        icon: InboxArrowDownIcon,
        href: '/inbox'
    }
];

const ProfileMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    const { user, logOut, isDark } = useContext(AuthContext)
    console.log(user.photoURL)
    const handleLogOut = () => {
        logOut()
            .then(() => { })
    }
    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className={`flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto ${isDark ? 'bg-[#263238]' : ''}`}
                >
                    <Tooltip content={user?.displayName} placement="left">
                        <Avatar
                            variant="circular"
                            size="sm"
                            alt="candice wu"
                            className="border border-blue-500 p-0.5"
                            src={user?.photoURL}
                        />
                    </Tooltip>

                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className={`p-1 ${isDark ? 'bg-[#263238] border-0' : ''}`}>
                {profileMenuItems.map(({ label, icon, href }) => {
                    return (
                        <MenuItem
                            key={label}
                            onClick={closeMenu}
                            href={href}
                            className={`flex items-center gap-2 rounded ${isDark ? 'bg-[#263238]' : ''}`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isDark ? 'text-[white]' : ''}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={`${isDark ? 'white' : "blue-gray"}`}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
                <MenuItem
                    onClick={handleLogOut}
                    className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                >
                    {React.createElement(PowerIcon, {
                        className: "h-4 w-4 text-red-500",
                        strokeWidth: 2,
                    })}
                    <Typography
                        as="span"
                        variant="small"
                        className="font-normal"
                        color="red"
                    >
                        Sign Out
                    </Typography>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default ProfileMenu;