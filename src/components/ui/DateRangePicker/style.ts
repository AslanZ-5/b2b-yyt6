import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  rangePickerWrapper: {
    cursor: "default",
    "& .MuiPickersDateRangePickerInput-root": {
      alignItems: "center",
      position: "relative",
      cursor: "default",
      "@media (max-width:600px)": {
        flexDirection: "row",
        /*marginRight: "auto",*/
      },
      "&:after": {
        content: "''",
        position: "absolute",
        borderBottom: "1px  dashed black",
        top: 18,
        left: 29,
        width: 153,
        "@media (max-width: 599px)": {
          //width: 175,
        },
        height: 3.5,
      },
    },
  },
  rangePicker: {
    "& .MuiPickersDateRangePickerInput-root": {
      alignItems: "center",
      marginLeft: 34.5,
    },

    "& .MuiToolbar-root": {
      background: baseColors.primaryBlue,
    },
    "& .MuiButtonBase-root.Mui-selected": {
      background: baseColors.primaryBlue,
    },
    "& .MuiPickersDateRangeDay-dayInsideRangeInterval": {
      color: baseColors.primaryBlue,
      fontWeight: 600,
    },
    "& .MuiPickersCalendar-root": {
      minHeight: 286,
    },
    "& .MuiPickersDateRangeDay-root": {
      marginBottom: 5,
    },
    "& .MuiPickersDateRangeDay-root.MuiPickersDateRangeDay-rangeIntervalDayHighlight":
      {
        backgroundColor: baseColors.lightBlue,
        marginBottom: 5,
      },
  },
  dateInput: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 5,
    marginRight: 5,
    "& input": {
      width: 72,
    },
    "& .MuiInputBase-root": {
      cursor: "default",
    },
    "@media (max-width: 600px)": {
      //maxWidth: 108,
    },
    "&:last-of-type": {
      maxWidth: 72,
      "@media (max-width: 600px)": {
        //maxWidth: 108,
      },
    },
    "& .MuiInputBase-input.MuiInput-input": {
      fontSize: 14,
      cursor: "pointer",
      "@media (max-width: 599px)": {
        //fontSize: 16,
      },
      padding: 0,
      fontFamily: "PTSans-Regular",
      fontWeight: "bold",
    },
    "& .MuiInput-underline:before, .MuiInput-underline:after": {
      content: "none",
    },
  },
}));
