import { FC } from "react";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";

import { useStyles } from "./style";

interface IProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  buttonHandler?: () => void;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  additionalStyles?: any;
}

const Search: FC<IProps> = ({
  value,
  setValue,
  placeholder,
  buttonHandler,
  startAdornment,
  endAdornment,
  additionalStyles,
}) => {
  const classes = useStyles();
  return (
    <FormControl
      className={`${classes.formControl} ${
        additionalStyles?.formControl || ""
      }`}
      variant="outlined"
    >
      <OutlinedInput
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className={classes.input}
        name="number"
        startAdornment={
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        }
        onKeyDown={(e) =>
          e.keyCode === 13 && buttonHandler ? buttonHandler() : null
        }
        placeholder={placeholder}
        inputProps={{
          autocomplete: 'new-password'
        }}
      />
    </FormControl>
  );
};

export default Search;
