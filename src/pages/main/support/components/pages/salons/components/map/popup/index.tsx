import React from "react";
import Grid from "@material-ui/core/Grid";
import { Popup } from "react-leaflet";

import { useStyles } from "./style";

interface CustomPopupProps {
  address: string;
  work_time: Array<{
    week_day: string;
    hours: string;
  }>;
}

const CustomPopup: React.FC<CustomPopupProps> = ({ address, work_time }) => {
  const classes = useStyles();

  return (
    <Popup className={classes.popup}>
      <Grid className={classes.popupContent}>
        <div className={classes.popupAddress}>{address}</div>
        {work_time.map((workInterval, index) => (
          <Grid container key={index}>
            <Grid item sm={4}>
              <div className={classes.popupDay}>{workInterval.week_day}</div>
            </Grid>
            <Grid item sm={8}>
              <div className={classes.popupHours}>{workInterval.hours}</div>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Popup>
  );
};

export default CustomPopup;
