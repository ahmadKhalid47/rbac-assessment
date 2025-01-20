import "./App.css";
import { useEffect } from "react";
import api from "./utils/api"
import ImageUploader from "./components/ImageUploader";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/users");
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <ImageUploader />
    </div>
  );
}

export default App;
