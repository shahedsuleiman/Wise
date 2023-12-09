import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "../../dashboard/src/pages/Dashboard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
