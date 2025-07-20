"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function I18nSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <select
      value={locale}
      onChange={(e) => switchLocale(e.target.value)}
      className='px-3 py-2 rounded border border-grey-e9 shadow-normal font-semibold text-[16px] font-first'
      aria-label='Select language'>
      <option className='hover:bg-colar' value='en'>
        EN
      </option>
      <option className='hover:bg-colar' value='ru'>
        RU
      </option>
      <option className='hover:bg-colar' value='zh-CN'>
        ZH
      </option>
    </select>
  );
}
