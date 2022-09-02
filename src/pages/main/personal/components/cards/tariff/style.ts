import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  tariffCard: {
    "&:hover": {
      cursor: "pointer",
    },
    borderRadius: "10px",
    width: "100%",
    "& .MuiGrid-root": {
      width: "auto",
      height: "100%",
    },
    boxShadow: "2px 2px 23px 0px rgba(0,0,0,0.08)",
    boxSizing: "border-box",
    padding: "20px 12px",
    "& img": {
      marginRight: 10,
      maxWidth: "100%",
      borderRadius: 5,
      height: 60,
      objectFit: "contain",
    },
    "@media (max-width:340px)": {
      "& .MuiIconButton-root": {
        padding: 0,
      },
    },
  },
  subTitle: {
    fontFamily: "PTSans-Bold",
    fontSize: 18,
    color: baseColors.primaryBlack,
    display: "flex",
    alignItems: "center",
  },
}));
