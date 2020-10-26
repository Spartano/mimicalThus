import { Box } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Search from "@material-ui/icons/Search";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import { signout } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { searchVar } from "../apollo/client";
import { useApolloClient } from "@apollo/react-hooks";
import { GET_SEARCH_STRING } from "generated/clientQueries";

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

  const client = useApolloClient();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [inputValue, setInputValue] = useState("");
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

  const handleInputChange = (e) => {
    setInputValue(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //using client cache for local storage variables
    client.cache.writeQuery({
      query: GET_SEARCH_STRING,
      data: {
        searchString: inputValue,
      },
    });
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBarRoot}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Dashboard
          </Typography>
          <div className={classes.grow}></div>

          <form className={classes.searchWrapper} onSubmit={handleSubmit} autoComplete="off">
            <CustomInput
              formControlProps={{
                className: classes.search,
              }}
              inputProps={{
                placeholder: "search ...",
                inputProps: {
                  "aria-label": "Search",
                },
                onChange: handleInputChange,
                value: inputValue,
              }}
            />
            <Button color="white" justIcon round type="submit">
              <Search />
            </Button>
          </form>
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
