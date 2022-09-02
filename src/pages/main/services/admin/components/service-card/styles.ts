import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: baseColors.primaryWhite,
    marginBottom: 30,
    "&:hover": {
      cursor: "pointer",
    },
  },
  highlightContainer: {
    border: `1px solid ${baseColors.primaryBlue}`,
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontFamily: "PTSans-Bold",
    fontSize: 14,

    marginTop: 15,
    marginBottom: 5,
  },
  name: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    lineHeight: 2,
  },
  text: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    lineHeight: 1.29,
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));
