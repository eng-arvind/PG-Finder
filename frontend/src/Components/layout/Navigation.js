import React, {useState} from "react";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { signout, isAuth } from "../../helpers/auth";
import { useHistory } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
    "&:hover": {
      cursor: "pointer",
    },
  },
  right: {
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Navigation({location}) {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchorOpen = Boolean(anchorEl);
  const [city, setCity] = useState('');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //To be changed according to profile of Particular user
  const handleProfile = () => {
    const id = isAuth()._id;
    setAnchorEl(null);
    history.push("/profile/" + id);
  };

  const handleLogout = () => {
    signout();
    setAnchorEl(null);
    history.push("/");
  };
  
  const handleChange = (event) => {
    setCity(event.target.value);
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter'){
      history.push("/rentalpgs?city=" + city);
      window.location.reload();
      setCity("");
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" style={{ background: "#fdad5c" }}>
        <Toolbar>
          <Typography
            variant="h5"
            className={classes.title}
            onClick={() => {
              history.push("/");
            }}
          >
            PGFinder
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Enter City"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={city}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          {isAuth() ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={anchorOpen}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>My Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button
                color="inherit"
                classes={{ root: classes.right }}
                onClick={() => {
                  history.push("/login");
                }}
                startIcon={<PersonAddIcon />}
              >
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
