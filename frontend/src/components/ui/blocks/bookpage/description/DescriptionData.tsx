import { P1 } from "@/components/ui/shared/text";
import AccordionContainer from "./AccordionContainer";
import DOMPurify from "dompurify";

export function DescriptionData({ description }: { description: string }) {
  const safeHTML = DOMPurify.sanitize(description);

  return (
    <AccordionContainer>
      <P1 dangerouslySetInnerHTML={{ __html: safeHTML }} />
    </AccordionContainer>
  );
}
