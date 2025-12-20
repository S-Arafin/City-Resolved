import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);

  // DEBUG: Check if Auth is done loading
  // console.log("Auth Loading:", loading, "User:", user?.email);

  const { data: role, isLoading: isRoleLoading } = useQuery({
    queryKey: [user?.email, "role"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      console.log("Fetching role for:", user.email);
      const res = await axios.get(`http://localhost:3000/users/${user.email}`);
      console.log("Role received from DB:", res.data?.role);
      return res.data?.role;
    },
  });

  return [role, isRoleLoading];
};

export default useRole;
