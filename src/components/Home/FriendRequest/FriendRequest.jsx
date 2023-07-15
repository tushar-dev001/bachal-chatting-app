import "./FriendRequest.css";
import { Alert, Button } from "@mui/material";
import g1 from "../../../../public/g1.png";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const [friendRequestList, setFriendRequestList] = useState([]);
  const db = getDatabase();

  const userData = useSelector((state) => state.loggedUser.loginUser);

  //firebase theke friendRequest niye ese kar sathe k friend ache seita unojayi friend request list a show korbe.
  useEffect(() => {
    const friendRequestRef = ref(db, "friendrequest");
    onValue(friendRequestRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        // console.log(item.val().whoReceivedId);
        // console.log(userData.uid);
        if (userData.uid == item.val().whoReceivedId) {
          arr.push({...item.val(), id: item.key});
        }
      });
      setFriendRequestList(arr);
      console.log(friendRequestList);
    });
  }, []);

  //friend request reject part
  const handleReject =(reject)=>{
    console.log(reject);
    remove(ref(db, "friendrequest/" + reject));
  }

  //friend request accept part
  const handleAccept =(accept)=>{
    console.log(accept);
    set(push(ref(db, 'friends/')),{
        ...accept,
    })
    .then(()=>{
        remove(ref(db, "friendrequest/" + accept.id));
    })
  }

  return (
    <div className="box">
      <h3 className="title">Friend Request</h3>

      {friendRequestList.length > 0 ? (
        friendRequestList.map((friendRequest) => (
          <>
            <div className="list">
              <div className="img">
                <img src={g1} alt="" />
              </div>
              <div className="details">
                <h4 className="group-name">{friendRequest.whoSendName}</h4>
                <p className="group-title">Hi Guys, Wassup!</p>
              </div>
              <div className="button">
                <Button onClick={()=>handleAccept(friendRequest)} variant="contained" className="btn">
                  Accept
                </Button>
                <Button
                  style={{ marginLeft: "12px" }}
                  variant="contained"
                  className="btn"
                  onClick={()=>handleReject(friendRequest.id)}
                >
                  Reject
                </Button>
              </div>
            </div>
          </>
        ))
      ) : (
        <Alert style={{ fontSize: "20px" }} severity="info">
          No Friend Request Available!
        </Alert>
      )}
    </div>
  );
};

export default FriendRequest;
