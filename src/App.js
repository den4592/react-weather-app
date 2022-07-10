import Weather from "./Weather";
import "./App.css";
import img from "./img/nature_img.jpg";

function App() {
  return (
    <div className="App" style={{ backgroundImage: `url("${img}")` }}>
      <Weather />
    </div>
  );
}

export default App;
