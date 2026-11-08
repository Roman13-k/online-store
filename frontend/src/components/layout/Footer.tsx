import { useTranslations } from "next-intl";
import { getYear } from "@/utils/getYear/getYear";
import Container from "../ui/shared/containers/Container";

export function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className='mt-20 bg-grey-e9'>
      <Container className='py-8 !gap-2 text-sm'>
        <p className='font-semibold'>{t("about")}</p>
        <p className='opacity-70'>{t("text")}</p>
        <p className='opacity-70'>{t("contacts")}</p>
        <p className='opacity-50'>
          © ПРОКниги, {getYear()}. {t("rights")}
        </p>
      </Container>
    </footer>
  );
}
