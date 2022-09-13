import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export type StylesProps = {
  width?: string;
  opacity?: string;
  borderRadius?: string;
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
    backgroundColor: (props) => props?.backgroundColor || baseColors.primaryBlue,
    color: (props) => props?.color || baseColors.primaryWhite,
    width: (props) => props?.width || 100,
    height: (props) => props?.height || 35,
    fontSize: (props) => props?.fontSize || 14,
    textTransform: "none",
    "&:hover": {
      backgroundColor: (props) =>
        props?.backgroundColor || baseColors.primaryBlue,
      cursor: "pointer",
    },
    "&.Mui-disabled": {
      backgroundColor: (props) => props?.disabled?.backgroundColor || baseColors.lightBlue,
      color: (props) => props?.disabled?.color || baseColors.secondaryGrey,
    },
  },
}));
