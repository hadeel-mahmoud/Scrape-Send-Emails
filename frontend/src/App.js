import "./App.css";
import { Header } from "./components/Header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SendEmails } from "./pages/Send/SendEmails";
import { SrapeEmails } from "./pages/Scrape/ScrapeEmails";
import { useEffect, useRef } from "react";
import { getCommunities } from "./services/services";

function App() {
  const communitiesData = [
    { category: "Podcasts", URLs: ["www.google.com"] },
    { category: "Skool", URLs: [] },
    { category: "Sororities", URLs: [] },
  ];
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      const fetchCommunities = async () => {
        try {
          const data = await getCommunities();
          console.log(data);
        } catch (error) {
          throw error;
        }
      };
      fetchCommunities();
      isFirstRender.current = false;
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<SrapeEmails communitiesData={communitiesData} />}
          />
          <Route
            path="/sendEmails"
            element={<SendEmails communitiesData={communitiesData} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
