import { FC, lazy } from "react";
import { Route } from "react-router-dom";
import { routes } from "constants/routes";
import BackNavigate from "pages/main/support/components/ui/back-navigate";

const Feedback = lazy(() => import("../feedback"));
const Questions = lazy(() => import("../questions"));
const ContactsCenter = lazy(() => import("../contacts-center"));

const SupportContainer: FC = () => (
  <>
    <Route path={routes.support.feedback}>
      <BackNavigate />
      <Feedback />
    </Route>
    {/* <Route path={routes.support.salons}>
          {BackComponent}
          <Salons />
        </Route> */}
    <Route path={routes.support.questions}>
      <BackNavigate />
      <Questions />
    </Route>
    <Route path={routes.support.contactCenter}>
      <BackNavigate />
      <ContactsCenter />
    </Route>
  </>
);

export default SupportContainer;
