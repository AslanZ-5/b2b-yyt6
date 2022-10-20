import { FC } from "react";
import Button from "@material-ui/core/Button";

import { useStyles, StylesProps } from "./style";

interface IProps {
  text: string;
  onClick: (e?: any) => void;
  additionalClasses?: StylesProps | Record<string, StylesProps>;
  style?: any;
  disabled?: boolean;
}

const CustomButton: FC<IProps> = ({
  text,
  onClick,
  additionalClasses,
  style,
  disabled = false,
}) => {
  const classes = useStyles(additionalClasses || {});
  return (
    <Button
      className={classes.root}
      onClick={onClick}
      disabled={disabled}
      style={disabled && style ? {...style, opacity:"0.5", backgroundColor:"transparent"} : {...style}}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
