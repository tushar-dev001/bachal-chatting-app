// import {Button} from '@mui/material';
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import GroupList from "../GroupList/GroupList";
import FriendRequest from "../FriendRequest/FriendRequest";
import Friends from "../Friends/Friends";
import MyGroup from "../MyGroup/MyGroup";
import BlockedUsers from "../BlockedUsers/BlockedUsers";
import UserList from "../../UserList/UserList";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const loginUser = useSelector((state) => state.loggedUser.loginUser);
  // const loginUser = useSelector((state) => console.log(state.loggedUser));

  useEffect(() => {
    if (loginUser === null) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, []);

  const handleLogout = () => {
    if (loginUser !== null) {
      signOut(auth)
        .then(() => {
          console.log("Logout successful");
          localStorage.removeItem("user");
          navigate("/login");
        })
        .catch((error) => console.log(error));
      console.log(auth);
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <GroupList />
          <FriendRequest />
        </Grid>
        <Grid item xs={4}>
          <Friends />
          <MyGroup />
        </Grid>
        <Grid item xs={4}>
          <UserList />
          <BlockedUsers />
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleLogout}>
        Log Out
      </Button>
    </>
  );
};

export default Home;
