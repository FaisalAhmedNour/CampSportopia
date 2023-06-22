import { useQuery } from "@tanstack/react-query";

const UseInstructors = () => {

    const { data: instructors = [], refetch } = useQuery(['instructors'], async () => {
        const res = await fetch('https://camp-sportopia-server-faisalahmednour.vercel.app/users?role=instructor')
        return res.json();
    })

    return [instructors, refetch]
};

export default UseInstructors;