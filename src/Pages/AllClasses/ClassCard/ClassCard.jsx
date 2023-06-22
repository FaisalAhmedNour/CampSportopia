
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    CardFooter,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ClassCard({ item }) {

    const [isAdmin, setIsAdmin] = useState(false)
    const [isInstructor, setIsInstructor] = useState(false)
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://camp-sportopia-server-faisalahmednour.vercel.app/users/${user?.email}`)
            .then(res => {
                res.data?.role === 'admin' ? setIsAdmin(true) : res.data?.role === 'instructor' ? setIsInstructor(true) : '';
            })
    }, [user])

    const { _id, imglink, name, totalSeat, enrolled, instructor, price } = item;
    const availableSits = totalSeat - enrolled;

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

    const handleSelection = () => {
        if (!user) {
            console.log(user)
            navigate('/login')
            return;
        }
        axios.post(`https://camp-sportopia-server-faisalahmednour.vercel.app/users/selected/${user?.email}`, {
            classId: _id,
        })
            .then(res => {
                if (res.data === 'Already exists') {
                    sweetAlert('You already selected this class!!!')
                }
                else {
                    sweetAlert('Successfully selected!!!')
                }
            })
    }

    return (
        <Card className={`w-96 mx-auto my-10 ${availableSits ? '' : "bg-[#ff0000c5]"}`}>
            <CardHeader shadow={false} floated={false} className="h-80">
                <img
                    src={imglink}
                    className="w-full h-full object-cover"
                />
            </CardHeader>
            <CardBody>
                <div className="grid grid-cols-2 items-center justify-between mb-2 space-y-2">
                    <Typography
                        color="blue-gray"
                        className={`font-bold text-xl ${availableSits ? '' : 'text-white'}`}
                    >
                        {name}
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className={`font-bold text-end text-xl ${availableSits ? '' : 'text-white'}`}
                    >
                        ${price}
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className={`font-semibold text-center col-span-2 ${availableSits ? '' : 'text-white'}`}
                    >
                        <span className="font-semibold">Instructor: </span>
                        {instructor}
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className={`font-semibold text-center col-span-2 ${availableSits ? '' : 'text-white'}`}
                    >
                        <span className="font-semibold">Available sits: </span>
                        {availableSits}
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <Button
                    ripple={false}
                    fullWidth={true}
                    onClick={handleSelection}
                    disabled={!availableSits || isAdmin || isInstructor}
                    className={`bg-[#5b9a42] hover:bg-[#3b49c4cb] text-white shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100 ${availableSits ? '' : 'bg-[#c08b77] text-white'}`}
                >
                    Select
                </Button>
            </CardFooter>
        </Card>
    );
}