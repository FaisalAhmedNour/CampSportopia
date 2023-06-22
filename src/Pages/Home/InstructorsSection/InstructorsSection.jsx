import { Link } from "react-router-dom";
import UseInstructors from "../../../Hooks/useInstructors/useInstructors";
import InstructorsSectionCard from "./instructorsSectionCard";
import { Button } from "@material-tailwind/react";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const InstructorsSection = () => {

    const [instructors] = UseInstructors();
    const topInstructors = instructors.slice(0, 6);
    // console.log(topInstructors[0].photo);
    const {isDark} = useContext(AuthContext)

    const font = {
        fontFamily: 'Dancing Script'
    }

    return (
        <div className="mb-10 text-center max-w-screen-2xl mx-auto">
            <h1 className="text-5xl mb-5 text-center font-bold text-[#2d2929]">Top Instructors</h1>
            <h3
                style={font}
                className="text-center text-2xl font-bold text-[#efc429] mt-4 mb-5"
            >Choose Yours Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {
                    topInstructors.map(item => <InstructorsSectionCard
                        key={item._id}
                        item={item}
                    ></InstructorsSectionCard>)
                }
            </div>
            <Link to='/instructors'>
                <Button 
                variant="filled" 
                size="lg" 
                    className={` ${isDark ? 'bg-[#3a2b2b]' : 'bg-[#5b9a42]'}  hover:bg-[#f2682a] mb-10 rounded-full mt-10`}
                >View All Instructors</Button>
            </Link>
        </div>
    );
};

export default InstructorsSection;