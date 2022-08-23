import { FC } from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import { useStyles } from "./styles";

interface IProps {
  items: { value: string; label: string }[];
  value: string;
  setValue: (value: string) => void;
}

const RadioButtonsGroup: FC<IProps> = ({ value, setValue, items }) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset" className={classes.root}>
      <RadioGroup value={value} onChange={handleChange}>
        {items?.map((item) => (
          <FormControlLabel
            value={item.value}
            control={<Radio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonsGroup;
