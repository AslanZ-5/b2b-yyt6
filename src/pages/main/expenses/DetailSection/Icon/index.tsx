import { FC } from "react";
import { useStyles } from "./style";

interface DetailSectionIconProps {
  type:
    | "service"
    | "payments"
    | "calls"
    | "sms"
    | "outgoing"
    | "internet"
    | "roaming"
    | "entertainment";
}

const DetailSectionIcon: FC<DetailSectionIconProps> = ({ type }) => {
  const classes = useStyles();

  switch (type) {
    case "sms": {
      return (
        <div className={classes.root}>
          <img src="/images/icons/expenses/sms.svg" alt="sms" />
        </div>
      );
    }
    case "calls": {
      return (
        <div className={classes.root}>
          <img src="/images/icons/expenses/calls.svg" alt="calls" />
        </div>
      );
    }
    case "payments": {
      return (
        <div className={classes.root}>
          <img src="/images/icons/expenses/payments.svg" alt="payments" />
        </div>
      );
    }
    case "internet": {
      return (
        <div className={classes.root}>
          <img src="/images/icons/expenses/internet.svg" alt="internet" />
        </div>
      );
    }
    case "roaming": {
      return (
        <div className={classes.root}>
          <img src="/images/icons/expenses/roaming.svg" alt="roaming" />
        </div>
      );
    }
    default: {
      return (
        <div className={classes.root}>
          <img src="/images/icons/expenses/service.svg" alt="service" />
        </div>
      );
    }
  }
};

export default DetailSectionIcon;
