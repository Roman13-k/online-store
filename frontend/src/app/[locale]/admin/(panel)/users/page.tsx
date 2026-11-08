"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button, Chip, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, addToast } from "@heroui/react";
import { Search } from "lucide-react";
import { formatDate } from "@/lib/currency";
import { errorMessage, useSetUserActiveMutation, useUsersQuery } from "@/store/api";

export default function AdminUsersPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const { data = [] } = useUsersQuery(search);
  const [setActive] = useSetUserActiveMutation();
  const toggle = (id: number, isActive: boolean) =>
    setActive({ id, isActive }).unwrap().catch((e) => addToast({ title: errorMessage(e), color: "danger" }));

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <h1 className='mr-auto text-3xl font-semibold'>{t("admin.users")}</h1>
        <form onSubmit={(e) => { e.preventDefault(); setSearch(q); }} className='w-[320px]'>
          <Input size='sm' value={q} onValueChange={setQ} placeholder={t("common.search")} startContent={<Search size={16} />} />
        </form>
      </div>
      <Table aria-label={t("admin.users")}>
        <TableHeader>
          <TableColumn>{t("profile.email")}</TableColumn>
          <TableColumn>{t("profile.lastName")}</TableColumn>
          <TableColumn>{t("admin.role")}</TableColumn>
          <TableColumn>{t("profile.registered")}</TableColumn>
          <TableColumn>{t("admin.orders")}</TableColumn>
          <TableColumn>{t("admin.confirmed")}</TableColumn>
          <TableColumn>{t("common.actions")}</TableColumn>
        </TableHeader>
        <TableBody emptyContent={t("common.empty")}>
          {data.map((u) => (
            <TableRow key={u.user_id}>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.last_name} {u.first_name}</TableCell>
              <TableCell><Chip size='sm' variant='flat' color={u.role === "admin" ? "warning" : "default"}>{u.role}</Chip></TableCell>
              <TableCell>{formatDate(u.registered_at, locale)}</TableCell>
              <TableCell>{u.orders}</TableCell>
              <TableCell>{u.email_confirmed ? t("common.yes") : t("common.no")}</TableCell>
              <TableCell>
                {u.role === "buyer" && (
                  <Button size='sm' variant='flat' color={u.is_active ? "danger" : "success"} onPress={() => toggle(u.user_id, !u.is_active)}>
                    {u.is_active ? t("admin.block") : t("admin.unblock")}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
