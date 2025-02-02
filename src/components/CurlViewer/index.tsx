import React, { useState } from "react";
import classes from "./CurlViewer.module.css";

const CurlViewer = () => {
    const [command, setCommand] = useState("");

  if (!command.startsWith("curl")) {
    return <p className={classes.error}>{command}</p>;
  }

  // Quebra o comando em partes para destacar
  const parts = command.split(" ");
  return (
    <pre onChange={(e) => {
      console.log()
      setCommand(e.target.value);
      }
    } className={classes.curlContainer}>
      {parts.map((part, index) => {
        let color = classes.textDefault; // Estilo padrão

        if (part.startsWith("https://") || part.startsWith("http://")) {
          color = classes.textUrl; // URL
        } else if (part.startsWith("-H")) {
          color = classes.textHeader; // Headers
        } else if (part.startsWith("--data") || part.startsWith("-d")) {
          color = classes.textData; // Corpo da requisição
        } else if (part === "curl") {
          color = classes.textCommand; // Comando cURL principal
        }

        return (
          <span key={index} className={`${color} space`}>
            {part}
          </span>
        );
      })}
    </pre>
  );
};

export default CurlViewer;