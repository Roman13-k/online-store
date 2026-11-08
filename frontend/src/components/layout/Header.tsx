"use client";
import { FormEvent, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@heroui/react";
import { LogOut, Search, ShieldCheck, ShoppingCart, User as UserIcon } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useCartQuery, useLogoutMutation, useMeQuery } from "@/store/api";
import { useCurrency } from "@/lib/currency";
import Container from "../ui/shared/containers/Container";

function SmallSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='h-9 rounded-md border border-grey-d9 bg-white px-2 text-sm font-semibold text-black focus:outline-none focus:ring-2 focus:ring-orange-main'>
      {options.map((o) => (
        <option key={o} value={o}>
          {o.toUpperCase()}
        </option>
      ))}
    </select>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const { data: me } = useMeQuery();
  const user = me?.user;
  const { data: cart } = useCartQuery(undefined, { skip: user?.role !== "buyer" });
  const [logout] = useLogoutMutation();
  const currency = useCurrency();
  const count = cart?.reduce((s, i) => s + i.quantity, 0) ?? 0;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    router.push(q.trim() ? `/catalog?q=${encodeURIComponent(q.trim())}` : "/catalog");
  };

  return (
    <header className='sticky top-0 z-40 bg-white shadow-md'>
      <Container className='!flex-row items-center gap-5 py-3'>
        <Link href='/' className='flex items-center gap-2 shrink-0'>
          <img src='/img/logo.png' alt='' width={34} height={34} />
          <span className='text-[30px] leading-none bg-gradient-to-b from-[#f35935] to-[#fb9026] bg-clip-text text-transparent'>
            <span className='font-extrabold font-second'>ПРО</span>
            <span className='font-medium font-third'>Книги</span>
          </span>
        </Link>
        <Button as={Link} href='/catalog' className='bg-orange-main text-white font-medium' radius='sm'>
          {t("catalog")}
        </Button>
        <form onSubmit={submit} className='flex-1'>
          <Input
            aria-label={t("searchPlaceholder")}
            value={q}
            onValueChange={setQ}
            placeholder={t("searchPlaceholder")}
            startContent={<Search size={18} className='text-grey-price' />}
            radius='sm'
            variant='bordered'
          />
        </form>
        <SmallSelect label={t("currency")} value={currency.code} options={currency.codes} onChange={currency.setCode} />
        <SmallSelect
          label={t("language")}
          value={locale}
          options={[...routing.locales]}
          onChange={(l) => router.replace(pathname, { locale: l })}
        />
        {user?.role === "buyer" && (
          <Link href='/cart' aria-label={t("cart")} className='relative flex items-center'>
            <Badge content={count} color='danger' isInvisible={!count} size='sm'>
              <ShoppingCart className='text-black' />
            </Badge>
          </Link>
        )}
        {user ? (
          <Dropdown>
            <DropdownTrigger>
              <Button variant='flat' radius='sm' startContent={<UserIcon size={18} />}>
                {user.firstName}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label={t("profile")}>
              {user.role === "admin" ? (
                <DropdownItem key='admin' href={`/${locale}/admin`} startContent={<ShieldCheck size={16} />}>
                  {t("admin")}
                </DropdownItem>
              ) : (
                <DropdownItem key='orders' href={`/${locale}/orders`}>
                  {t("orders")}
                </DropdownItem>
              )}
              <DropdownItem key='profile' href={`/${locale}/profile`}>
                {t("profile")}
              </DropdownItem>
              <DropdownItem
                key='logout'
                color='danger'
                startContent={<LogOut size={16} />}
                onPress={async () => {
                  await logout();
                  router.push("/");
                }}>
                {t("logout")}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button as={Link} href='/login' variant='bordered' radius='sm' className='border-orange-main text-orange-main'>
            {t("login")}
          </Button>
        )}
      </Container>
    </header>
  );
}
