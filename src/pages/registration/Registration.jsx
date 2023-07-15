import "./Registration.css";
import { TextField, Grid, Alert } from "@mui/material";
import regImg from "../../../public/regImg.png";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";

import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate, Link } from "react-router-dom";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { toast } from "react-toastify";
import Heading from "../../components/Shared/Heading/Heading";

const initialValue = {
  email: "",
  fullName: "",
  password: "",
  // loading: 'false'
  error: "",
  eye: false,
};

const Registration = () => {
  const auth = getAuth();
  const db = getDatabase()
  const navigate = useNavigate();

  const notify = () => toast();

  const [values, setValues] = useState(initialValue);
  const [loader, setLoader] = useState();

  const handleValues = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = () => {
    const { email, fullName, password } = values;

    if (!email) {
      setValues({
        ...values,
        error: "Enter Email Address",
      });
      return;
    }

    if (!fullName) {
      setValues({
        ...values,
        error: "Enter Full Name",
      });
      return;
    }

    // let pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    // || !pattern.test(password)
    if (!password) {
      setValues({
        ...values,
        error:
          "Enter a One capital letter, One Number, One special cherecter, one small letter and something",
      });
      return;
    }
    // console.log(!password || !pattern.test(password))

    setLoader(true);
    createUserWithEmailAndPassword(auth, email, password).then((user) => {
      console.log(user);
      updateProfile(auth.currentUser, {
        displayName: values.fullName,
        photoURL:
          "https://i.ibb.co/JtFj2cC/Windows-10-Default-Profile-Picture-svg.png",
      }).then(() => {
        sendEmailVerification(auth.currentUser)
        .then(() => {

          set(ref(db, 'users/' + user.user.uid),{
            username: values.fullName,
            email: values.email,
            profile_picture: user.user.photoURL
          })
        });
      });

      setValues({
        ...values,
        email: "",
        fullName: "",
        password: "",
        error: "false",
      });
      setLoader(false);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
      toast("Registration Successfully! Please verify your email and login");
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <div className="reg-container">
            <Heading title="Get started with easily register" />
            <p className="reg-para">Free register and you can enjoy it</p>

            <div className="reg-input">
              {values.error.includes("Email") && (
                <Alert severity="error">{values.error}</Alert>
              )}
              <TextField
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                type="email"
                onChange={handleValues}
                name="email"
              />
            </div>

            <div className="reg-input">
              {values.error.includes("Name") && (
                <Alert severity="error">{values.error}</Alert>
              )}
              <TextField
                id="outlined-basic"
                label="Full Name"
                variant="outlined"
                type="text"
                onChange={handleValues}
                name="fullName"
              />
            </div>
            <div className="reg-input">
              {values.error.includes("Password") && (
                <Alert severity="error">{values.error}</Alert>
              )}
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type={values.eye ? "text" : "password"}
                onChange={handleValues}
                name="password"
              />

              <div
                className="eye"
                onClick={() => setValues({ ...values, eye: !values.eye })}
              >
                {values.eye ? <RiEyeFill /> : <RiEyeCloseFill />}
              </div>
            </div>

            {loader ? (
              <LoadingButton className="signUp-btn" loading variant="outlined">
                Submit
              </LoadingButton>
            ) : (
              <button className="signUp-btn" onClick={handleSignUp}>
                Sing Up
              </button>
            )}
            <p style={{ marginTop: "18px" }}>
              Already have an account?{" "}
              <strong style={{ color: "blue", cursor: "pointer" }}>
                <Link to="/login">Login</Link>
              </strong>
            </p>
          </div>
        </Grid>
        <Grid h2 xs={6}>
          <img className="regImg" src={regImg} />
        </Grid>
      </Grid>
    </>
  );
};

export default Registration;
