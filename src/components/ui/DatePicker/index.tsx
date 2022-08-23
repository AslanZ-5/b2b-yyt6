import { FC, ReactNode } from "react";
import FormControl from "@material-ui/core/FormControl";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";

import { useStyles } from "./styles";

interface IProps {
  label?: string;
  readOnly?: boolean;
  value: Date | null;
  setValue: (date: Date | null) => void;
  error?: boolean;
  helperText?: ReactNode;
  minDate?: Date;
}

const CustomDatePicker: FC<IProps> = ({ label, minDate, readOnly, value, setValue, error = false, helperText = ""}) => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <FormControl className={`${classes.formControl}`} variant="outlined">
        <DatePicker
          className={classes.root}
          disablePast
          format="dd.MM.yyyy"
          autoOk
          label={label}
          clearable
          value={value}
          onChange={setValue}
          DialogProps={{ className: classes.dialog }}
          InputProps={{
            endAdornment: (
              <img
                src="/images/icons/calendar.svg"
                alt=""
                style={{ paddingRight: 4 }}
              />
            ),
          }}
          readOnly={readOnly}
          error={error}
          helperText={helperText}
          minDate={minDate}
        />
      </FormControl>
    </MuiPickersUtilsProvider>
  );
};

export default CustomDatePicker;
