import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";

export default function ClassesSectionCard({ item }) {

    const { imglink, name } = item;

    const bgImage = {
        backgroundImage: `url(${imglink})`
    }

    const {isDark } = useContext(AuthContext)

    return (
        <Card
            data-aos="zoom-in"
            shadow={false}
            className="relative grid h-[30rem] w-full max-w-[25rem] items-end mx-auto justify-center overflow-hidden text-center"
        >
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                style={bgImage}
                className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center`}
            >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-14 px-6 md:px-12">
                <Typography variant="h3" className="mb-4 text-gray-400">
                    {name}
                </Typography>
                <Link to='/all-classes'>
                    <Button variant="outlined" color={`${isDark ? '' : 'white'}`} className="hover:bg-[#f2682a]">Select now</Button>
                    </Link>
            </CardBody>
        </Card>
    );
}