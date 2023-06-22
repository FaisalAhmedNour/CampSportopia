import { useQuery } from "@tanstack/react-query";

const useClasses = () => {

    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await fetch('https://camp-sportopia-server-faisalahmednour.vercel.app/classes')
        return res.json();
    })

    return [classes, refetch]
};

export default useClasses;