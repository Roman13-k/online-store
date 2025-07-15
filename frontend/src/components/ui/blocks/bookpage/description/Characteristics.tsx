import React from "react";
import AccordionContainer from "./AccordionContainer";
import { P1 } from "@/components/ui/shared/text";
import DOMPurify from "dompurify";

export default function Characteristics({ characteristics }: { characteristics: string }) {
  const safeHTML = DOMPurify.sanitize(characteristics);

  return (
    <AccordionContainer>
      <P1 dangerouslySetInnerHTML={{ __html: safeHTML }} />
    </AccordionContainer>
  );
}
