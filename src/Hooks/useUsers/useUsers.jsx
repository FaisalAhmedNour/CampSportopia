import { useQuery } from "@tanstack/react-query";

const UseUsers = () => {

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('https://camp-sportopia-server-faisalahmednour.vercel.app/users')
        return res.json();
    })

    return [users, refetch]
};

export default UseUsers;