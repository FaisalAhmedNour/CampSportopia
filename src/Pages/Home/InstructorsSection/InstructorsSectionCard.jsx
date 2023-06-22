import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

export default function InstructorsSectionCard({ item }) {

    const { photo, name, email } = item;

    const { isDark } = useContext(AuthContext)

    return (
        <Card
            data-aos="zoom-out"
            className={`w-96 mx-auto ${isDark ? 'bg-[#324249]' : ''}`}
        >
            <CardHeader floated={false} className="h-80">
                <img src={photo} />
            </CardHeader>
            <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className={`mb-2 ${isDark ? 'text-[#b1b6c2]' : ''}`}>
                    {name}
                </Typography>
                <Typography color="blue" className="font-medium" textGradient>
                    {email}
                </Typography>
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