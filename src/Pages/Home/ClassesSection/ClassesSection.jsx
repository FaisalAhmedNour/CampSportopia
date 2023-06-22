
import { Link } from "react-router-dom";
import UseClasses from "../../../Hooks/useClasses/useClasses";
import ClassesSectionCard from "./ClassesSectionCard";
import { Button } from "@material-tailwind/react";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const ClassesSection = () => {

    const [classes] = UseClasses()
    // console.log(classes)

    classes.sort((a, b) => b.enrolled - a.enrolled);
    const topClasses = classes.slice(0, 6);
    const {isDark} = useContext(AuthContext)

    const font = {
        fontFamily: 'Dancing Script'
    }

    return (
        <div className="text-center mb-10 max-w-screen-2xl mx-auto">
            <h1
                className="text-5xl mt-20 mb-5 text-center font-bold text-[#2d2929]"
            >Top Classes</h1>
            <h3
                style={font}
                className="text-center text-2xl font-bold text-[#efc429] mt-4 mb-5"
            >Choose Yours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
                {
                    topClasses.map(item => <ClassesSectionCard
                        key={item._id}
                        item={item}
                    ></ClassesSectionCard>)
                }
            </div>
            <Link to='/all-classes'>
                <Button
                    variant="filled"
                    size="lg"
                    className={` ${isDark ? 'bg-[#3a2b2b]' : 'bg-[#5b9a42]'}  hover:bg-[#f2682a] mb-20 rounded-full`}
                >View All Classes</Button>
            </Link>
        </div>
    );
};

export default ClassesSection;