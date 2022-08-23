import { FC } from "react";
import Box from "@material-ui/core/Box";

import { useAppSelector } from "store";

import SettingAccordion from "./components/accordion";
import EmailForm from "./components/forms/email";
import PasswordForm from "./components/forms/password";
import { useStyles } from "./style";

const Settings: FC = () => {
  const classes = useStyles();
  const { user } = useAppSelector((state) => state.user);

  return (
    <div id="userSettings">
      <div className={classes.title}>Настройки</div>
      <Box mb={3}>
        <SettingAccordion
          label="Электронная почта"
          info={user?.email || "Почта не закреплена"}
        >
          <EmailForm />
        </SettingAccordion>
      </Box>
      <SettingAccordion
        label="Пароль"
        info={
          user?.password_change_at
            ? `Обновлен ${user.password_change_at}`
            : "Пароль не был изменен"
        }
      >
        <PasswordForm />
      </SettingAccordion>
    </div>
  );
};

export default Settings;
