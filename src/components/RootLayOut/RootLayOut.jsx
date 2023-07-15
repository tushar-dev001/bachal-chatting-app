import "./RootLayOut.css";
import Grid from "@mui/material/Unstable_Grid2";
import { Link, Outlet, useLocation } from "react-router-dom";
import profile from "../../../public/profile.png";
import {
  AiFillHome,
  AiFillMessage,
  AiFillNotification,
  AiFillSetting,
  AiOutlineLogin,
} from "react-icons/ai";
import { useSelector } from "react-redux";

const RootLayOut = () => {
  const location = useLocation();
  console.log(location.pathname);

  const userData = useSelector(state => state.loggedUser.loginUser)

  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={1}>
          <div className="root-layout">
            <div className="root-container">
              <img src={profile} alt="" />

              <h4 style={{color:'#fff', marginTop:'12px'}}>{userData.displayName}</h4>

              <ul>
                <li>
                  <Link className={location.pathname === '/home' ? 'active' : 'icon'} to="home">
                    <AiFillHome  />
                  </Link>
                </li>
                <li>
                  <Link className={location.pathname === '/message' ? 'active' : 'icon'} to="message">
                    <AiFillMessage  />
                  </Link>
                </li>
                <li>
                  <Link className="icon" >
                    <AiFillNotification />
                  </Link>
                </li>
                <li>
                <Link className="icon" >
                    <AiFillSetting />
                  </Link>
                  
                </li>
                <li>
                <Link className="icon" >
                    <AiOutlineLogin/>
                  </Link>
                  
                </li>
              </ul>
            </div>
          </div>
        </Grid>
        <Grid xs={11}>
          <Outlet />
        </Grid>
        {/* <Grid xs={4}>
          xs=4
        </Grid>
        <Grid xs={8}>
          xs=8
        </Grid> */}
      </Grid>
    </div>
  );
};

export default RootLayOut;
