import "./RootLayOut.css";
import Grid from "@mui/material/Unstable_Grid2";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import profile from "../../../public/profile.png";
import {
  AiFillHome,
  AiFillMessage,
  AiFillNotification,
  AiFillSetting,
  AiOutlineLogin,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-toastify';

const RootLayOut = () => {
  const location = useLocation();
  console.log(location.pathname);
  const navigate = useNavigate();
  const auth = getAuth();
  const notify  = toast();

  const userData = useSelector(state => state.loggedUser.loginUser)

  const handleLogout = () => {
    if (userData !== null) {
      signOut(auth)
        .then(() => {
          console.log("Logout successful");
          localStorage.removeItem("user");
          toast("Logout successfully!")
          navigate("/login");
        })
        .catch((error) => console.log(error));
      console.log(auth);
    }
  };

  // useEffect(()=>{
  //   if(userData == null){
  //     navigate('/login')
  //     return
  //   }
  // })

  useEffect(() => {
    if (userData === null) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, []);

  if(userData == null){
    return
  }

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
                <Link onClick={handleLogout} className="icon" >
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
