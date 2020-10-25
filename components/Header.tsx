import React from "react";
import { fade, makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Search from "@material-ui/icons/Search";
import { Box } from "@material-ui/core";
import { signIn, signout, useSession, getSession } from "next-auth/client";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBarRoot: {
      color: "#555555",
      width: "100%",
      border: 0,
      display: "block",

      zIndex: 1029,
      position: "absolute",
      boxShadow: "none",

      transition: "all 150ms ease 0s",
      borderBottom: 0,
      borderRadius: 3,
      marginBottom: 0,
      backgroundColor: "transparent",
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      "& > div": {
        marginTop: "0",
      },
      [theme.breakpoints.down("sm")]: {
        margin: "10px 15px !important",
        float: "none !important",
        paddingTop: "1px",
        paddingBottom: "1px",
        padding: "0!important",
        width: "60%",
        marginTop: "40px",
        "& input": {
          color: "white",
        },
      },
    },
    searchWrapper: {
      [theme.breakpoints.down("sm")]: {
        width: "-webkit-fill-available",
        margin: "10px 15px 0",
      },
      display: "inline-block",
    },

    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
      marginTop: 16,
    },
  })
);

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu anchorEl={anchorEl} id={menuId} keepMounted open={isMenuOpen} onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={signout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBarRoot}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Dashboard
          </Typography>
          <div className={classes.grow}></div>

          <div className={classes.searchWrapper}>
            <CustomInput
              formControlProps={{
                className: classes.search,
              }}
              inputProps={{
                placeholder: "Search",
                inputProps: {
                  "aria-label": "Search",
                },
              }}
            />
            <Button color="white" aria-label="edit" justIcon round>
              <Search />
            </Button>
          </div>
          <div className={classes.sectionDesktop}>
            <Box pl={1} pr={1}>
              <IconButton size="small" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary" variant="dot">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Box>
            <Box pl={1} pr={1}>
              <IconButton size="small" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Box>
            <Box pl={1} pr={1}>
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </div>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </div>
  );
}
