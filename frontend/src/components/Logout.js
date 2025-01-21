// components/LogoutButton.tsx
import { useState } from "react";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        // Redirect to home or login page after successful logout
        window.location.href = "/login";
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred while logging out");
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
