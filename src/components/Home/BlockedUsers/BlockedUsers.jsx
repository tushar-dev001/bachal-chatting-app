import { Alert, Button } from "@mui/material";
import g1 from '../../../../public/g1.png'
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const BlockedUsers = () => {
    const db = getDatabase()
    const [blockUsers, setBlockUsers] = useState([])
    const notify  = toast();
    const userData = useSelector((state) => state.loggedUser.loginUser);

    useEffect(()=>{
        const blockRef = ref(db, 'block')
        onValue(blockRef, (snapshot)=>{
            const arr = [];
            snapshot.forEach((item)=>{
                arr.push({...item.val(), id: item.key})
               
            })
            setBlockUsers(arr)
        })
    },[])

    const handleUnblock =(Unblock)=>{
        toast("This User is Unblocked!")
        remove(ref(db, 'block'))
    }


  return (
    <div className='box'>
        <h3 className='title'>
            Block User
        </h3>

        {blockUsers.length > 0 
        ?
        blockUsers.map((user)=>(

            <>
                <div className="list">
                <div className="img">
                    <img src={g1} alt="" />
                </div>
                <div className="details">
                    {user.whoBlockedSendId == userData.uid
                    ?
                    <h4 className='group-name'>{user.whoBlockReceivedName}</h4>
                    :
                    <h4 className='group-name'>{user.whoBlockedSendName}</h4>
                    }
                    <p className='group-title'>Hi Guys, Wassup!</p>
                </div>
                <div className="button">
                    {user.whoBlockedSendId == userData.uid &&
                    <Button onClick={()=>handleUnblock(user.id)} variant="contained" color="success" className='btn'>Unblock</Button>
                    }
                </div>
            </div>
            </>
            ))
        :
        <Alert style={{ fontSize: "20px" }} severity="info">
          No Block User Available!
        </Alert>
        }
        
    </div>
  );
};

export default BlockedUsers;
