import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiDialog-paper": {
      minWidth: 600,
      borderRadius: 8,
      padding: 30,
      overflowY: "hidden",
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
  infoContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#eff3f8",
    marginBottom: 30,
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
  buttonContainer: {
    textAlign: "center",
  },
  period: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
  },
  error: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    color: "#ff1a31",
  },
  label: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
  },
  emailsInputRoot: {
    borderRadius: 4,
    border: "solid 1px #c5c5c5",
    backgroundColor: "#fff",
    padding: "10px 16px",
    paddingBottom: 10,
    position: "relative",
  },
  emailInput: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
  },
  emailsInputChipContainer: {
    minHeight: "initial",
  },
  emailsInputChip: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    color: "white",

    marginBottom: 6,
    backgroundColor: `${baseColors.darkOrange} !important`,

    "&:hover": {
      backgroundColor: baseColors.darkOrange,
    },

    "&:focus": {
      backgroundColor: baseColors.darkOrange,
    },

    "& .MuiChip-deleteIcon": {
      color: "white",
    },
  },
  emailsInputHelperText: {
    fontFamily: "PTSans-Regular",
    color: "#ff1a31",
    margin: 0,
    fontSize: 11,

    position: "absolute",
    bottom: -25,
  },
  helperText: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    marginTop: 16,
  },
}));
