import { Button } from "@mui/material";
import g1 from "../../../../public/g1.png";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

const MyGroup = () => {
  const [groupsInfo, setGroupsInfo] = useState([]);
  const db = getDatabase();

  const userData = useSelector((state) => state.loggedUser.loginUser);

  useEffect(() => {
    const groupsRef = ref(db, "groups/");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        // console.log(item.val());
        if (userData.uid == item.val().groupAdminId) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setGroupsInfo(arr);
      console.log(groupsInfo);
    });
  }, []);

  return (
    <div className="box">
      <h3 className="title">My Group</h3>

      {groupsInfo.map((groupAdmin) => (
        <>
          <div className="list">
            <div className="img">
              <img src={g1} alt="" />
            </div>
            <div className="details">
              <h4 className="group-name">{groupAdmin.groupInfoName}</h4>
              <p className="group-title">{groupAdmin.groupInfoTagline}</p>
            </div>
            <div className="button">
              <Button variant="contained" className="btn">
                Info
              </Button>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default MyGroup;
