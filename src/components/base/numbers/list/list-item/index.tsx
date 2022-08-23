import { FC } from "react";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";

import { MsisdnNumber } from "types/MsisdnNumber";
import { formatPhone } from "helpers/formatPhone";
import { routes } from "constants/routes";
import { useAppDispatch, useAppSelector } from "store";
import { setData } from "store/slices/numbers";
import { getMsisdnStatus } from "helpers/getMsisdnStatus";

import { useStyles as useListStyles } from "../style";


interface IProps {
  item: MsisdnNumber;
  checkboxHandler: (msisdn: number) => void;
}

const ListItem: FC<IProps> = ({ item, checkboxHandler }) => {
  const classes = useListStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.numbers);

  const openInfoPage = () => {
    dispatch(
      setData(
        list?.map((numberItem) => ({
          ...numberItem,
          checked: numberItem.msisdn === item.msisdn,
        })) || []
      )
    );
    history.push(routes.numbers.admin.info);
  };

  return (
    <Grid
      container
      wrap="nowrap"
      alignItems="center"
      className={classes.listRow}
    >
      <div className={classes.checkboxField}>
        <Checkbox
          className={classes.checkbox}
          checked={item.checked}
          onChange={() => checkboxHandler(item.msisdn)}
          color="default"
        />
      </div>
      <div className={classes.imgField}>
        <img src="/images/icons/phone.svg" alt="" />
      </div>
      <div
        className={`${classes.phoneField} ${classes.phoneFieldAdditional}`}
        onClick={openInfoPage}
      >
        <span>{formatPhone(item?.msisdn.toString()) || ""}</span>
      </div>
      <div className={classes.statusField}>{getMsisdnStatus(item?.statId || "")}</div>
      <div className={classes.fioField}>{item?.fio || ""}</div>
      <div className={classes.accountField}>{item?.account || ""}</div>
      <div className={classes.tariffField}>{item?.tariffName || ""}</div>
      <div className={classes.simField}>{item?.icc || ""}</div>
    </Grid>
  );
};

export default ListItem;
