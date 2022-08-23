import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';

import { useStyles } from "./style";

interface IProps {
  tabs: Array<{ name: string; id: any }>;
  value: any;
  handleChangeTabs: (event: React.ChangeEvent<{}>, newValue: any) => void;
  style?: object;
}

const CustomMultipleTabs: React.FC<IProps> = ({ tabs, value, handleChangeTabs, style }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Tabs
          style={style}
          classes={{
            indicator: classes.indicator,
          }}
          className={classes.tabs}
          value={value}
          onChange={handleChangeTabs}
          variant="scrollable"
          scrollButtons="on"
          >
            {tabs.map((t) => (
              <Tab key={t.id} value={t.id} label={t.name} />
            ))}
        </Tabs>
      </AppBar>
    </div>
  );
};

export default CustomMultipleTabs;
