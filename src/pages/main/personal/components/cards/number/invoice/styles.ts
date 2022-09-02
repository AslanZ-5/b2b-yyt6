import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiDialog-paper": {
      maxHeight: "70vh",
      minWidth: 600,
      borderRadius: 8,
      padding: 30,
    },
    "& .MuiDialog-paperScrollPaper": {
      display: "block",
    },
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
  },
  label: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
  },
  inputHelperText: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    marginTop: 6,
    color: baseColors.primaryGrey,
  },
  radiosContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
  radioGroup: {
    "& .MuiFormGroup-root": {
      flexDirection: "row",
    },
  },
  infoContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: baseColors.lightGrey,
    marginBottom: 24,
  },
  infoHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: 8,
  },
  infoTitle: {
    fontFamily: "PTSans-Bold",
    fontSize: 14,
    paddingLeft: 7,
  },
  infoText: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    marginBottom: 5,
  },
  periodInputContainer: {
    "& .MuiFormControl-root": {
      width: 67,
    },
  },
  dayOfReceiptRadiosContainer: {
    "& .MuiFormControlLabel-root:first-child": {
      marginBottom: 28,
    },
  },
  commonInfo: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    color: baseColors.primaryGrey,
    textAlign: "center",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: 30,
    paddingBottom: 20,
  },
  period: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    //paddingRight: 8,
  },
  periodImg: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  error: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    color: baseColors.error,
  },
}));
