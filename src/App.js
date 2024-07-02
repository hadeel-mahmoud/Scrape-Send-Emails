import "./App.css";
import { Header } from "./components/Header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SendEmails } from "./pages/Send/SendEmails";
import { SrapeEmails } from "./pages/Scrape/ScrapeEmails";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<SrapeEmails />} />
          <Route path="/sendEmails" element={<SendEmails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
