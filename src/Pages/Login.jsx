import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/AuthContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("email : ", email, "password : ", password);

      if (email === "" || password === "") {
        throw new Error("Email and Password are required !!");
      }

      await login(email, password);
      console.log("Success !!");
      navigate("/StudentPage");
    } catch (error) {
      setErrorMessage(error.message);
      console.log("Fail !!", errorMessage);
    }
    console.log({
      email: email,
      password: password,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </Container>
  );
}
