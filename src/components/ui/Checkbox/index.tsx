import { FC } from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useStyles } from "./styles";

interface IProps {
  value: boolean;
  setValue: (value: boolean) => void;
  label?: React.ReactNode;
}

const CustomCheckbox: FC<IProps> = ({ value, setValue, label }) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      style={{ pointerEvents: "none" }}
      className={classes.checkbox}
      control={
        <Checkbox
          checked={value}
          onChange={(e) => setValue(e?.target?.checked)}
          color="default"
          style={{ pointerEvents: "auto" }}
        />
      }
      label={label}
    />
  );
};

export default CustomCheckbox;
