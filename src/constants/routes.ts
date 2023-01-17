export const routes = {
  personal: {
    auth: "/auth",
    base: "/personal",
    admin: {
      tariffs: {
        change: "/admin/tariffs/change",
      },
      services: {
        change: "/admin/services/change",
      },
    },
  },
  expenses: {
    base: "/expenses",
  },
  support: {
    base: "/support",
    questions: "/support/questions",
    // salons: "/support/salons",
    contactCenter: "/support/contact-center",
    feedback: "/support/feedback",
  },
  settings: {
    base: "/settings",
  },
  balances: {
    base: "/balances",
  },
  services: {
    base: "/services",
    users: "/services",
    admin: {
      base: "/services/admin",
      connection: "/services/admin/connection",
      disconnection: "/services/admin/disconnection",
    },
  },
  tariffs: {
    base: "/tariffs",
    users: {
      base: "/tariffs",
      detail: "/tariffs/:id",
      own: "/tariffs/own",
    },
    admin: {
      base: "/tariffs/admin",
      change: "/tariffs/admin/change",
    },
  },
  numbers: {
    base: "/services/numbers",
    admin: {
      list: "/services/numbers/admin",
      block: "/services/numbers/admin/block",
      changeSim: "/services/numbers/admin/change_sim",
      info: "/services/numbers/admin/info",
    },
  },
};
