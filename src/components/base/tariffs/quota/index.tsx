import { FC } from "react";

import Grid from "@material-ui/core/Grid";

import { Quota } from "types/Quota";

import { useStyles } from "./style";
import { useAppSelector } from "store";

interface IProps {
  quota: Quota;
  additionalStyles?: any;
}

const TariffQuota: FC<IProps> = ({ quota, additionalStyles }) => {
  const classes = useStyles();
  const { appInfo } = useAppSelector((state) => state.app);

  const label =
    appInfo?.categories?.units?.find((unit) => +unit.id === +quota.unit_id)
      ?.name || "";
  return (
    <Grid container alignItems="center" justify="flex-start" wrap="nowrap">
      <Grid item>
        <img
          className={`${classes.mainImg} ${additionalStyles?.mainImg || ""}`}
          src={`/images/quotas/${quota.type}.svg`}
          alt=""
        />
      </Grid>
      <Grid container alignItems="center" item>
        <div className={`${classes.cost} ${additionalStyles?.cost || ""}`}>
          {+quota.value === -1 ? (
            <img src="/images/icons/endless.svg" alt="endless" />
          ) : (
            quota.value
          )}
        </div>
        {+quota.value === -1 ? (
          ""
        ) : (
          <div className={classes.label}>{label}</div>
        )}
      </Grid>
    </Grid>
  );
};

export default TariffQuota;
