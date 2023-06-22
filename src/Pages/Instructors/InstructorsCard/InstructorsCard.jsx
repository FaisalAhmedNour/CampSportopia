import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import useClasses from "../../../Hooks/useClasses/useClasses";

export default function InstructorsCard({ item }) {

    const { photo, name, email } = item;
    const [classes] = useClasses();
    const myClass = classes.filter(cls => cls.instructor === name)

    return (
        <Card className="w-96 mx-auto">
            <CardHeader floated={false} className="h-80">
                <img src={photo} />
            </CardHeader>
            <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    {name}
                </Typography>
                <Typography color="blue" className="font-medium" textGradient>
                    {email}
                </Typography>
                <div>
                    <p>
                        <span>Number of classes: {myClass.length}</span>
                    </p>
                    {
                        myClass.map(item => <button
                        className="bg-[#4040b6] text-white rounded-full text-sm px-4 mx-1"
                            key={item._id}
                        >{item.name}</button>)
                    }
                </div>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
                <Tooltip content="Like">
                    <Typography
                        as="a"
                        href="#facebook"
                        variant="lead"
                        color="blue"
                        textGradient
                    >
                        <i className="fab fa-facebook" />
                    </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                    <Typography
                        as="a"
                        href="#twitter"
                        variant="lead"
                        color="light-blue"
                        textGradient
                    >
                        <i className="fab fa-twitter" />
                    </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                    <Typography
                        as="a"
                        href="#instagram"
                        variant="lead"
                        color="purple"
                        textGradient
                    >
                        <i className="fab fa-instagram" />
                    </Typography>
                </Tooltip>
            </CardFooter>
        </Card>
    );
}