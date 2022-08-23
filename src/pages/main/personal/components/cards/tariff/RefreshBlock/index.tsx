import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./style";
import clsx from "clsx";

interface IProps {
  onClick: () => void;
}

const RefreshBlock: React.FC<IProps> = ({ onClick }) => {
  const classes = useStyles();
  const [rotate, setRotate] = useState(false);
  const icon = clsx({
    [classes.refreshBlockIconRotate]: rotate,
  });

  const handleClick = () => {
    setRotate(true);
    onClick();
  };

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.refreshBlock}
      onClick={handleClick}
    >
      <Grid container item alignItems="center">
        <Typography display="inline" className={classes.refreshBlockText}>
          Обновить
        </Typography>
        <div className={classes.refreshBlockIconWrapper}>
          <img
            className={icon}
            onAnimationEnd={() => {
              setRotate(false);
            }}
            src="/images/icons/tariff-refresh-icon.svg"
            alt="tariff-refresh-icon"
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default RefreshBlock;
