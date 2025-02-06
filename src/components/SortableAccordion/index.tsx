import React from "react";
import { useState } from "react";
import classes from "./SortableAccordion.module.css";
import {
  IconArchive,
  IconCaretDownFilled,
  IconCaretRightFilled,
  IconEdit,
  IconPlayerPlay,
  IconTrash,
} from "@tabler/icons-react";
import { ClipBoard } from "../Clipboard";
import { Badge } from "@mantine/core";

interface Item {
  id?: number | string;
  name: string;
  projectName?: string;
  command: string;
  category?: string;
  environment?: string;
}

export function SortableAccordion({
  id = 1,
  name,
  command,
  category,
  environment,
}: Item) {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Important for allowing drop
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const draggedId = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (draggedId === id) return;

    console.log(`Dropped item ${draggedId} onto item ${id}`);
  };

  return (
    <div className={classes.accordionContainer}>
      <div
        className={classes.accordionItem}
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <header className={classes.accordionHeader}>
          <div className={classes.headerleftItems}>
            {open ? (
              <IconCaretDownFilled onClick={() => setOpen(!open)} />
            ) : (
              <IconCaretRightFilled onClick={() => setOpen(!open)} />
            )}
            <Badge color="lime">
              {category} | {environment}
            </Badge>
            <span contentEditable>{name}</span>
          </div>
          <aside className={classes.headerRightItems}>
            <IconPlayerPlay title="Rodar cURL" className={classes.actionIcon} />
            <ClipBoard text={command} />
            <IconEdit
              title="Editar cURL"
              className={classes.actionIcon}
              onClick={() => setIsEdit(!isEdit)}
            />
            <IconArchive title="Arquivar cURL" className={classes.actionIcon} />
            <IconTrash
              title="Deletar cURL"
              className={classes.actionIcon}
              onClick={() => {
                const curlList = JSON.parse(
                  localStorage.getItem("curlCommands") || "[]"
                );

                const updatedList = curlList.filter(
                  (curl: { name: string }) => curl.name !== name
                );

                localStorage.setItem(
                  "curlCommands",
                  JSON.stringify(updatedList)
                );
              }}
            />
          </aside>
        </header>
        {open && (
          <textarea
            className={classes.accordionContent}
            value={command}
            onChange={() => {
              /* Handle content change if needed */
            }}
          />
        )}
      </div>
    </div>
  );
}
