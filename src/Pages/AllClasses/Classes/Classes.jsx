import { Helmet } from "react-helmet";
import UseClasses from "../../../Hooks/useClasses/useClasses";
import ClassCard from "../ClassCard/ClassCard";

const Classes = () => {

    const [classes, refetch] = UseClasses();
    const approvedClasses = classes.filter(item => item.status === 'approved')

    const font = {
        fontFamily: 'Dancing Script'
    }

    return (
        <div className="mt-10">
            <Helmet>
                <title>CampSportopia | All Classes</title>
            </Helmet>
            <h1
                className="text-center text-6xl font-bold text-[#2d2929]"
            >What To Learn</h1>
            <h3
                style={font}
                className="text-center text-2xl font-bold text-[#efc429] mt-4"
            >What we offer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    approvedClasses.map(item => <ClassCard
                        key={item._id}
                        item={item}
                        refetch={refetch}
                    ></ClassCard>)
                }
            </div>
        </div>
    );
};

export default Classes;