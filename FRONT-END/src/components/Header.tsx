import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { LogOut, ShoppingCart, Box, LayoutDashboard, Plus } from "lucide-react";
import Cart from "./Cart";

const Header = () => {
  const [isChecking, setIschecking] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  const getNavItemClass = (path: string) => {
    const notSelectedClass =
      "text-secondary flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-sm border-2 border-[#F2DAAC] md:h-[35px] md:w-[35px]";
    const selectedClass =
      "bg-secondary text-primary flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-sm border-2 border-[#F2DAAC] md:h-[35px] md:w-[35px]";

    if (path === location.pathname) {
      return selectedClass;
    }
    return notSelectedClass;
  };

  const handleUserAuth = async () => {
    try {
      const response = await fetch("http://localhost:3000/me", {
        credentials: "include",
      });

      if (!response.ok) {
        setIschecking(false);
        return;
      }

      const data = await response.json();

      setUser(data);
      setIschecking(false);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        return;
      }

      setUser(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUserAuth();
  }, []);

  if (isChecking) {
    return (
      <header className="bg-primary">
        <div className="mx-auto flex w-full items-center justify-between gap-4 p-3 md:w-[737px] md:p-0">
          <img
            src="./logo.png"
            alt="Logo lanchonete"
            className="m-1 h-[43px] w-[50px] md:h-[86px] md:w-[100px]"
          />
        </div>
      </header>
    );
  }

  return (
    <header className="bg-primary">
      {showCart && <Cart setShowCart={setShowCart}/>}
      <div className="mx-auto flex w-full items-center justify-between gap-4 p-3 md:w-[737px] md:p-0">
        <img
          src="./logo.png"
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

                <button className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-sm border-2 text-[#F2DAAC] md:h-[35px] md:w-[35px]">
                  <Plus />
                </button>
              </div>
            )}

            <button className="relative cursor-pointer text-white" onClick={() => setShowCart(!showCart)}>
              <ShoppingCart size={18} />
              <p className="absolute -top-3 -right-3 flex h-4 w-4 items-center justify-center rounded-2xl bg-[#F2DAAC] text-[#161410]">
                1
              </p>
            </button>

            <div className="md:text-md flex flex-row items-center gap-2 text-md text-white">
              <p>{user?.name}</p>{" "}
              <button className="flex cursor-pointer items-center">
                <LogOut size={18} onClick={() => handleLogout()} />
              </button>
            </div>
          </div>
        ) : (
          <Link to={"/login"}>
            <button className="bg-secondary h-[28px] w-[101px] cursor-pointer rounded-sm md:h-[35px] md:w-[130px]">
              Entrar
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
