import { FC, useState } from "react";

import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";

import { useAppDispatch, useAppSelector } from "store";
import { setData } from "store/slices/numbers";
import { formatPhone } from "helpers/formatPhone";

import NumbersInfo from "components/base/numbers/info";
import { useStyles } from "./style";

interface IProps {
  openNumbersPage: () => void;
}

const NumbersDialog: FC<IProps> = ({ openNumbersPage }) => {
  const classes = useStyles();
  const { list } = useAppSelector((state) => state.numbers);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const checkedNumbers = list?.filter((item) => item.checked) || [];

  const uncheckNumber = (msisdn: number) => {
    if (checkedNumbers?.length === 1) openNumbersPage();
    dispatch(
      setData(
        list?.map((item) => {
          return item.msisdn === msisdn ? { ...item, checked: false } : item;
        }) || []
      )
    );
  };

  const uncheckAllNumbers = () => {
    openNumbersPage();
    dispatch(
      setData(
        list?.map((item) => {
          return { ...item, checked: false };
        }) || []
      )
    );
  };

  return (
    <>
      <Dialog
        className={classes.container}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.header}
          wrap="nowrap"
        >
          <Grid item xs={12} sm={8}>
            <NumbersInfo />
          </Grid>

          <Grid
            container
            alignItems="center"
            justify="flex-end"
            item
            xs={12}
            sm={4}
          >
            <img
              onClick={openNumbersPage}
              className={classes.dialogButton}
              src="/images/icons/open-window.svg"
              alt=""
            />
            <Box
              pl={1}
              className={classes.dialogButton}
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </Box>
          </Grid>
        </Grid>
        <Grid className={classes.listHeader} container alignItems="center">
          <Grid item xs={2}>
            <img
              onClick={uncheckAllNumbers}
              className={classes.dialogButton}
              src="/images/icons/basket.svg"
              alt=""
            />
          </Grid>
          <Grid className={classes.listItem} item xs={4}>
            Номер абонента
          </Grid>
          <Grid className={classes.listItem} item xs={6}>
            ФИО
          </Grid>
        </Grid>
        {checkedNumbers?.map((item) => (
          <Grid container alignItems="center" key={item.msisdn}>
            <Grid item xs={2}>
              <img
                className={classes.dialogButton}
                src="/images/icons/cross.svg"
                alt=""
                onClick={() => uncheckNumber(item.msisdn)}
              />
            </Grid>
            <Grid className={classes.listItem} item xs={4}>
              {formatPhone(item?.msisdn?.toString() || "")}
            </Grid>
            <Grid className={classes.listItem} item xs={6}>
              {item?.fio || ""}
            </Grid>
          </Grid>
        ))}
      </Dialog>
      <img
        className={classes.dialogButton}
        onClick={() => setOpen(true)}
        src="/images/icons/numbers-dialog-icon.svg"
        alt=""
      />
    </>
  );
};

export default NumbersDialog;
