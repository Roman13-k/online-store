"use client";
import { Bold, Eraser, Italic, Underline } from "lucide-react";
import React, { RefObject, useEffect } from "react";

type Commands = "bold" | "italic" | "underline" | "delete";

export default function TextEditor({
  content,
  editorRef,
}: {
  content: string;
  editorRef: RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    if (!editorRef.current) return;
    editorRef.current.innerHTML = content;
  }, [content]);

  const applyFormat = (command: Commands) => {
    if (command === "delete") {
      if (editorRef.current) editorRef.current.innerHTML = "";
      return;
    }

    const selection = window.getSelection();
    if (!selection?.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (!range || range.collapsed) return;

    const span = document.createElement("span");
    switch (command) {
      case "italic":
        span.style.fontStyle = "italic";
        break;
      case "underline":
        span.style.textDecoration = "underline";
        break;
      case "bold":
        span.style.fontWeight = "bold";
        break;
      default:
        const exhaustiveCheck: never = command;
        return exhaustiveCheck;
    }

    try {
      span.appendChild(range.extractContents());
      range.insertNode(span);
    } catch {
      alert("Невозможно применить формат");
    }
  };

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex gap-3'>
        <button type='button' accessKey='d' onClick={() => applyFormat("delete")}>
          <Eraser />
        </button>
        <button type='button' accessKey='b' onClick={() => applyFormat("bold")}>
          <Bold />
        </button>
        <button type='button' accessKey='i' onClick={() => applyFormat("italic")}>
          <Italic />
        </button>
        <button type='button' accessKey='u' onClick={() => applyFormat("underline")}>
          <Underline />
        </button>
      </div>
      <div
        spellCheck='false'
        ref={editorRef}
        className={`p-3 text-[16px] text-black placeholder:text-black/40 border-2 focus:outline-none rounded-[5px] resize-y min-h-[100px]`}
        contentEditable
      />
    </div>
  );
}
