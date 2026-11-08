"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Table, TableBody, TableCell, TableColumn,
  TableHeader, TableRow, addToast,
} from "@heroui/react";
import { StatusChip } from "@/components/common";
import { OrderView } from "@/components/orders/OrderView";
import { formatDate } from "@/lib/currency";
import { ORDER_STATUSES, OrderStatus } from "@/lib/types";
import { errorMessage, useAdminOrdersQuery, useOrderQuery, useSetOrderStatusMutation } from "@/store/api";

function OrderModal({ id, onClose }: { id: number; onClose: () => void }) {
  const t = useTranslations();
  const { data } = useOrderQuery(id);
  const [setStatus] = useSetOrderStatusMutation();
  const change = (status: string) =>
    setStatus({ id, status: status as OrderStatus }).unwrap().catch((e) => addToast({ title: errorMessage(e), color: "danger" }));
  return (
    <Modal isOpen onClose={onClose} size='4xl'>
      <ModalContent>
        <ModalHeader>{t("orders.details", { id })}</ModalHeader>
        <ModalBody className='pb-6'>
          {data && (
            <OrderView
              order={data}
              actions={
                <Select size='sm' className='w-[200px]' label={t("orders.status")} selectedKeys={[data.status]}
                  isDisabled={data.status === "cancelled"} onChange={(e) => e.target.value && change(e.target.value)}>
                  {ORDER_STATUSES.map((s) => <SelectItem key={s}>{t(`status.${s}`)}</SelectItem>)}
                </Select>
              }
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default function AdminOrdersPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [status, setStatus] = useState<OrderStatus | "">("");
  const [open, setOpen] = useState<number | null>(null);
  const { data = [] } = useAdminOrdersQuery(status);
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <h1 className='mr-auto text-3xl font-semibold'>{t("admin.orders")}</h1>
        <Select size='sm' className='w-[220px]' aria-label={t("orders.status")} selectedKeys={[status || "all"]}
          onChange={(e) => setStatus(e.target.value === "all" ? "" : (e.target.value as OrderStatus))}>
          {["all", ...ORDER_STATUSES].map((s) => (
            <SelectItem key={s}>{s === "all" ? t("admin.allStatuses") : t(`status.${s}`)}</SelectItem>
          ))}
        </Select>
      </div>
      <Table aria-label={t("admin.orders")} selectionMode='single' onRowAction={(k) => setOpen(Number(k))}>
        <TableHeader>
          <TableColumn>{t("orders.number")}</TableColumn>
          <TableColumn>{t("orders.date")}</TableColumn>
          <TableColumn>{t("admin.buyer")}</TableColumn>
          <TableColumn>{t("orders.status")}</TableColumn>
          <TableColumn>{t("orders.subtotal")}</TableColumn>
          <TableColumn>{t("orders.total")}</TableColumn>
        </TableHeader>
        <TableBody emptyContent={t("common.empty")}>
          {data.map((o) => (
            <TableRow key={o.order_id} className='cursor-pointer'>
              <TableCell>{o.order_id}</TableCell>
              <TableCell>{formatDate(o.created_at, locale)}</TableCell>
              <TableCell>{o.last_name} {o.first_name}<br /><span className='text-xs text-grey-price'>{o.email}</span></TableCell>
              <TableCell><StatusChip status={o.status} /></TableCell>
              <TableCell>{o.subtotal?.toFixed(2)} BYN</TableCell>
              <TableCell>{o.total.toFixed(2)} {o.currency_code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {open && <OrderModal id={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
