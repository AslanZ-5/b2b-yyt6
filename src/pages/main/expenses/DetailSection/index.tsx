import { FC, useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { MAIN_HOST } from "constants/api";
import { useStyles } from "./style";

interface DetailSectionProps {
  name: string;
  sum: string;
  date: string;
  description: string;
  timestamp: string;
  type: string;
  img: string;
  origin?: string;
}

const DetailSection: FC<DetailSectionProps> = ({
  name,
  sum,
  date,
  timestamp,
  type,
  img,
  description,
}) => {
  const classes = useStyles();
  const [src, setSrc] = useState("/images/icons/rub.svg");

  useEffect(() => {
    setSrc(MAIN_HOST + img);
  }, [img]);

  const onError = () => {
    setSrc("/images/icons/rub.svg");
  };

  return (
    <>
      <Grid item>
        <Typography component="h6" className={classes.sectionTitle}>
          {date}
        </Typography>
        <Grid container justify="space-between">
          <Grid item sm={1}>
            <div>
              <img
                width={50}
                height={50}
                src={src}
                onError={onError}
                alt="cost"
              />
            </div>
          </Grid>
          <Grid item sm={6}>
            <Typography className={classes.topText}>{name}</Typography>
            <Grid className={classes.bottomText}>{description}</Grid>
          </Grid>
          <Grid item sm={5}>
            <Grid className={classes.topText} container justify="flex-end">
              {type === "payments" ? `+${sum}` : +sum ? `-${sum}` : sum} ₽
            </Grid>
            <Grid className={classes.bottomText} container justify="flex-end">
              {timestamp}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <hr className={classes.detailSectionDivider} />
    </>
  );
};

export default DetailSection;
