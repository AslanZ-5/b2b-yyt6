import { routes } from "constants/routes";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useAppSelector } from "store";

const useCheckAdmin = () => {
  const { user } = useAppSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (!user?.isAdmin) history.push(`${routes.personal.base}`);
  }, [history, user?.isAdmin]);
};

export default useCheckAdmin;
