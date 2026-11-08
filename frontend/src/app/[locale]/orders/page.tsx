"use client";
import { useLocale, useTranslations } from "next-intl";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { useRouter } from "@/i18n/navigation";
import { Loader, Page, RequireRole, StatusChip } from "@/components/common";
import { formatDate } from "@/lib/currency";
import { useOrdersQuery } from "@/store/api";

function Orders() {
  const t = useTranslations("orders");
  const locale = useLocale();
  const router = useRouter();
  const { data = [], isLoading } = useOrdersQuery();
  if (isLoading) return <Loader />;
  return (
    <Page title={t("title")}>
      <Table aria-label={t("title")} selectionMode='single' onRowAction={(k) => router.push(`/orders/${k}`)}>
        <TableHeader>
          <TableColumn>{t("number")}</TableColumn>
          <TableColumn>{t("date")}</TableColumn>
          <TableColumn>{t("items")}</TableColumn>
          <TableColumn>{t("status")}</TableColumn>
          <TableColumn>{t("total")}</TableColumn>
        </TableHeader>
        <TableBody emptyContent={t("empty")}>
          {data.map((o) => (
            <TableRow key={o.order_id} className='cursor-pointer'>
              <TableCell>{o.order_id}</TableCell>
              <TableCell>{formatDate(o.created_at, locale)}</TableCell>
              <TableCell>{o.items}</TableCell>
              <TableCell><StatusChip status={o.status} /></TableCell>
              <TableCell>{o.total.toFixed(2)} {o.currency_code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Page>
  );
}

export default function OrdersPage() {
  return (
    <RequireRole role='buyer'>
      <Orders />
    </RequireRole>
  );
}
