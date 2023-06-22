
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import useEnrolledClasses from "../../Hooks/useEnrolledClasses/useEnrolledClasses";
import EnrolledClassCard from "./EnrolledClassesCard";
import { Helmet } from "react-helmet";

export default function EnrolledClasses() {

    const { user } = useContext(AuthContext);

    const [enrolledClasses] = useEnrolledClasses(user.email)

    return (
        <div className="grid grid-cols-2">
            <Helmet>
                <title>CampSportopia | Enrolled Classes</title>
            </Helmet>
            {
                enrolledClasses.map(item => <EnrolledClassCard
                    key={item._id}
                    item={item}
                ></EnrolledClassCard>)
            }
        </div>
    );
}