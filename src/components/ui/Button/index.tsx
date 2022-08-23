import { FC } from "react";
import Button from "@material-ui/core/Button";

import { useStyles, StylesProps } from "./style";

interface IProps {
  text: string;
  onClick: (e?: any) => void;
  additionalClasses?: StylesProps;
  disabled?: boolean;
}

const CustomButton: FC<IProps> = ({
  text,
  onClick,
  additionalClasses,
  disabled = false,
}) => {
  const classes = useStyles(additionalClasses || {});
  return (
    <Button className={classes.root} onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  );
};

export default CustomButton;
