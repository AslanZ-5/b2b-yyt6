import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    "& .MuiDialog-paper": {
      width: 580,
      padding: 25,
      borderRadius: 12,
    },
  },
  name: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
  },
  description: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    lineHeight: 1.29,

    marginTop: 2,
    marginBottom: 30,
  },
  label: {
    fontFamily: "PTSans-Bold",
    fontSize: 14,
    lineHeight: 2,
    color: "#131313",
  },
  text: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    lineHeight: 1.29,
  },
  row: {
    marginBottom: 20,
  },
  info: {
    fontFamily: "PTSans-Regular",
    fontSize: 12,
    lineHeight: 1.5,
    color: "#a5abaf",
    marginLeft: 4,
  },
  cost: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
    lineHeight: 1.2,
    color: "#010101",
  },
  closeBtn: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
