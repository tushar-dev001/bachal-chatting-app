import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import { Alert, Button } from "@mui/material";
import g1 from "../../../public/g1.png";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

const UserList = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [userLists, setUserLists] = useState([]);
  const [friendRequeset, setFriendRequeset] = useState([]);
  const [friends, setFriends] = useState([]);
  const [block, setBlock] = useState([]);

  const notify  = toast();
  // console.log(userLists);
  const userData = useSelector((state) => state.loggedUser.loginUser);

  //firebase theke users ke niye asteche.
  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userData.uid !== item.key) {
          arr.push({ ...item.val(), id: item.key });
        }
      });

      setUserLists(arr);
    });
  }, []);

  //firebase theke friendRequest ke niye ese ke kake request pathacche seita unojayi cancle r panding button set korteche.
  useEffect(() => {
    const userRef = ref(db, "friendrequest/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().whoReceivedId + item.val().whoSendId);
        // console.log(item.val().whoReceivedId + item.val().whoSendId)
      });
      setFriendRequeset(arr);
    });
  }, []);

  //firebase theke friends ke niye asa hoiche user er button er likha ta friends kore deoar jonno.
  useEffect(() => {
    const userRef = ref(db, "friends/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().whoReceivedId + item.val().whoSendId);
        // console.log(item.val().whoReceivedId + item.val().whoSendId)
      });
      setFriends(arr);
    });
  }, []);

  //firebase theke block ke niye asa hoicne button er likha ta block korar jonno.
  useEffect(() => {
    const blockRef = ref(db, "block/");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().whoBlockReceivedId + item.val().whoBlockedSendId);
      });
      setBlock(arr);
    });
  }, []);

  //kon user er profile kon user er friend request jacche seyta set korteche.
  const handleFriendRequest = (friendRequest) => {
    // console.log("kake pathaiche", friendRequest.id);
    // console.log("k pathaiche", auth.currentUser.uid);
    // console.log(friendRequeset);

    set(ref(db, "friendrequest/" + friendRequest.id), {
      whoSendId: auth.currentUser.uid,
      whoSendName: auth.currentUser.displayName,
      whoReceivedId: friendRequest.id,
      whoReceivedName: friendRequest.username,
    }).then(()=>{
      toast("Friend Request Successfully!")
    })
  };

  //friend request cancle korteche.
  const handleCancle = (cancleRequest) => {
    console.log(cancleRequest);
    toast("Cancel Friend Request")
    remove(ref(db, "friendrequest/" + cancleRequest.id));
  }

  return (
    <div className="box">
      <h3 className="title">User List</h3>

      {userLists.length > 0 ? (
        userLists.map((user, index) => (
          <>
            <div key={index} className="userBtn">
              <div className="list">
                <div className="img">
                  <img src={g1} alt="" />
                </div>
                <div className="details">
                  <h4 className="group-name">{user.username}</h4>
                  <p className="group-title">{user.email}</p>
                </div>

                <div className="button">
                  {friendRequeset.includes(user.id + auth.currentUser.uid) ? (
                    <Button
                      onClick={() => handleCancle(user)}
                      variant="contained"
                      color="secondary"
                      className="btn"
                    >
                      Cancle
                    </Button>
                  ) : friendRequeset.includes(
                      auth.currentUser.uid + user.id
                    ) ? (
                    <Button color="secondary" variant="contained" className="btn">
                      Panding
                    </Button>
                  ) : friends.includes(user.id + auth.currentUser.uid) ||
                    friends.includes(auth.currentUser.uid + user.id) ? (
                    <Button variant="contained" color="success" className="btn">
                      Friend
                    </Button>
                  ) : block.includes(user.id + auth.currentUser.uid) ||
                    block.includes(auth.currentUser.uid + user.id) ? (
                    <Button
                      variant="contained"
                      color="error"
                      className="btn"
                    >
                      Block
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleFriendRequest(user)}
                      variant="contained"
                      className="btn"
                    >
                      Add
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>
        ))
      ) : (
        <Alert style={{ fontSize: "20px" }} severity="info">
          No Users Available!
        </Alert>
      )}
    </div>
  );
};

export default UserList;
