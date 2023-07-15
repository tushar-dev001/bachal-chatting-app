import { Alert, Button } from "@mui/material";
import "./Friends.css";
import g1 from '../../../../public/g1.png'
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Friends = () => {
    const [friends, setFriends] = useState([])
    const db = getDatabase()

    const userData = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        const friendRequestRef = ref(db, "friends");
        onValue(friendRequestRef, (snapshot) => {
          const arr = [];
          snapshot.forEach((item) => {
            if (item.val().whoSendId == userData.uid || item.val().whoReceivedId == userData.uid)
             {
              arr.push({...item.val(), id: item.key});
            }
          });
          setFriends(arr);
        });
      }, []);

      const handleBlock =(block)=>{
        userData.uid === block.whoSendId
        ?
        set(push(ref(db, 'block')),{
            whoBlockReceivedId: block.whoReceivedId,
            whoBlockReceivedName: block.whoReceivedName,
            whoBlockedSendId: block.whoSendId,
            whoBlockedSendName: block.whoSendName,

        }).then(()=>{
            remove(ref(db, 'friends' ))
        })
        :
        set(push(ref(db, 'block')),{
            whoBlockReceivedId: block.whoSendId, 
            whoBlockReceivedName: block.whoSendName,
            whoBlockedSendId: block.whoReceivedId,
            whoBlockedSendName:block.whoReceivedName, 
        }).then(()=>{
            remove(ref(db, 'friends'))
        })

      }



  return (
    <div className='box'>
        <h3 className='title'>
            Friends
        </h3>

        {friends.length > 0
        ?
        friends.map(friend =>(
            <>
                <div className="list">
                <div className="img">
                    <img src={g1} alt="" />
                </div>
                <div className="details">
                    {friend.whoReceivedId === userData.uid
                    ?
                    <h4 className='group-name'>{friend.whoSendName}</h4>
                    :
                    <h4 className='group-name'>{friend.whoReceivedName}</h4>
                    }
                    <p className='group-title'>Hi Guys, Wassup!</p>
                </div>
                <div className="button">
                <Button onClick={()=>handleBlock(friend)} variant="contained" >Block</Button>
                <div className="btn-btn"><Button variant="contained">Unfriend</Button></div>
                </div>
            </div>
            </>
            ))
        :
        <Alert style={{ fontSize: "20px" }} severity="info">
          No Friends Available!
        </Alert>
        }
    </div>
  );
};

export default Friends;
