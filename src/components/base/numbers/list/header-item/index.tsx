import { FC } from "react";
import { ColumnState, ColumnName } from "../types/columns";
import { useStyles as useLocalStyles } from "./style";

interface IProps {
  label: string;
  fieldKey: ColumnName;
  columnStatus: ColumnState;
  columnHandler: (key: ColumnName) => void;
}

const HeaderItem: FC<IProps> = ({
  fieldKey,
  columnHandler,
  columnStatus,
  label,
}) => {
  const localClasses = useLocalStyles();
  return (
    <div
      className={localClasses.wrapper}
      onClick={() => columnHandler(fieldKey)}
    >
      <span>{label}</span>
      {columnStatus[fieldKey].active ? (
        <img
          className={
            columnStatus[fieldKey].order === "asc" ? "" : localClasses.rotateImg
          }
          src="/images/icons/pointer.svg"
          alt=""
        />
      ) : null}
    </div>
  );
};

export default HeaderItem;
