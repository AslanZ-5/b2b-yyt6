import React from "react";

import { useStyles } from "./style";

const SideNavigation: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} id="appSidebar">
      {children}
    </div>
  );
};

export default SideNavigation;
