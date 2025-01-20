import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <div className="App">
      <header className="App-header">none</header>
    </div>
  );
}

export default App;
