import React, { FC, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Tabs, Tab, Button } from "@material-ui/core";
import { useAppSelector } from "store";
import { getTabsList } from "./tabs";
import { useStyles } from "./style";

interface NavTabsProps {
  handleOpenExitDialog?: any;
  closeDrawer?: any;
}

const NavTabs: FC<NavTabsProps> = ({ handleOpenExitDialog, closeDrawer }) => {
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAppSelector((state) => state.user);

  const currentTab = getTabsList(user?.isAdmin || false).findIndex(
    (el) => el.path === `/${location.pathname.split("/")[1]}`
  );

  const [showServicesSubtabs, setShowServicesSubtabs] = useState(false);
  const [tab, setTabs] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabs(newValue);
    if (closeDrawer) {
      closeDrawer();
    }
  };

  const handleExitButtonClick = (event: React.ChangeEvent<{}>) => {
    handleOpenExitDialog();
    if (closeDrawer) {
      closeDrawer();
    }
  };

  useEffect(() => {
    setTabs(currentTab === -1 ? 0 : currentTab);
  }, [currentTab]);

  return (
    <>
      <Tabs
        classes={{
          indicator: classes.indicator,
        }}
        orientation="vertical"
        variant="scrollable"
        value={tab}
        onChange={handleChange}
        className={classes.tabs}
        id="navigationTabs"
      >
        {getTabsList(user?.isAdmin || false).map((tab) => (
          <div className={classes.tabContainer} key={tab.label}>
            <Tab
              icon={
                <img
                  color="red"
                  src={
                    location.pathname === tab.path ||
                    location.pathname.indexOf(tab.path) !== -1
                      ? tab.activeIcon
                      : tab.icon
                  }
                  alt="icon"
                />
              }
              label={
                <div>
                  {tab.label}{" "}
                  {user?.isAdmin && tab?.subPaths?.length && (
                    <img
                      className={`${classes.tabPointer} ${
                        showServicesSubtabs ? classes.rotateImg : ""
                      }`}
                      src="/images/icons/tab-pointer.svg"
                      alt=""
                      onClick={() =>
                        tab?.subPaths?.length && user?.isAdmin
                          ? setShowServicesSubtabs(!showServicesSubtabs)
                          : history.push(tab.path)
                      }
                    />
                  )}
                </div>
              }
              className={`${
                location.pathname === tab.path ||
                location.pathname.indexOf(tab.path) !== -1
                  ? classes.activeTab
                  : ""
              }`}
              onClick={() =>
                tab?.subPaths?.length && user?.isAdmin
                  ? setShowServicesSubtabs(!showServicesSubtabs)
                  : history.push(tab.path)
              }
            />
            {user?.isAdmin && tab?.subPaths?.length && showServicesSubtabs ? (
              <div className={classes.subTabs}>
                {tab?.subPaths?.map((subTab) => (
                  <Tab
                    className={`${
                      location.pathname === subTab.path ? classes.activeTab : ""
                    }`}
                    label={subTab.label}
                    onClick={() => history.push(subTab.path)}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </Tabs>
      <Button
        onClick={handleExitButtonClick}
        className={classes.exitBtn}
        id="navigationLogout"
      >
        <img src="/images/icons/logout.svg" alt="logout" /> Выйти
      </Button>
    </>
  );
};

export default NavTabs;
