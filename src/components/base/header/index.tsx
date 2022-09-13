import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import IconButton from "@material-ui/core/IconButton";
import Fade from "@material-ui/core/Fade";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import InfoDialog from "components/ui/InfoDialog";
import NavTabs from "components/base/nav-tabs";

import { useAppSelector, useAppDispatch } from "store";
import { setLoading, fetchUser } from "store/slices/user";
import { useLogout } from "hooks/useLogout";
import { useForm } from "hooks/useForm";
import { formatPhone1 } from "helpers/formatPhone";

import AddAccountDialog from "./dialogs/add-account";
import MobileDrawer from "./MobileDrawer";
import { useStyles } from "./style";
import OtpDialog from "./dialogs/otp";

const Header: React.FC = () => {
  const classes = useStyles();
  const { logoutFromAll, logoutFromCurrent } = useLogout();
  const history = useHistory();
  const { user, accounts } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [number, setNumber] = useState<string>("");
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showExitAccountDialog, setShowExitAccountDialog] = useState(false);
  const [exitPopper, setExitPopper] = useState(false);
  const [showAddAccountDialog, setShowAddAccountDialog] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const {
    values,
    handleInputValue,
    errors,
    formIsValid,
    clearFields,
    clearField,
  } = useForm({
    initialValues: { login: "", password: "" },
    rules: {
      login: {
        required: true,
        pattern: /^([0-9]{3})\s([0-9]{3})\s([0-9]{2})\s([0-9]{2})+$/,
      },
      password: { required: true, pattern: /^[a-zA-Z0-9@*#]{8,15}$/ },
    },
  });

  const drawerHandler = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  const openExitPopper = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setExitPopper((prev) => !prev);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value) {
      const newUser = accounts.find(
        (user) => user.msisdn === event.target.value
      );
      if (newUser) {
        dispatch(setLoading(true));
        dispatch(fetchUser(newUser?.token, newUser?.refresh_token));
      } else {
        logoutFromAll();
      }
    }
  };

  const closeDrawer = useCallback(() => setOpenDrawer(false), []);
  const closeExitDialog = useCallback(() => setShowExitDialog(false), []);
  const closeExitAccountDialog = useCallback(
    () => setShowExitAccountDialog(false),
    []
  );
  const openExitDialog = useCallback(() => {
    setExitPopper(false);
    setShowExitDialog(true);
  }, []);
  const openExitAccountDialog = useCallback(() => {
    setExitPopper(false);
    setShowExitAccountDialog(true);
  }, []);

  useEffect(() => {
    if (user?.msisdn) setNumber(`+7${user?.msisdn}`);
  }, [user?.msisdn]);

  useEffect(() => {
    if (showAddAccountDialog) {
      clearFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddAccountDialog]);

  return (
    <>
      <div hidden={!user}>
        <InfoDialog
          type="error"
          show={showExitDialog}
          title="Вы действительно хотите выйти из всех аккаунтов?"
          handleClose={closeExitDialog}
          upButton={{
            text: "Да",
            callback:() => {
              logoutFromAll();
              closeExitDialog();
            },
          }}
          downButton={{
            callback: closeExitDialog,
          }}
        />
        <InfoDialog
          type="error"
          title="Вы уверены, что хотите выйти из аккаунта?"
          description={`+7${user?.msisdn}`}
          show={showExitAccountDialog}
          handleClose={closeExitAccountDialog}
          upButton={{
            text: "Да",
            callback: () => {
              logoutFromCurrent();
              closeExitAccountDialog();
            },
          }}
          downButton={{
            callback: closeExitAccountDialog,
          }}
        />
        <AddAccountDialog
          open={showAddAccountDialog}
          setOpen={setShowAddAccountDialog}
          showOtpDialog={setShowOtpDialog}
          formValues={{
            values,
            handleInputValue,
            errors,
            formIsValid,
            clearField,
          }}
        />
        <OtpDialog
          open={showOtpDialog}
          setOpen={setShowOtpDialog}
          showAddAccountDialog={setShowAddAccountDialog}
          login={values.login}
        />
        <MobileDrawer open={openDrawer} setOpen={drawerHandler}>
          <NavTabs
            handleOpenExitDialog={openExitDialog}
            closeDrawer={closeDrawer}
          />
        </MobileDrawer>
        <div className={classes.headerContainer} id="appHeaderContainer">
          <div className={classes.root} id="appHeader">
            <AppBar elevation={0} position="static">
              <Grid container justify="center">
                <Grid container item xs={11} lg={9}>
                  <Toolbar className={classes.toolbar}>
                    <Grid container alignItems="center">
                      <Grid item xs={6} sm={2}>
                        <img
                          style={{ cursor: "pointer" }}
                          onClick={() => history.push("/")}
                          src="/images/logo.svg"
                          alt="logo"
                          id="appLogo"
                        />
                      </Grid>
                      <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        item
                        xs={6}
                        sm={10}
                      >
                        <div className={classes.companyName} id="companyName">
                          {user?.orgName || ""}
                        </div>
                        <div
                          style={{ display: "flex", alignItems: "center" }}
                          id="accountsSelect"
                        >
                          <Select
                            MenuProps={{
                              anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "center",
                              },
                              transformOrigin: {
                                vertical: "top",
                                horizontal: "center",
                              },
                              getContentAnchorEl: null,
                            }}
                            renderValue={(value: any) => <span>{value}</span>}
                            IconComponent={KeyboardArrowDownIcon}
                            className={classes.phoneNumberSelect}
                            value={number}
                            onChange={handleChange}
                          >
                            {accounts?.map((user) => (
                              <MenuItem
                                key={user.msisdn}
                                className={classes.selectItem}
                                value={user.msisdn}
                              >
                                +7{user.msisdn}
                                <Typography className={classes.selectSubTitle}>
                                  {user.full_name}
                                </Typography>
                              </MenuItem>
                            ))}

                            <MenuItem
                              onClick={() => setShowAddAccountDialog(true)}
                              className={classes.lastSelectItem}
                              value={number}
                            >
                              + Добавить аккаунт
                            </MenuItem>
                          </Select>

                          <Button
                            onClick={openExitPopper}
                            className={classes.exitBtn}
                            variant="contained"
                            id="logoutButton"
                          >
                            <img src="/images/icons/logout.svg" alt="logout" />
                          </Button>
                          <Popper
                            open={exitPopper}
                            anchorEl={anchorEl}
                            placement="bottom"
                            transition
                            className={classes.logoutPopper}
                          >
                            {({ TransitionProps }) => (
                              <ClickAwayListener
                                onClickAway={() => setExitPopper(false)}
                              >
                                <Fade {...TransitionProps} timeout={350}>
                                  <ul className={classes.exitMenu}>
                                    <li
                                      onClick={openExitAccountDialog}
                                      className={classes.exitMenuItem}
                                      id="logoutFromCurrentAccount"
                                    >
                                      <Typography>
                                        Выйти из текущего аккаунта
                                      </Typography>
                                      <Typography>
                                        {user?.msisdn
                                          ? formatPhone1(user?.msisdn || "")
                                          : ""}
                                      </Typography>
                                    </li>
                                    <li
                                      className={classes.exitMenuItem}
                                      id="logoutFromAllAccount"
                                    >
                                      <Button
                                        onClick={openExitDialog}
                                        className={classes.textBtn}
                                      >
                                        Выйти из всех аккаунтов
                                      </Button>
                                    </li>
                                  </ul>
                                </Fade>
                              </ClickAwayListener>
                            )}
                          </Popper>
                          <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            onClick={() => setOpenDrawer((prev) => !prev)}
                          >
                            {!openDrawer && <MenuIcon />}
                            {openDrawer && <CloseIcon />}
                          </IconButton>
                        </div>
                      </Grid>
                    </Grid>
                  </Toolbar>
                </Grid>
              </Grid>
            </AppBar>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
