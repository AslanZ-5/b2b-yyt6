import { FC } from "react";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

import { NumberService } from "../../types/NumberService";
import { useStyles } from "../services/styles";

interface IProps {
  service: NumberService;
  openDeleteModal: (service: NumberService) => void;
}

const ListItem: FC<IProps> = ({ service, openDeleteModal }) => {
  const classes = useStyles();

  const getFormattedDate = (currentDate: string) => {
    if (!currentDate) return "";
    return format(new Date(parseISO(currentDate)), "dd.MM.yyyy");
  };

  return (
    <div className={classes.listRow}>
      <div className={classes.listDateColumn}>
        {getFormattedDate(service?.connectionDate || "")}
      </div>
      <div className={classes.listNameColumn}>{service?.name || ""}</div>
      <div className={classes.listCostColumn}>
        {service?.price || 0} Р/месяц
      </div>
      <img
        src="/images/icons/cross.svg"
        alt=""
        onClick={() => openDeleteModal(service)}
        className={classes.removeButton}
      />
    </div>
  );
};

export default ListItem;
