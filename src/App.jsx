import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="NavBarGap">
        <Home />
      </div>
    </div>
  );
}

export default App;
