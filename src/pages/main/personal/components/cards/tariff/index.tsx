import { memo, useEffect, useCallback, FC } from "react";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { fetchCurrentTariff } from "store/slices/tariffs";
import { useAppDispatch, useAppSelector } from "store";
import { MAIN_HOST } from "constants/api";
import { routes } from "constants/routes";

import RefreshBlock from "./RefreshBlock";
import { useStyles } from "./style";

interface IProps {
  setOpenTariffDialog: (open: boolean) => void;
}

const TariffCard: FC<IProps> = ({ setOpenTariffDialog }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { current } = useAppSelector((state) => state.tariffs);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchCurrentTariff());
  }, [dispatch]);

  const handleRefreshClick = useCallback(
    () => dispatch(fetchCurrentTariff()),
    [dispatch]
  );

  return (
    <Card
      className={classes.tariffCard}
      onClick={() =>
        user?.isAdmin
          ? setOpenTariffDialog(true)
          : history.push(routes.tariffs.users.own)
      }
    >
      {current.data && !current.loading ? (
        <Grid container alignItems="center" justify="space-between">
          <Grid container alignItems="center" item md={10} xs={9}>
            <img src={`${MAIN_HOST}/${current.data?.preview}`} alt="" />
            <Typography className={classes.subTitle} component="h6">
              {current.data?.name}
            </Typography>
          </Grid>
          <Grid
            container
            item
            md={2}
            xs={3}
            justify="flex-end"
            alignItems="center"
          >
            <IconButton style={{ width: 50, height: 50 }}>
              <ChevronRightIcon />
            </IconButton>
          </Grid>
        </Grid>
      ) : (
        <RefreshBlock onClick={handleRefreshClick} />
      )}
    </Card>
  );
};

export default memo(TariffCard);
