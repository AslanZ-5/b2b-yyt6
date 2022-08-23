import { FC } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useStyles } from "./styles";

interface IProps {
  showVertical?: boolean;
  showHorizontal?: boolean;
  height?: string | number;
}

const CustomScrollbar: FC<IProps> = ({
  showVertical = false,
  showHorizontal = false,
  height = "70vh",
  children,
}) => {
  const classes = useStyles();
  return (
    <Scrollbars
      style={{ width: "100%", height }}
      className={classes.root}
      renderThumbVertical={(props) =>
        showVertical ? (
          <div {...props} className="thumb-vertical" />
        ) : (
          <div></div>
        )
      }
      renderTrackVertical={(props) =>
        showVertical ? (
          <div {...props} className="track-vertical" />
        ) : (
          <div></div>
        )
      }
      renderThumbHorizontal={(props) =>
        showHorizontal ? (
          <div {...props} className="thumb-horizontal" />
        ) : (
          <div></div>
        )
      }
      renderTrackHorizontal={(props) =>
        showHorizontal ? (
          <div {...props} className="track-horizontal" />
        ) : (
          <div></div>
        )
      }
    >
      {children}
    </Scrollbars>
  );
};

export default CustomScrollbar;
