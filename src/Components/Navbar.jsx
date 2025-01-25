import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ToggleButton from "@mui/material/ToggleButton";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import { useAuth } from "../Utils/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Button onClick={handleLogout}>LOGOUT</Button>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Button onClick={toggleDrawer(true)} background-color="#ccc">
              <ToggleButton value="justify" aria-label="justified">
                <FormatAlignJustifyIcon />
              </ToggleButton>
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Project
          </Typography>
          <Button color="inherit">User</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
