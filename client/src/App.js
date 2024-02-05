import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Todos from "./components/Todos";

// TODO create a pages and layout not only components
const App = () => {
  return (
    <main className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/todos" element={<Todos />} />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
