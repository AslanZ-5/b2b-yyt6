import { FC, ReactNode } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";
import { useStyles } from "./styles";

interface IProps {
  label?: string;
  value: Date | null;
  setValue: (date: Date | null) => void;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  maxDateMessage?: ReactNode;
  minDateMessage?: ReactNode;
}

const MonthPicker: FC<IProps> = ({
  value,
  setValue,
  label,
  disabled = false,
  minDate,
  maxDate,
  maxDateMessage = "",
  minDateMessage = "",
}) => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <DatePicker
        className={classes.root}
        minDate={minDate}
        maxDate={maxDate}
        autoOk
        variant="inline"
        views={["month"]}
        format="LLLL yyyy"
        label={label}
        value={value}
        onChange={setValue}
        InputProps={{
          endAdornment: (
            <img
              src="/images/icons/calendar.svg"
              alt=""
              style={{ paddingRight: 4 }}
            />
          ),
        }}
        disabled={disabled}
        maxDateMessage={maxDateMessage}
        minDateMessage={minDateMessage}
        PopoverProps={{
          classes: {
            root: classes.dialogTest,
          },
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default MonthPicker;
