import { FC } from "react";
import { useStyles } from "./styles";

const Warning: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img src="/images/icons/info.svg" alt="" />
        <span className={classes.title}>Внимание!</span>
      </div>
      <div className={classes.description}>
        1. Список содержит доступные блокировки только для выбранных в данный
        момент номеров.
      </div>
      <div className={classes.description}>
        2. При проведении операций отложенным временем для номеров других
        регионов необходимо учитывать смену часовых поясов.
      </div>
      <div className={classes.description}>
        Важно! Подключение/отключение блокировок может происходить с задержкой,
        поэтому рекомендуем поставить галочку в пункте «Проинформировать» и
        далее дождаться SMS с подтверждением того, что операция завершена.
      </div>
    </div>
  );
};

export default Warning;
