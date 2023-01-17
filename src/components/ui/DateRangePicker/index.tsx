import React, { memo } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  MobileDateRangePicker,
  LocalizationProvider,
  DateRange,
} from "@material-ui/pickers-next";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import DateFnsUtils from "@material-ui/pickers-next/adapter/date-fns";
import ruLocale from "date-fns/locale/ru";
import { baseColors } from "constants/colors";
import { useStyles } from "./style";

interface IProps {
  selectedDate: DateRange<Date | null>;
  handleDateChange: (data: DateRange<Date | null>) => void;
  style?: object;
  disableFuture?: boolean;
  className?: string;
}

const DateRangePicker: React.FC<IProps> = ({
  selectedDate,
  handleDateChange,
  style,
  disableFuture,
  className,
}) => {
  const classes = useStyles();

  const mainMuiTheme = createMuiTheme({
    overrides: {
      MuiButton: {
        textPrimary: {
          backgroundColor: baseColors.primaryBlue,
          color: baseColors.primaryWhite,
          textTransform: "capitalize",
          width: "94%",
          margin: "0 auto",
          marginBottom: 10,
          "&:hover": {
            backgroundColor: baseColors.primaryBlue,
            color: baseColors.primaryWhite,
          },
        },
      },
    },
  });

  return (
    <LocalizationProvider dateAdapter={DateFnsUtils} locale={ruLocale}>
      <div
        style={style}
        className={`${classes.rangePickerWrapper} ${className}`}
      >
        <ThemeProvider theme={mainMuiTheme}>
          <MobileDateRangePicker
            disableFuture={disableFuture}
            showToolbar={false}
            mask="__.__.____"
            cancelText=""
            okText="Применить"
            startText="Начало"
            endText="Конец"
            toolbarTitle={false}
            className={classes.rangePicker}
            value={selectedDate}
            onChange={(date) => handleDateChange(date)}
            renderInput={(startProps, endProps) => {
              return (
                <>
                  <TextField
                    helperText=""
                    label=""
                    size="small"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img
                            width={16}
                            height={16}
                            src="/images/icons/calendar.svg"
                            alt="date"
                          />
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      ...startProps.inputProps,
                      readOnly: true,
                      placeholder: "",
                    }}
                    className={classes.dateInput}
                  />
                  {" - "}
                  <TextField
                    inputProps={{
                      ...endProps.inputProps,
                      readOnly: true,
                      placeholder: "",
                    }}
                    helperText=""
                    label=""
                    size="small"
                    variant="standard"
                    className={classes.dateInput}
                  />
                </>
              );
            }}
          />
        </ThemeProvider>
      </div>
    </LocalizationProvider>
  );
};

export default memo(DateRangePicker);
