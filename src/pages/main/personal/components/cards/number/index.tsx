import { useState, FC } from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { useAppSelector } from "store";

import InvoiceDialog from "./new-invoice";
import { useStyles } from "./style";

const NumberCard: FC = () => {
  const classes = useStyles();
  const { user } = useAppSelector((state) => state.user);
  const [openInvoiceDialog, setOpenInvoiceDialog] = useState(false);

  return (
    <>
      <InvoiceDialog open={openInvoiceDialog} setOpen={setOpenInvoiceDialog} />
      <div className={classes.wrapper}>
        <Grid container justify="space-between" alignItems="center">
          <div className={classes.label}>Лицевой счет</div>
          <div className={classes.value}>{user?.account || ""}</div>
        </Grid>
        <Grid container justify="space-between" alignItems="center">
          <div className={classes.label}>Контракт</div>
          <div className={classes.value}>{user?.contractNumber || ""}</div>
        </Grid>
        {user?.isAdmin ? (
          <Button
            className={classes.accountBtn}
            onClick={() => setOpenInvoiceDialog(true)}
          >
            Сформировать счет
          </Button>
        ) : null}
      </div>
    </>
  );
};

export default NumberCard;
