import { Carousel, Typography, Button } from "@material-tailwind/react";
import Timer from "./Timer";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

export default function Banner() {

    const font = {
        fontFamily: 'Dancing Script'
    }

    const { isDark } = useContext(AuthContext)

    return (
        <Carousel className="rounded-xl">
            {/* slide 1 */}
            <div className="relative h-full w-full">
                <img
                    src="https://www.imgacademy.com/sites/default/files/img-academy-college-recruiting-hero.jpg"
                    alt="image 1"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                    <div className="w-3/4 text-center md:w-2/4">
                        <Typography
                            variant="lead"
                            color="white"
                            className="opacity-80 text-xl md:text-2xl lg:text-3xl"
                            style={font}
                        >
                            The best
                        </Typography>
                        <Typography
                            variant="lead"
                            color="white"
                            className=" opacity-80 text-4xl md:text-5xl lg:text-7xl xl:text-8xl"
                        >
                            Summer Camp
                        </Typography>
                        <Typography
                            variant="lead"
                            color="white"
                            className="mb-8 opacity-80 text-xl md:text-2xl lg:text-3xl"
                            style={font}
                        >
                            starts in
                        </Typography>
                        <Timer></Timer>
                        <div className="flex justify-center gap-2">
                            <Link to='/all-classes'>
                                <Button
                                    color="red"
                                    className={`rounded-3xl mt-10 md:text:md lg:text-lg ${isDark ? " text-[#b6b6be] bg-[#3a2b2b]" : "text-white bg-[#f44336]"}`}
                                >
                                    enroll now
                                </Button></Link>
                            {/* <Button size="lg" color="white" variant="text">
                                Gallery
                            </Button> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* slide 2 */}
            <div className="relative h-full w-full">
                <img
                    src="https://www.imgacademy.com/sites/default/files/23-home-page-group-team.jpg"
                    alt="image 2"
                    className="h-full w-full object-cover"
                />
                {/* TODO: animation & font style */}
                <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                    <div className="w-3/4 text-center md:w-2/4">
                        <Typography
                            variant="h1"
                            color="white"
                            
                            className="mb-2 md:mb-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl opacity-80"
                        >
                            <span
                                data-aos="fade-right"
                                data-aos-duration="5000"
                            >MAKE YOUR SUMMER</span>
                        </Typography>
                        <Typography
                            variant="lead"
                            color="white"
                            data-aos="fade-up"
                            className="mb-12 opacity-80 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold"
                            style={font}
                        >
                            Unforgotable!
                        </Typography>
                        <div className="flex gap-2 justify-center">
                            <Button size="lg" className={`rounded-3xl  ${isDark ? "text-[#b6b6be] bg-[#3a2b2b]" : "text-white bg-[#f44336]"}`}>
                                Enroll Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* slide 3 */}
            <div className="relative h-full w-full">
                <img
                    src="https://www.imgacademy.com/sites/default/files/img-academy-camp-landing-review.jpg"
                    alt="image 3"
                    className="h-full w-full object-cover"
                />
                {/* TODO: animation & font style */}
                <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                    <div className="w-3/4 text-center md:w-2/4">
                        <Typography
                            variant="h1"
                            color="white"
                            data-aos="fade-right"
                            className="mb-2 md:mb-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl opacity-80"
                        >
                            MAKE YOUR SUMMER
                        </Typography>
                        <Typography
                            variant="lead"
                            color="white"
                            style={font}
                            data-aos="fade-up"
                            className="mb-12 opacity-80 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold"
                        >
                            Unforgotable!
                        </Typography>
                        <div className="flex gap-2 justify-center">
                            <Button size="lg" className={`rounded-3xl  ${isDark ? "text-[#b6b6be] bg-[#3a2b2b]" : "text-white bg-[#f44336]"}`}>
                                Enroll Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </Carousel>
    );
}