import { FC } from "react";
import Grid from "@material-ui/core/Grid";

import { Office } from "types/Office";
import { useStyles } from "./styles";

interface IProps {
  offices: Office[] | null;
}

const List: FC<IProps> = ({ offices }) => {
  const classes = useStyles();

  return (
    <div className={classes.pageContainer} id="supportSalonsList">
      {offices?.map((office) => (
        <Grid
          container
          alignItems="center"
          key={office.id}
          className={classes.itemContainer}
        >
          <Grid item sm={6} xs={4}>
            <div className={classes.address}>{office?.address || ""}</div>
          </Grid>
          <Grid item sm={5} xs={7}>
            {office?.work_time?.map((timeInterval, i) => (
              <Grid key={i} container>
                <Grid item sm={6} xs={5}>
                  <div className={classes.weekDay}>{timeInterval.week_day}</div>
                </Grid>
                <Grid item sm={6} xs={7}>
                  <div className={classes.hours}>{timeInterval.hours}</div>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid container justify="flex-end" item xs={1}>
            <img src="/images/icons/location_card.svg" alt="" />
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default List;
