import React, { useState } from "react";

import { useStyles } from "./style";

interface IProps {
  setFile: (file: File | null) => void;
}

export const AttachInput: React.FC<IProps> = ({ setFile }) => {
  const classes = useStyles();
  const [FileName, setFileName] = useState("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    let fileName = event.target.value.split("\\").slice(-1).join("");
    if (fileName.length > 17) {
      fileName = `${fileName.split(".")[0].slice(0, 17)} ... ${
        fileName.split(".")[1]
      }`;
    }
    setFileName(fileName);
    setFile(event?.target?.files && event?.target?.files[0]);
  };

  return (
    <div className={classes.inputAttach}>
      <input
        name="attachment"
        id="attachment"
        type="file"
        accept="image/*, application/pdf, text/plain"
        onChange={(e) => handleFileSelect(e)}
      />
      <label htmlFor="attachment">
        <span>
          <img src="/images/icons/attachment.svg" alt="attachment" />
        </span>
        {FileName ? <span>{FileName}</span> : <span>Прикрепить файл</span>}
      </label>
    </div>
  );
};
