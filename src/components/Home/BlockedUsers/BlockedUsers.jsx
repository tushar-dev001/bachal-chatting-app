import { Button } from "@mui/material";
import g1 from '../../../../public/g1.png'
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const BlockedUsers = () => {
    const db = getDatabase()
    const [blockUsers, setBlockUsers] = useState([])
    const userData = useSelector((state) => state.loggedUser.loginUser);

    useEffect(()=>{
        const blockRef = ref(db, 'block')
        onValue(blockRef, (snapshot)=>{
            const arr = [];
            snapshot.forEach((item)=>{
                console.log(item);
                if(userData.uid == item.val().whoBlockedSendId){

                    arr.push({
                        id: item.key,
                        whoBlockReceivedName: item.val().whoBlockReceivedName,
                        whoBlockReceivedId: item.val().whoBlockReceivedId,
                    })
                }else{
                    arr.push({
                        id: item.key,
                        whoBlockSendName: item.val().whoBlockSendName,
                        whoBlockSendId: item.val().whoBlockSendId

                    })
                }
            })
            setBlockUsers(arr)
            console.log(blockUsers);
        })
    },[])


  return (
    <div className='box'>
        <h3 className='title'>
            Block User
        </h3>

        {blockUsers.map((user)=>(

        <>
            <div className="list">
            <div className="img">
                <img src={g1} alt="" />
            </div>
            <div className="details">
                <h4 className='group-name'>{user.whoBlockReceivedName}</h4>
                <h4 className='group-name'>{user.whoBlockSendName}</h4>
                <p className='group-title'>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
            <Button variant="contained" className='btn'>Join</Button>
            </div>
        </div>
        </>
        ))}
    </div>
  );
};

export default BlockedUsers;
