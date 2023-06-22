import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSelectedClasses = (email) => {

    const { data: selectedClasses = [], refetch } = useQuery(['selectedClasses'], async () => {
        const res = await axios.get(`https://camp-sportopia-server-faisalahmednour.vercel.app/classes/selected/${email}`)
        return res.data;
    })

    return [selectedClasses, refetch]
};

export default useSelectedClasses;