import { useState } from "react";
import classes from "./SortableAccordion.module.css";
import {
  IconArchive,
  IconCaretDownFilled,
  IconCaretRightFilled,
  IconEdit,
  IconPlayerPlay,
} from '@tabler/icons-react';
import { ClipBoard } from "../Clipboard";

interface Item {
  id: number;
  title: string;
  content: string;
  checked: boolean;
}

const initialItems: Item[] = [
  { id: 1, title: "Lista de relatórios", content: "curl 'https://api.github.com/repos/fkhadra/react-toastify/issues?per_page=1' -H 'accept: */*' -H 'accept-language: pt-BR,pt-H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36'", checked: false },
  { id: 2, title: "Buscar status de validação", content: "Conteúdo do Item 2", checked: false },
  { id: 3, title: "Ver perfis", content: "Conteúdo do Item 3", checked: false }
];

export function SortableAccordion() {
  const [items, setItems] = useState(initialItems);
  const [openId, setOpenId] = useState<number | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  // const handleCheckboxChange = (id: number) => {
  //   setItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  // };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: number) => {
    const draggedId = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (draggedId === targetId) return;

    const updatedItems = [...items];
    const draggedIndex = updatedItems.findIndex(item => item.id === draggedId);
    const targetIndex = updatedItems.findIndex(item => item.id === targetId);

    const [movedItem] = updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(targetIndex, 0, movedItem);

    setItems(updatedItems);
  };

  return (
    <section className={classes.accordionContainer}>
      {items.map(item => (
        <div
          key={item.id}
          className={classes.accordionItem}
          draggable
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, item.id)}
        >
          <header className={classes.accordionHeader}>
           <div className={classes.headerleftItems}>
           {openId ? <IconCaretDownFilled onClick={() => toggleAccordion(item.id)} /> : <IconCaretRightFilled onClick={() => toggleAccordion(item.id)} />}
            {/* <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheckboxChange(item.id)}
                onClick={(e) => e.stopPropagation()}
              /> */}
              <span contentEditable>{item.title}</span>
           </div>
           <aside className={classes.headerRightItems}>
              <IconPlayerPlay title="Rodar cURL" className={classes.actionIcon} />
              <ClipBoard text="lala" />
              <IconEdit title="Editar cURL"  className={classes.actionIcon}onChange={() => setIsEdit(isEdit)} />
              <IconArchive title="Arquivar cURL" className={classes.actionIcon} />
           </aside>
          </header>
          {openId === item.id && <textarea className={classes.accordionContent} contentEditable>{item.content}</textarea>}
        </div>
      ))}
    </section>
  );
}
