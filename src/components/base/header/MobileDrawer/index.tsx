import React from "react";
import { Drawer } from "@material-ui/core";

import { useStyles } from "./style";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const MobileDrawer: React.FC<IProps> = ({ open, setOpen, children }) => {
  const classes = useStyles();

  return (
    <Drawer className={classes.root} anchor="right" open={open} onClose={setOpen(false)}>
      {children}
    </Drawer>
  );
};

export default MobileDrawer;
