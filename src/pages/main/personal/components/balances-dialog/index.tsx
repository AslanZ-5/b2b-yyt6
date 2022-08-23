import { FC } from "react";

import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import Balances from "components/base/balances";
import { useStyles } from "./styles";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const BalancesDialog: FC<IProps> = ({ open, setOpen }) => {
  const classes = useStyles();

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      open={open}
      keepMounted
      onClose={() => setOpen(false)}
    >
      <IconButton onClick={() => setOpen(false)} className={classes.closeBtn}>
        <CloseIcon />
      </IconButton>
      <Balances />
    </Dialog>
  );
};

export default BalancesDialog;
