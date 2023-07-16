import { Button } from "@mui/material";
import "./GroupList.css";
import g1 from "../../../../public/g1.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from 'react-toastify';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const groupData = {
  groupName: "",
  groupTagline: "",
};

const GroupList = () => {
  const [groupInfo, setGroupInfo] = useState(groupData);
  const [groupsDetails, setGroupsDetails] = useState([]);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const db = getDatabase();
  const notify  = toast();

  const userData = useSelector((state) => state.loggedUser.loginUser);

  const handleCreateGroupChange = (e) => {
    setGroupInfo({
      ...groupInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleGroupSubmit = () => {
    setLoader(true);
    set(push(ref(db, "groups/")), {
      groupInfoName: groupInfo.groupName,
      groupInfoTagline: groupInfo.groupTagline,
      groupAdminName: userData.displayName,
      groupAdminId: userData.uid,
    }).then(() => {
        toast("New Group Create!")
      setLoader(false);
      setOpen(false);
    });

    setGroupInfo({
      ...groupInfo,
      groupName: "",
      groupTagline: "",
    });
  };

  useEffect(() => {
    const groupsRef = ref(db, "groups/");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());
        if (userData.uid !== item.val().groupAdminId) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setGroupsDetails(arr);
    });
  }, []);

  return (
    <div className="box">
      <h3 className="title">
        Group List
        <Button variant="contained" onClick={handleOpen} className="btn">
          Create Group
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Group
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                onChange={handleCreateGroupChange}
                name="groupName"
                id="standard-basic"
                label="Group Name"
                variant="standard"
                value={groupInfo.groupName}
              />{" "}
              <br />
              <TextField
                onChange={handleCreateGroupChange}
                name="groupTagline"
                margin="normal"
                id="standard-basic"
                label="Group Tagline"
                variant="standard"
                value={groupInfo.groupTagline}
              />
              <br />
              <br />
              {loader ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Button  onClick={handleGroupSubmit} variant="contained" color="secondary">
                  Create
                </Button>
              )}
            </Typography>
          </Box>
        </Modal>
      </h3>

      {groupsDetails.map((groupDetails) => (
        <>
          <div className="list">
            <div className="img">
              <img src={g1} alt="" />
            </div>
            <div className="details">
              <h4 className="group-name">{groupDetails.groupInfoName}</h4>
              <p className="group-title">{groupDetails.groupInfoTagline}</p>
            </div>
            <div className="button">
              <Button variant="contained" className="btn">
                Join
              </Button>
            </div>
          </div>
        </>
      ))}
    </div>
    // <>
    //   {/* <div className="box">
    //     <h3 className="title">
    //       <Heading title="Group List" />
    //       <Btn title="Create Group" />
    //     </h3>

    //     <div className="btn-btn">
    //       <User />
    //       <div className="button">
    //         <Btn title="Join" />
    //       </div>
    //     </div>
    //   </div> */}
    // </>
  );
};

export default GroupList;
