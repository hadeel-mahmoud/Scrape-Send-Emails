import "./App.css";
import { Header } from "./components/Header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SendEmails } from "./pages/Send/SendEmails";
import { SrapeEmails } from "./pages/Scrape/ScrapeEmails";
import { useEffect, useRef, useState } from "react";
import { getCommunities } from "./services/services";
import { UnsubscribefromEmail } from "./pages/UnsubscribefromEmail/UnsubscribefromEmail";

function App() {
  const [communitiesData, setCommunitiesData] = useState(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      const fetchCommunities = async () => {
        try {
          const payload = await getCommunities();
          setCommunitiesData(payload.data);
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
      {communitiesData ? (
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
            <Route
              path="/unsubscribeFromEmails/:id"
              element={<UnsubscribefromEmail />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      ) : null}
    </div>
  );
}

export default App;
