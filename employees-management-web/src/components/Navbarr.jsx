import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function Navbarr() {

    const navigate=useNavigate()

    const token =localStorage.getItem('token')
    let handleLogout=()=>{
        localStorage.clear()
        navigate('/login')
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#E8E9EB" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="balck"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            Dashboard
          </Typography>
          {
            token?<Button className="text-black" onClick={handleLogout}>Logout</Button>:<Button color="inherit">Login</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
