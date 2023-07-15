import "./Login.css";
import {
  TextField,
  Modal,
  Grid,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material/";
import Heading from "../../components/Shared/Heading/Heading";
import loginImg from "../../../public/loginImg.png";
import google from "../../../public/google.png";
import { toast } from 'react-toastify';
import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {userData} from '../../slices/userSlices/UserSlices.js'


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

const initialValue = {
  email: "",
  fullName: "",
  password: "",
  // loading: ''
};

const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notify  = () => toast();

  const [values, setValues] = useState(initialValue);
  const [loader, setLoader] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleValues = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    const { email, password } = values;
    setLoader(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user.user.emailVerified);
        // setValues({
        //   ...values,
        //   password: "",
        // });
        setLoader(false);
        if(!user.user.emailVerified){
          toast ("Please Verify Email For Login")
        }else{
          dispatch(userData(user.user))
          localStorage.setItem('user', JSON.stringify(user.user))
          setTimeout(()=>{
            navigate("/home");
          },3000)
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        setError(errorCode);
        // console.log(errorCode);

        if (errorCode === "auth/wrong-password") {
          setValues({
            password: "",
          });
          // console.log("user paiche");
          setLoader(false);
        }
        if (errorCode === "auth/user-not-found") {
          setValues({
            email: "",
            password: "",
          });
          setLoader(false);
          // console.log("user paini");
        }
      });
    setLoader(false);
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      navigate('/home')
    });
  };

  const forgotEmail = () => {
    sendPasswordResetEmail(auth, text)
      .then(() => {
        navigate("/");
        console.log("email sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid h2 xs={6}>
          <div className="login-container">
            <Heading title="Login to your account!" />

            <img onClick={handleGoogleLogin} className="google" src={google} />

            <div className="reg-input">
              <TextField
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                type="email"
                onChange={handleValues}
                name="email"
                value={values.email}
              />

            </div>
              {error === 'auth/user-not-found' && (
                <Alert severity="error"> Invalid Email</Alert>
                )}
            <div className="reg-input">
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                onChange={handleValues}
                name="password"
                value={values.password}
              />

            </div>
              {error === 'auth/wrong-password' && (
                <Alert severity="error">
                 Invalid Password
                </Alert>
              )}

            {loader ? (
              <LoadingButton className="signUp-btn" loading variant="outlined">
                Submit
              </LoadingButton>
            ) : (
              <button className="signUp-btn" onClick={handleLogin}>
                Login To Continue
              </button>
            )}

            <p style={{ marginTop: "18px" }}>
              Are not have an account?{" "}
              <strong style={{ color: "blue", cursor: "pointer" }}>
                <Link to="/">Sign Up</Link>
              </strong>
            </p>

            <Button onClick={() => setOpen(true)}>Forgotten Password?</Button>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Find Your Account
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Please enter your email address or mobile number to search for
                  your account.
                </Typography>
                <div className="reg-input">
                  <TextField
                    id="outlined-basic"
                    type="email"
                    label="Email Address"
                    variant="outlined"
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
                <div style={{ marginTop: "18px" }}>
                  <button className="btn" onClick={forgotEmail}>
                    Search
                  </button>
                </div>
              </Box>
            </Modal>
          </div>
        </Grid>
        <Grid h2 xs={6}>
          <img className="loginImg" src={loginImg} />
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
