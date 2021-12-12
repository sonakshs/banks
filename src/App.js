import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import BankList from "./components/BankList";
import BankDetails from "./components/BankDetails";
import Favorites from "./components/Favorites";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/"  element={<BankList/>} />
          <Route path="/all-banks" element={<BankList/>} />
          <Route path="/favorites" element={<Favorites/>} />
          <Route path="/bank-details/:ifsc" element={<BankDetails/>}/>
        </Routes>
    </Router>
    </div>
  );
}


export default App;
