import { Route, Routes } from "react-router-dom";
import RootLayout from "../../Layout/RootLayout";
import Dashboard from "../Dashboard/Dashboard";

export const Navigation = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Dashboard />} />
         </Route>
    </Routes>
  )
}
