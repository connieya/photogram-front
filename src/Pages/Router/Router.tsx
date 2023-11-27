import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Story from "../Story/Story";
import Auth from "../Auth/Auth";
import Page404 from "../Error/Page404";
import { useRecoilValue } from "recoil";
import { loginUser } from "../../recoil/user";
import EditAccountDetails from "../../components/EditAcount/EditAccountDetails";

const Router = () => {
  const location = useLocation();
  const loginUserInfo = useRecoilValue(loginUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginUserInfo.id && location.pathname !== "/login") {
      // Redirect to "/login"
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <div className="flex">
        {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        !location.pathname.startsWith("/error") ? (
          <div className="w-[20%] border border-l-slate-500 pl-10">
            <Sidebar />
          </div>
        ) : (
          ""
        )}
        <div className="w-full">
          <Routes>
            <Route path="/signup" element={<Auth />}></Route>
            <Route path="/login" element={<Auth />}></Route>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/:username" element={<Profile />}></Route>
            <Route path="/story" element={<Story />}></Route>
            <Route
              path="/account/edit"
              element={<EditAccountDetails />}
            ></Route>

            <Route path="*" element={<Navigate to="/error/404" />} />
            <Route path="/error/404" element={<Page404 />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Router;
