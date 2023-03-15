import { Route, Routes } from "react-router-dom";
import { PageLayout } from "./components/PageLayout";
import Home from "./pages/Home";
import People from "./pages/People";
import Starships from "./pages/Starships";
import Vehicles from "./pages/Vehicles";
import Species from "./pages/Species";
import Planets from "./pages/Planets";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/people" element={<PageLayout />}>
        <Route index element={<People />} />
      </Route>
      <Route path="/starships" element={<PageLayout />}>
        <Route index element={<Starships />} />
      </Route>
      <Route path="/vehicles" element={<PageLayout />}>
        <Route index element={<Vehicles />} />
      </Route>
      <Route path="/species" element={<PageLayout />}>
        <Route index element={<Species />} />
      </Route>
      <Route path="/planets" element={<PageLayout />}>
        <Route index element={<Planets />} />
      </Route>
    </Routes>
  );
}

export default App;
