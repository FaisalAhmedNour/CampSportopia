import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useEnrolledClasses = (email) => {

    const { data: enrolledClasses = [], refetch } = useQuery(['enrolledClasses'], async () => {
        const res = await axios.get(`https://camp-sportopia-server-faisalahmednour.vercel.app/classes/enrolled/${email}`)
        return res.data;
    })

    return [enrolledClasses, refetch]
};

export default useEnrolledClasses;