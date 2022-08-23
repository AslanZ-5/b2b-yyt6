import { FC } from "react";

import { useStyles } from "./styles";

const InfoBlock: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container} id="adminServicesInfoBlock">
      <div className={classes.header}>
        <img src="/images/icons/info.svg" alt="" />
        <div className={classes.title}>Внимание!</div>
      </div>
      <div className={classes.listItem}>
        1. Список содержит доступные услуги только для выбранных в данный момент
        номеров.
      </div>
      <div className={classes.listItem}>
        2. При проведении операций отложенным временем для номеров других
        регионов необходимо учитывать смену часовых поясов.
      </div>
      <div className={classes.listItem}>
        Важно! Подключение/отключение услуг может происходить с задержкой,
        поэтому рекомендуем поставить галочку в пункте «Проинформировать» и
        далее дождаться SMS с подтверждением того, что операция завершена.
      </div>
      <div className={classes.listItem}>
        3. Если на номере был изменён тарифный план, полный перечень услуг для
        добавления и удаления будет доступен по истечении 5 минут после
        завершения операции по смене тарифа.
      </div>
    </div>
  );
};

export default InfoBlock;
