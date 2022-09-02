import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: 14,
    borderRadius: 8,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: baseColors.primaryWhite,
    marginBottom: 30,
  },
  highlightContainer: {
    border: `1px solid ${baseColors.primaryBlue}`,
  },
  header: {
    marginBottom: 16,
    "&:hover": {
      cursor: "pointer",
    },
  },
  name: {
    fontFamily: "PTSans-Bold",
    fontSize: 18,
    lineHeight: 1,
    color: baseColors.primaryBlack,

    paddingLeft: 22,
  },
  description: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    lineHeight: 1.14,

    marginBottom: 20,
  },
  mainImg: {
    maxWidth: "100%",
    height: "50px",
    borderRadius: 4,
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  slider: {
    margin: "0 auto",
    width: "90%",
  },
  more: {
    fontFamily: "PTSans-Bold",
    fontSize: 14,
    //lineHeight: 1.29,
    color: baseColors.primaryBlue,
    display: "inline-block",

    marginTop: 15,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
