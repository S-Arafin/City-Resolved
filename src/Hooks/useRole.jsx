import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRole = () => {
    const { user, loading } = useContext(AuthContext);

    const { data: userRole, isLoading: isRoleLoading } = useQuery({
        queryKey: [user?.email, 'role'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/users/${user.email}`);
            return res.data;
        }
    })

    return [userRole, isRoleLoading];
};

export default useRole;