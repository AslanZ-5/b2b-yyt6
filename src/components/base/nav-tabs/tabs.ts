import { routes } from "constants/routes";

export const getTabsList = (isAdmin: boolean) => [
  {
    label: "Мой кабинет",
    path: routes.personal.base,
    icon: "/images/icons/home.svg",
    activeIcon: "/images/icons/home-active.svg",
  },
  {
    label: "Услуги",
    path: routes.services.base,
    icon: "/images/icons/services.svg",
    activeIcon: "/images/icons/services-active.svg",
    subPaths: [
      { label: "Подключение", path: routes.services.admin.connection },
      { label: "Отключение", path: routes.services.admin.disconnection },
    ],
  },
  {
    label: "Тарифы",
    path: isAdmin ? routes.tariffs.admin.change : routes.tariffs.users.base,
    icon: "/images/icons/sim.svg",
    activeIcon: "/images/icons/sim-active.svg",
  },
  {
    label: "Поддержка",
    path: routes.support.base,
    icon: "/images/icons/support.svg",
    activeIcon: "/images/icons/support-active.svg",
  },
  {
    label: "Настройки",
    path: routes.settings.base,
    icon: "/images/icons/settings.svg",
    activeIcon: "/images/icons/settings-active.svg",
  },
];
