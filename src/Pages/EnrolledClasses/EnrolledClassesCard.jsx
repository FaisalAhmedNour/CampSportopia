
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    CardFooter,
} from "@material-tailwind/react";

export default function EnrolledClassCard({ item }) {

    const { imglink, name, totalSeat, enrolled, instructor, email, price } = item;
    const availableSits = totalSeat - enrolled;

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
                        className={`font-bold text-xl`}
                    >
                        {name}
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className={`font-bold text-end text-xl`}
                    >
                        ${price}
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className={`font-semibold text-center col-span-2`}
                    >
                        <span className="font-semibold">Instructor: </span>
                        {instructor}
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className={`font-semibold text-center col-span-2`}
                    >
                        <span className="font-semibold">Instructor&apos;s email: </span>
                        {email}
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <Button
                    ripple={false}
                    fullWidth={true}
                    className={`bg-[#5b9a42] hover:bg-[#3b49c4cb] text-white shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100`}
                >
                    Enrolled
                </Button>
            </CardFooter>
        </Card>
    );
}