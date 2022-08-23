import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export type StylesProps = {
  width?: string;
  height?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  disabled?: {
    color?: string;
    backgroundColor?: string;
  };
};

export const useStyles = makeStyles<Theme, StylesProps>((theme: Theme) => ({
  root: {
    fontFamily: "PTSans-Bold",
    backgroundColor: (props) => props?.backgroundColor || baseColors.mainOrange,
    color: (props) => props?.color || "#fff",
    width: (props) => props?.width || 100,
    height: (props) => props?.height || 35,
    fontSize: (props) => props?.fontSize || 14,
    textTransform: "none",
    "&:hover": {
      backgroundColor: (props) =>
        props?.backgroundColor || baseColors.mainOrange,
      cursor: "pointer",
    },
    "&.Mui-disabled": {
      backgroundColor: (props) => props?.disabled?.backgroundColor || "#fbbb99",
      color: (props) => props?.disabled?.color || "#fcfcfc",
    },
  },
}));
