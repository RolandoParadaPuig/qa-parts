import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Login } from "./componets/auth/Login";
import { PrivateRoute } from "./componets/privateRoute/PrivateRoute";
import { MainLayout } from "./componets/layout/mainLayout/MainLayout";
export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
