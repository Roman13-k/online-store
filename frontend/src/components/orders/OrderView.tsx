"use client";
import { useLocale, useTranslations } from "next-intl";
import { Button, ButtonGroup, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { download, StatusChip } from "@/components/common";
import { formatDate } from "@/lib/currency";
import type { OrderDetail } from "@/lib/types";

export function OrderView({ order, actions }: { order: OrderDetail; actions?: React.ReactNode }) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-wrap items-center gap-4'>
        <StatusChip status={order.status} />
        <span className='text-grey-price'>{formatDate(order.created_at, locale)}</span>
        <span className='text-grey-price'>{order.last_name} {order.first_name}, {order.email}</span>
      </div>
      <Table aria-label={t("orders.details", { id: order.order_id })} removeWrapper>
        <TableHeader>
          <TableColumn>{t("cart.book")}</TableColumn>
          <TableColumn>{t("cart.quantity")}</TableColumn>
          <TableColumn>{t("cart.price")}</TableColumn>
          <TableColumn>{t("cart.sum")}</TableColumn>
        </TableHeader>
        <TableBody>
          {order.items.map((i) => (
            <TableRow key={i.book_id}>
              <TableCell>{i.title}</TableCell>
              <TableCell>{i.quantity}</TableCell>
              <TableCell>{i.price.toFixed(2)} BYN</TableCell>
              <TableCell>{i.sum.toFixed(2)} BYN</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='ml-auto flex w-[360px] flex-col gap-1'>
        <div className='flex justify-between'><span>{t("orders.subtotal")}</span><span>{order.subtotal.toFixed(2)} BYN</span></div>
        <div className='flex justify-between'>
          <span>{t("orders.discount")}{order.discount_name ? ` (${order.discount_name}, ${order.percent}%)` : ""}</span>
          <span>−{order.discount_sum.toFixed(2)} BYN</span>
        </div>
        <div className='flex justify-between text-sm text-grey-price'>
          <span>{t("orders.rate")}</span><span>1 {order.currency_code} = {order.rate_at_order} BYN</span>
        </div>
        <div className='flex justify-between text-xl font-semibold'>
          <span>{t("orders.total")}</span><span>{order.total.toFixed(2)} {order.currency_code}</span>
        </div>
      </div>
      <div className='flex flex-wrap items-center gap-3'>
        <span>{t("orders.invoice")}:</span>
        <ButtonGroup size='sm' variant='flat'>
          {(["pdf", "docx", "xlsx"] as const).map((f) => (
            <Button key={f} onPress={() => download(`/orders/${order.order_id}/invoice?format=${f}`)}>
              {f.toUpperCase()}
            </Button>
          ))}
        </ButtonGroup>
        {actions}
      </div>
    </div>
  );
}
