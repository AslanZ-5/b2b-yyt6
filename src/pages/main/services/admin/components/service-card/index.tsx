import { FC } from "react";

import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";

import { Service } from "../../hooks/useServices";

import { useStyles } from "./styles";

interface IProps {
  service: Service;
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
}

const ServiceCard: FC<IProps> = ({
  service,
  selectedService,
  setSelectedService,
}) => {
  const classes = useStyles();
  const openCollapse = selectedService?.servId === service.servId;

  const handleCollapseClick = () => {
    setSelectedService(openCollapse ? null : service);
  };

  return (
    <div
      className={`${classes.container} ${
        openCollapse ? classes.highlightContainer : ""
      }`}
      onClick={handleCollapseClick}
    >
      <div className={classes.header}>
        <div className={classes.name}>{service.name}</div>
        <IconButton
          className={`${openCollapse ? classes.expandOpen : ""}`}
          aria-expanded={openCollapse}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </div>
      <div className={classes.text}>{service.description}</div>
      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        {service?.conditions ? (
          <>
            <div className={classes.subHeader}>Условия работы услуги:</div>
            <div className={classes.text}>{service?.conditions || ""}</div>
          </>
        ) : null}
        {service?.area ? (
          <>
            <div className={classes.subHeader}>Рабочий регион услуги:</div>
            <div className={classes.text}>{service?.area || ""}</div>
          </>
        ) : null}
      </Collapse>
    </div>
  );
};

export default ServiceCard;
