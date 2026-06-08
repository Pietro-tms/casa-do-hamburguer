import { RouterProvider } from "react-router";
import { router } from "./components/router";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <>
    <UserProvider>
     <RouterProvider router={router} />
   </UserProvider>
    </>
  );
}

export default App;
