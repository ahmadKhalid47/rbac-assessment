// components/LogoutButton.tsx
import { useState } from "react";
import api from "utils/api";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await api.post("/api/logout");
      console.log(response);

      if (response.status === 200) {
        window.location.href = "/login";
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      console.log("An error occurred while logging out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      class="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded focus:outline-none"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
