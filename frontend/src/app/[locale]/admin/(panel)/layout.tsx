"use client";
import { useTranslations } from "next-intl";
import { BarChart3, BookOpen, Coins, FileDown, Library, Percent, ShoppingBag, Users } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { RequireRole } from "@/components/common";
import Container from "@/components/ui/shared/containers/Container";

const ITEMS = [
  ["", "dashboard", BarChart3],
  ["/books", "books", BookOpen],
  ["/dictionaries", "dictionaries", Library],
  ["/orders", "orders", ShoppingBag],
  ["/users", "users", Users],
  ["/discounts", "discounts", Percent],
  ["/currencies", "currencies", Coins],
  ["/exchange", "exchange", FileDown],
] as const;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("admin");
  const pathname = usePathname();
  return (
    <RequireRole role='admin'>
      <Container className='!flex-row !gap-8 py-8'>
        <nav className='flex w-[220px] shrink-0 flex-col gap-1'>
          <p className='mb-2 text-lg font-semibold'>{t("title")}</p>
          {ITEMS.map(([href, key, Icon]) => {
            const active = pathname === `/admin${href}`;
            return (
              <Link
                key={key}
                href={`/admin${href}`}
                className={`flex items-center gap-2 rounded-md px-3 py-2 ${active ? "bg-orange-main text-white" : "hover:bg-grey-e9"}`}>
                <Icon size={18} /> {t(key)}
              </Link>
            );
          })}
        </nav>
        <div className='min-w-0 flex-1'>{children}</div>
      </Container>
    </RequireRole>
  );
}
