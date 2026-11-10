import { useContext, useState } from "react";
import { Link, useLocation } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { LogOut, ShoppingCart, Box, LayoutDashboard, Plus } from "lucide-react";
import Cart from "./Cart";
import { CartItemContext } from "../contexts/CarItensContext";

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const { user, isChecking, logout, authError, initializeAuth } =
    useContext(UserContext);
  const location = useLocation();
  const { cartItems, setCartItems } = useContext(CartItemContext);
  let cartItemsQuantity = 0;

  const getNavItemClass = (path: string) => {
    const notSelectedClass =
      "text-secondary flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-sm border-2 border-secondary md:h-[35px] md:w-[35px]";
    const selectedClass =
      "bg-secondary text-content flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-sm border-2 border-secondary md:h-[35px] md:w-[35px]";

    if (path === location.pathname) {
      return selectedClass;
    }
    return notSelectedClass;
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setLogoutError(null);
    try {
      await logout();
      setShowCart(false);
      setCartItems([]);
    } catch {
      setLogoutError("Não foi possível sair. Tente novamente.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getCartItemsQuantity = () => {
    cartItems.forEach((cartItem) => (cartItemsQuantity += cartItem.quantity));
  };

  getCartItemsQuantity();

  if (isChecking) {
    return (
      <header className="bg-header">
        <div className="shadow-header mx-auto flex w-full items-center justify-between gap-4 p-3 md:w-[737px] md:p-0">
          <img
            src="/logo-paleta.png"
            alt="Logo lanchonete"
            className="m-1 h-[43px] w-[50px] md:h-[86px] md:w-[100px]"
          />
        </div>
      </header>
    );
  }

  return (
    <header className="bg-header text-content-inverse">
      {showCart && user && <Cart setShowCart={setShowCart} />}
      <div className="mx-auto flex w-full items-center justify-between gap-4 p-3 md:w-[737px] md:p-0">
        <img
          src="/logo-paleta.png"
          alt="Logo lanchonete"
          className="m-1 h-[43px] w-[50px] md:h-[86px] md:w-[100px]"
        />
        {user ? (
          <div className="flex flex-row items-center gap-8">
            {user?.adm && (
              <div className="flex flex-row items-center gap-2">
                <Link to="/">
                  <button className={getNavItemClass("/")}>
                    <Box />
                  </button>
                </Link>

                <Link to="/pedidos">
                  <button className={getNavItemClass("/pedidos")}>
                    <LayoutDashboard />
                  </button>
                </Link>

                <button className="text-secondary flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-sm border-2 md:h-[35px] md:w-[35px]">
                  <Plus />
                </button>
              </div>
            )}

            <button
              className="text-content-inverse relative cursor-pointer"
              onClick={() => setShowCart(!showCart)}
            >
              <ShoppingCart size={18} />
              <p className="text-smq bg-secondary text-content absolute -top-3 -right-3 flex h-4 w-4 items-center justify-center rounded-2xl">
                {cartItemsQuantity}
              </p>
            </button>

            <div className="md:text-md text-md text-content-inverse flex flex-row items-center gap-2">
              <p>{user?.name}</p>{" "}
              <button
                className="flex cursor-pointer items-center disabled:cursor-wait disabled:opacity-50"
                onClick={handleLogout}
                disabled={isLoggingOut}
                aria-label={isLoggingOut ? "Saindo..." : "Sair"}
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        ) : (
          <Link to={"/login"}>
            <button className="bg-secondary text-content h-[28px] w-[101px] cursor-pointer rounded-sm md:h-[35px] md:w-[130px]">
              Entrar
            </button>
          </Link>
        )}
      </div>
      {logoutError && <p role="alert">{logoutError}</p>}
      {authError && (
        <div role="alert">
          <p>{authError}</p>
          <button type="button" onClick={() => void initializeAuth()}>
            Tentar novamente
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
