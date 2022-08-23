import { routes } from "constants/routes";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router";

const useRedirect = () => {
  const { type }: { type: "connection" | "disconnection" | undefined } =
    useParams();
  const history = useHistory();

  useEffect(() => {
    if (type !== "connection" && type !== "disconnection") {
      history.push(`${routes.personal.base}`);
    }
  }, [history, type]);
};

export default useRedirect;
