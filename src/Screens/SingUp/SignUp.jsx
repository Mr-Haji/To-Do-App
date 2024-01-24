import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AUTH } from "../../Config/FireBase/FireBase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const defaultTheme = createTheme();

export default function SignUp() {
  const Navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // console.log(firstName, lastName, email, password);

  //singUp_with_email
  const emailpasswordSignUpHandeler = async () => {
    console.log(" Check Done emailSignUpHandeler");
    try {
      await createUserWithEmailAndPassword(AUTH, email, password)
        .then((userCredential) => {
          console.log(userCredential.user.uid);
          localStorage.setItem("User", userCredential.user.uid);
          toast.success('🦄 Wow so easy!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
             pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            
            });
          Navigate("/todo");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("emailPassword==>", errorMessage);
        });
    } catch (error) {}
  };
  //singUp_with_google
  const googleSignUpHandeler = async () => {
    // console.log("Check Done googleSignUpHandeler");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(AUTH, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          Navigate("/toDo");
          console.log("user==>", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log("google==>", errorMessage);
        });
    } catch (error) {}
  };
  //singUp_with_gitHub
  const gitHubSignUpHandeler = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(AUTH, provider)
        .then((result) => {
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          Navigate("/toDo");
          console.log("user==>", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GithubAuthProvider.credentialFromError(error);
          console.log("gitHub==>", errorMessage);
        });
    } catch (error) {}
    // console.log("Check DOne gitHubSignUpHandeler");
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setlastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setemail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              onClick={emailpasswordSignUpHandeler}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              onClick={googleSignUpHandeler}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Google
            </Button>
            <Button
              onClick={gitHubSignUpHandeler}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Git Hub
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
