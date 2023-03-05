import reactLogo from "./assets/react.svg";
import "./default.scss";

import Header from "./components/Header";
import Homepage from "./pages/Homepage";

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Homepage />
      </div>
    </div>
  );
};

export default App;
