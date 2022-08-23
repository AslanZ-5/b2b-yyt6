import { FC } from "react";
import { useStyles } from "./styles";

interface IProps {
  onClick: () => void;
}

const BackLink: FC<IProps> = ({ onClick, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.backLinkContainer} onClick={onClick}>
      <img src="/images/icons/back-pointer.svg" alt="" />
      <span className={classes.backLinkText}>{children}</span>
    </div>
  );
};

export default BackLink;
