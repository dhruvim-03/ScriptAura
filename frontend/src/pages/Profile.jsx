import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";


const Loader = () => (
  <div className="flex items-center justify-center min-h-screen text-white">
    Loading...
  </div>
);
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          "/api/v1/get-user-information",
          { headers }
        );

        setProfile(response.data);
      } catch (err) {
        console.error("Profile Fetch Error:", err);

        if (err.response?.status === 403) {
          setError("Unauthorized. Please login again.");
        } else {
          setError("Failed to load profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error || !profile) {
    return (
      <div className="bg-zinc-900 min-h-screen flex items-center justify-center text-red-500 text-xl">
        {error || "Failed to load profile. Please try logging in again."}
      </div>
    );
  }
return (
  <div className="bg-zinc-900 min-h-screen py-8 px-4 md:px-8">
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full lg:w-[22%] xl:w-[20%]">
        <Sidebar data={profile} />
      </div>
      {/* Main Content */}
      <div className="w-full lg:flex-1">
        <Outlet />
      </div>
    </div>
  </div>
);

};

export default Profile;