
import {
    Card,
    Typography,
    CardBody,
    Chip,
    Avatar,
    Button,
} from "@material-tailwind/react";
import useClasses from "../../Hooks/useClasses/useClasses";
import Swal from "sweetalert2";
import axios from "axios";
import { Helmet } from "react-helmet";

const TABLE_HEAD = ["Image", "Course Name", "Instructor Info", "Available Sits", "Price", "Action"];

export default function ManageClasses() {

    const [classes, refetch] = useClasses();
    console.log(classes.length, classes[classes.length - 1]);
    const handleApprovement = async (id, status) => {
        if (status === 'declined') {
            const { value: text } = await Swal.fire({
                input: 'textarea',
                inputLabel: 'Feedback',
                inputPlaceholder: 'Type feedback here...',
                inputAttributes: {
                    'aria-label': 'Type your message here'
                },
                showCancelButton: true
            })

            if (text) {
                axios.patch(`https://camp-sportopia-server-faisalahmednour.vercel.app/classes/${id}`, { newStatus: "denied", adminMessage: text })
                    .then(() =>
                        Swal.fire({
                            icon: 'success',
                            title: 'The Course Denied SuccessFully'
                        })
                            .then(() => {
                                refetch()
                            })
                    )
            }
        }
        else {
            axios.patch(`https://camp-sportopia-server-faisalahmednour.vercel.app/classes/${id}`, { newStatus: "approved", adminMessage: "Ok, It's good" })
                .then(() =>
                    Swal.fire({
                        icon: 'success',
                        title: 'The Course Approved SuccessFully'
                    })
                        .then(() => {
                            refetch()
                        })
                )
        }
    }

    return (
        <Card className="h-full w-full">
            <Helmet>
                <title>CampSportopia | Manage Classes</title>
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
                        {classes.map(
                            ({ _id, imglink, name, email, totalSeat, enrolled, instructor, price, status }, index) => {
                                const isLast = index === classes.length - 1;
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
                                                {totalSeat - enrolled}
                                            </Typography>
                                        </td>
                                        <td className={cls}>
                                            <Typography
                                                variant="small"
                                                className="font-[700] text-[#3a3a8fe3]">
                                                ${price}
                                            </Typography>
                                        </td>
                                        <td className={cls}>
                                            <div className="w-max">
                                                {
                                                    status === 'approved' ?
                                                        <Chip
                                                            size="sm"
                                                            variant="ghost"
                                                            value={status}
                                                            color='blue'
                                                        /> :
                                                        status === "pending" ?
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    color="amber"
                                                                    onClick={() => handleApprovement(_id, 'approved')}
                                                                >
                                                                    approve
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    color="red"
                                                                    onClick={() => handleApprovement(_id, 'declined')}
                                                                >
                                                                    decline
                                                                </Button>
                                                            </div> :
                                                            <Chip
                                                                size="sm"
                                                                variant="ghost"
                                                                value="declined"
                                                                color="red"
                                                            />
                                                }
                                            </div>
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