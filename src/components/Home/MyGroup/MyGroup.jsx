import { Alert, Button } from "@mui/material";
import g1 from "../../../../public/g1.png";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

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

const MyGroup = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

      {groupsInfo.length > 0 ? (
        groupsInfo.map((groupAdmin) => (
          <>
            <div className="list">
              <div className="img">
                <img src={g1} alt="" />
              </div>
              <div className="details">
                <p style={{fontSize:'14px'}}> Admin:{groupAdmin.groupAdminName}</p>
                <h4 className="group-name">{groupAdmin.groupInfoName}</h4>
                <p className="group-title">{groupAdmin.groupInfoTagline}</p>
              </div>
              <div className="button">
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  className="btn"
                >
                  Info
                </Button>
                {/* Modal start */}
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Member Request
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {/* List items start */}
                      <List
                        sx={{
                          width: "100%",
                          maxWidth: 360,
                          bgcolor: "background.paper",
                        }}
                      >
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar
                              alt="Remy Sharp"
                              src="/static/images/avatar/1.jpg"
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                              <>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  Ali Connors
                                </Typography>
                                {
                                  " — I'll be in your neighborhood doing errands this…"
                                }
                              </>
                            }
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </List>
                      {/* List items end */}
                    </Typography>
                  </Box>
                </Modal>
                {/* Modal end */}
              </div>
            </div>
          </>
        ))
      ) : (
        <Alert style={{ fontSize: "20px" }} severity="info">
          No Groups Available!
        </Alert>
      )}
    </div>
  );
};

export default MyGroup;
