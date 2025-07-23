"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";

export default function I18nSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className='relative inline-block w-[140px]'>
      <select
        value={locale}
        onChange={(e) => switchLocale(e.target.value)}
        className='appearance-none w-full px-4 py-2 pr-10 rounded-md border border-grey-e9 bg-white text-black shadow-normal font-semibold text-[16px] font-first focus:outline-none focus:ring-2 focus:ring-orange-main transition'
        aria-label='Select language'>
        <option value='en'>EN</option>
        <option value='ru'>RU</option>
        <option value='zh-CN'>ZH</option>
      </select>
      <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black/60 h-4 w-4' />
    </div>
  );
}
