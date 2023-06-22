
import {
    Card,
    Typography,
    Button,
    CardBody,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import UseUsers from "../../Hooks/useUsers/useUsers";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const TABLE_HEAD = ["Users", "User Info", "Status", "Update", "Action"];

export default function ManageUsers() {
    const [users, refetch] = UseUsers()
    users.sort((a, b) => {
        const roleA = a.role.toUpperCase();
        const roleB = b.role.toUpperCase();
        if (roleA < roleB) {
            return -1;
        }
        if (roleA > roleB) {
            return 1;
        }
        return 0;
    });
    console.log(users)
    const updateUser = (id, role) => {
        fetch(`https://camp-sportopia-server-faisalahmednour.vercel.app/users/admin?id=${id}&role=${role}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Successfully updated user to ${role}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    return (
        <Card className="min-h-screen mb-10 w-full">
            <Helmet>
                <title>CampSportopia | Manage Users</title>
            </Helmet>
            <CardBody className="overflow-x-scroll overflow-y-scroll px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(({ _id, photo, name, email, role }, index) => {
                            const isLast = index === users.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                            return (
                                <tr key={name}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={photo} alt={name} size="xl" />
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography variant="small" color="blue-gray" className="font-[800]">
                                                {name}
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-[600] opacity-70"
                                            >
                                                {email}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Button
                                                variant="text"
                                                size="sm"
                                                color={''}
                                            >
                                                {role}
                                            </Button>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max flex gap-2">
                                            <Button
                                                onClick={() => updateUser(_id, 'instructor')}
                                                variant="ghost"
                                                size="sm"
                                                color={"blue-gray"}
                                                disabled={role === 'instructor' ? true : false}
                                            >
                                                Instructor
                                            </Button>
                                            <Button
                                                onClick={() => updateUser(_id, 'admin')}
                                                variant="ghost"
                                                size="sm"
                                                value={"Admin"}
                                                color={"green"}
                                                disabled={role === 'admin' ? true : false}
                                            >
                                                Admin
                                            </Button>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Tooltip content="Delete User">
                                            <IconButton variant="text" color="blue-gray">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                                </svg>
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}