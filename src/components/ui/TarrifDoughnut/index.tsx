import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./style";

interface IProps {
  width: number;
  title?: string;
  data: {
    labels?: Array<string>;
    datasets: Array<{
      data: Array<number>;
      backgroundColor: Array<string>;
      hoverBackgroundColor?: Array<string>;
    }>;
  };
  content?: JSX.Element;
  className?: string;
  onClick?: () => void | null;
}

const TarrifDoughnut: React.FC<IProps> = ({
  width,
  data,
  content,
  title,
  className,
  onClick,
}) => {
  const classes = useStyles();
  const [cutoutPercentage, setCutoutPercentage] = useState(75);
  const handleMouseOver = () => {
    setCutoutPercentage(60);
  };

  const handleMouseOut = () => {
    setCutoutPercentage(75);
  };

  return (
    <div
      className={className}
      style={{ width: width }}
      onClick={onClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Grid
        container
        item
        alignItems="center"
        justify="center"
        style={{ position: "relative" }}
      >
        <Doughnut
          data={data}
          width={100}
          height={100}
          options={{
            hoverBackgroundColor: "red",
            aspectRatio: 1,
            cutoutPercentage: cutoutPercentage,
            hover: { mode: null },
            tooltips: {
              enabled: false,
            },
            legend: {
              display: false,
            },
          }}
        />
        {content}
      </Grid>
      {title && <Typography className={classes.title}>{title}</Typography>}
    </div>
  );
};

export default TarrifDoughnut;
