
import {
    Card,
    Typography,
    CardBody,
    Avatar,
    Button,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import useSelectedClasses from "../../Hooks/useSelectedClasses/useSelectedClasses";
import { Helmet } from "react-helmet";

const TABLE_HEAD = ["Image", "Course Name", "Instructor Info", "Available Sits", "Price", "Action"];

export default function SelectedClasses() {

    const { user } = useContext(AuthContext);

    const [selectedClasses, refetch] = useSelectedClasses(user.email)

    const sweetAlert = message => {
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

    const handleDelete = id => {
        axios.post(`https://camp-sportopia-server-faisalahmednour.vercel.app/classes/delete/${user?.email}`, {
            classId: id,
        })
            .then(res => {
                // console.log(res.data.modifiedCount)
                if (res.data.modifiedCount)
                    sweetAlert('Successfully deleted!!!')
                refetch()
            })
    }

    const handlePayment = id => {
        axios.post(`https://camp-sportopia-server-faisalahmednour.vercel.app/users/paid/${user?.email}`, {
            classId: id,
        })
            .then(res => {
                // console.log(res.data)
                if (res.data === 'Already enrolled!') {
                    sweetAlert('You already paid for this class!!!')
                }
                else {
                    sweetAlert('Successfully Paid!!!')
                }
                refetch()
            })
    }

    return (
        <Card className="h-full w-full">
            <Helmet>
                <title>CampSportopia | Selected Classes</title>
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
                        {selectedClasses.map(
                            ({ _id, imglink, name, email, totalSeat, enrolled, instructor, price }, index) => {
                                const isLast = index === selectedClasses.length - 1;
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
                                            <div className="w-max flex gap-2">
                                                {/* <Link to={`/dashboard/payment/${_id}`}> */}
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    color="amber"
                                                    onClick={() => handlePayment(_id)}
                                                >
                                                    Pay
                                                </Button>
                                                {/* </Link> */}
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    color="red"
                                                    onClick={() => handleDelete(_id)}
                                                >
                                                    delete
                                                </Button>
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