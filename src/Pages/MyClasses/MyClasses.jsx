
import {
    Card,
    Typography,
    CardBody,
    Avatar,
    Button,
} from "@material-tailwind/react";
import {
    ArrowPathIcon,
} from "@heroicons/react/24/outline";
import useClasses from "../../Hooks/useClasses/useClasses";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const TABLE_HEAD = ["Image", "Course Name", "Instructor Info", "Enrolled", "Price", "Action", "Feedback"];

export default function MyClasses() {

    const { user } = useContext(AuthContext)
    const [classes] = useClasses();
    const myClass = classes.filter(cls => cls.instructor === user.displayName)

    const handleFeedback = message => {
        // console.log(message);
        Swal.fire({
            title: message,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }

    return (
        <Card className="h-full w-full">
            <Helmet>
                <title>CampSportopia | My Classes</title>
            </Helmet>
            <CardBody className="overflow-scroll px-0">
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
                        {myClass.map(
                            ({ _id, imglink, name, email, enrolled, instructor, price, status, message }, index) => {
                                const isLast = index === myClass.length - 1;
                                const cls = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                return (
                                    <tr key={_id}>
                                        <td className={cls}>
                                            <div className="flex items-center gap-3">
                                                {/* <Avatar src="/img/face-2.jpg" alt="avatar"  /> */}
                                                <Avatar
                                                    src={imglink}
                                                    alt={name}
                                                    size="xl"
                                                    variant="rounded"
                                                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                                />
                                            </div>
                                        </td>
                                        <td className={cls}>
                                            <Typography variant="small" color="blue-gray" className="font-bold text-md">
                                                {name}
                                            </Typography>
                                        </td>
                                        <td className={cls}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-[700]">
                                                    {instructor}
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
                                        <td className={cls}>
                                            <Typography variant="small" color="blue-gray" className="font-[600]">
                                                {enrolled}
                                            </Typography>
                                        </td>
                                        <td className={cls}>
                                            <Typography
                                                variant="small"
                                                className="font-[700] text-[#3a3a8fe3]">
                                                ${price}
                                            </Typography>
                                        </td>
                                        <td className={`${cls} text-center`}>
                                            <div className="w-full text-center">
                                                {
                                                    status === 'approved' ?
                                                        <Button
                                                            size="sm"
                                                            color="green"
                                                            className="mx-auto"
                                                        >
                                                            Approved
                                                        </Button> :
                                                        status === "pending" ?
                                                            <Button
                                                                size="sm"
                                                                variant="outlined"
                                                                className="flex items-center gap-3 mx-auto"
                                                            >
                                                                pending
                                                                <ArrowPathIcon strokeWidth={2} className="h-5 w-5" />
                                                            </Button> :
                                                            <div className="flex gap-2 mx-auto">
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    color="red"
                                                                >
                                                                    declined
                                                                </Button>
                                                                <Link to={`/dashboard/update-classes/${_id}`}>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="ghost"
                                                                        color="amber"
                                                                    >
                                                                        Update
                                                                    </Button></Link>
                                                            </div>

                                                }
                                            </div>
                                        </td>
                                        <td>
                                            {
                                                status === "denied" &&
                                                <div className="">
                                                    <Button
                                                        size="sm"
                                                        variant="outlined"
                                                        onClick={() => handleFeedback(message)}
                                                    >
                                                        Feedback
                                                    </Button>
                                                </div>
                                            }
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}