import { Helmet } from "react-helmet";
import UseInstructors from "../../../Hooks/useInstructors/useInstructors";
import InstructorsCard from "../InstructorsCard/InstructorsCard";

const Instructors = () => {

    const [instructors] = UseInstructors();

    const font = {
        fontFamily: 'Dancing Script'
    }

    return (
        <div className="mt-5 mb-10">
            <Helmet>
                <title>CampSportopia | All Instructors</title>
            </Helmet>
            <h1
                className="text-center text-6xl font-bold text-[#2d2929]"
            >What To Learn</h1>
            <h3
                style={font}
                className="text-center text-2xl font-bold text-[#efc429] mt-4 mb-5"
            >What we offer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {
                    instructors.map(item => <InstructorsCard
                        key={item._id}
                        item={item}
                    ></InstructorsCard>)
                }
            </div>
        </div>
    );
};

export default Instructors;