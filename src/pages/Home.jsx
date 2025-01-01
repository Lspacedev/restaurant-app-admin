import SideNav from "../components/Home/SideNav/SideNav";
import Main from "../components/Home/Main/Main";
import Stats from "../components/Home/Stats/Stats";
import { Outlet } from "react-router-dom";
import { useLocation, useParams } from "react-router";

function Home() {
  const { profile } = useParams();
  const location = useLocation();

  const { pathname } = location;
  return (
    <div className="Home">
      <SideNav />
      {pathname !== "/home/reservations" &&
      pathname !== "/home/history" &&
      pathname !== "/home/reviews" &&
      typeof profile === "undefined" ? (
        <Main />
      ) : (
        <Outlet />
      )}

      <Stats />
    </div>
  );
}

export default Home;
