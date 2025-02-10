import React from "react";
import { useState } from "react";
import classes from "./SortableAccordion.module.css";
import {
  IconArchive,
  IconArrowBadgeDownFilled,
  IconArrowBadgeRight,
  IconEdit,
  IconPlayerPlay,
  IconTrash,
} from "@tabler/icons-react";
import { ClipBoard } from "../Clipboard";
import { Badge, Paper, Text } from "@mantine/core";
import { useCollapse } from "./useCollapse";

interface Item {
  id?: number | string;
  name: string;
  projectName?: string;
  command: string;
  category?: string;
  environment?: string;
}

export function SortableAccordion({
  name,
  command,
  projectName,
  environment,
}: Item) {
  const { runCurl, error, response } = useCollapse();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className={classes.accordionContainer}>
      <div className={classes.accordionItem}>
        <header className={classes.accordionHeader}>
          <div
            className={classes.headerLeftItems}
            onClick={() => setOpen(!open)}
          >
            <div className={classes.badges}>
              <Badge color="teal" variant="dot">
                {projectName}
              </Badge>
              <Badge color="red" variant="dot">
                {environment}
              </Badge>
            </div>
            <h2 contentEditable style={{ padding: "2px 5px" }}>
              {name}
            </h2>
          </div>
          <aside className={classes.headerRightItems}>
            <IconPlayerPlay
              title="Rodar cURL"
              className={classes.actionIcon}
              color="var(--mantine-color-gray-6)  "
              onClick={() => {
                setOpen(true);

                runCurl(command);
              }}
            />
            <ClipBoard text={command} />
            <IconEdit
              title="Editar cURL"
              className={classes.actionIcon}
              onClick={() => setIsEdit(!isEdit)}
              color="var(--mantine-color-gray-6)"
            />
            <IconArchive
              title="Arquivar cURL"
              className={classes.actionIcon}
              color="var(--mantine-color-gray-6)"
            />
            <IconTrash
              title="Deletar cURL"
              className={classes.actionIcon}
              color="var(--mantine-color-gray-6)"
              // onClick={() => {
              //   const curlList = JSON.parse(
              //     localStorage.getItem("curlCommands") || "[]"
              //   );

              //   const updatedList = curlList.filter(
              //     (curl: { name: string }) => curl.name !== name
              //   );

              //   localStorage.setItem(
              //     "curlCommands",
              //     JSON.stringify(updatedList)
              //   );
              // }}
            />
            {open ? (
              <IconArrowBadgeDownFilled
                onClick={() => setOpen(!open)}
                size={30}
              />
            ) : (
              <IconArrowBadgeRight onClick={() => setOpen(!open)} size={30} />
            )}
          </aside>
        </header>
        {open && (
          <div className={classes.accordionContentWrapper}>
            {(response || error) && (
              <Paper
                shadow="xs"
                p="md"
                mb="sm"
                style={{
                  backgroundColor: response ? "#70d470" : "#f56b6b",
                  color: "white",
                }}
              >
                <Text>Resposta:</Text>
                <Text>{response ? response : error}</Text>
              </Paper>
            )}
            <textarea className={classes.accordionContent} value={command} />
          </div>
        )}
      </div>
    </div>
  );
}
