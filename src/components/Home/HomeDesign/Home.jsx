import Grid from "@mui/material/Grid";
import GroupList from "../GroupList/GroupList";
import FriendRequest from "../FriendRequest/FriendRequest";
import Friends from "../Friends/Friends";
import MyGroup from "../MyGroup/MyGroup";
import BlockedUsers from "../BlockedUsers/BlockedUsers";
import UserList from "../../UserList/UserList";

const Home = () => {


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
      {/* <Button variant="contained" >
        Log Out
      </Button> */}
    </>
  );
};

export default Home;
