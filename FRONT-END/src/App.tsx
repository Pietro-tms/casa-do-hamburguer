import { RouterProvider } from "react-router";
import { router } from "./components/router";
import { UserProvider } from "./contexts/UserContext";
import { CartItemsProvider } from "./contexts/CarItensContext";

function App() {
  return (
    <>
      <UserProvider>
        <CartItemsProvider>
          <RouterProvider router={router} />
        </CartItemsProvider>
      </UserProvider>
    </>
  );
}

export default App;
