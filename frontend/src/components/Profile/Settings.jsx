import { useEffect, useState } from "react";
import api from "../../utils/api";
import Loader from "../Loader/Loader";

const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          "/api/v1/get-user-information",
          { headers }
        );

        setProfileData(response.data);
        setValue({ address: response.data.address || "" });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, []);

  const submitAddress = async () => {
    try {
      const response = await api.put(
        "/api/v1/update-address",
        Value,
        { headers }
      );

      console.log(response);
      alert("Address updated successfully!");
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address.");
    }
  };

return (
  <>
    {!ProfileData ? (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    ) : (
      <div
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/da/c6/40/dac640d0334d6a84d08b9138562fa2e7.jpg')",
        }}
      >
        <div className="min-h-screen bg-black/60 p-4 md:p-8 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-100 mb-8
          text-center">
            Settings
          </h1>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div>
              <label>Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {ProfileData.username}
              </p>
            </div>

            <div>
              <label>Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {ProfileData.email}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col">
            <label>Address</label>

            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows="5"
              placeholder="Address"
              name="address"
              value={Value.address}
              onChange={change}
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-700 transition-all duration-300"
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);

};

export default Settings;