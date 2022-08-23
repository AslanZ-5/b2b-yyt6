import { FC, ChangeEvent } from "react";
import Slider from "@material-ui/core/Slider";

import { useStyles } from "./style";

interface IProps {
  max: number;
  onChange: (event: ChangeEvent<{}>, value: number | number[]) => void;
  marks: { value: number }[];
  value: number;
}

const TariffSlider: FC<IProps> = ({ max, value, onChange, marks }) => {
  const classes = useStyles();
  return (
    <div style={{ position: "relative" }}>
      <Slider
        onChange={onChange}
        className={classes.root}
        marks={marks}
        value={value}
        step={null}
        min={0}
        max={max}
      />
    </div>
  );
};

export default TariffSlider;
