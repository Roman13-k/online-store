"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardBody, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { Loader } from "@/components/common";
import { useAnalyticsQuery } from "@/store/api";

const iso = (d: Date) => d.toISOString().slice(0, 10);

function Bars({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className='flex h-[180px] items-end gap-[3px]'>
      {data.map((d) => (
        <div key={d.label} className='group relative flex-1'>
          <div className='rounded-t bg-orange-main' style={{ height: `${(d.value / max) * 170 + 2}px` }} title={`${d.label}: ${d.value.toFixed(2)}`} />
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const t = useTranslations("admin");
  const [from, setFrom] = useState(iso(new Date(Date.now() - 30 * 86400000)));
  const [to, setTo] = useState(iso(new Date()));
  const [threshold, setThreshold] = useState("5");
  const { data, isLoading } = useAnalyticsQuery({ from, to, threshold: Number(threshold) || 0 });

  const cards = data && [
    [t("ordersCount"), data.summary.orders],
    [t("revenue"), data.summary.revenue.toFixed(2)],
    [t("avgCheck"), data.summary.avg_check.toFixed(2)],
    [t("buyers"), data.summary.buyers],
  ];

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-wrap items-end gap-3'>
        <h1 className='mr-auto text-3xl font-semibold'>{t("dashboard")}</h1>
        <Input type='date' label={t("from")} value={from} onValueChange={setFrom} className='w-[170px]' size='sm' />
        <Input type='date' label={t("to")} value={to} onValueChange={setTo} className='w-[170px]' size='sm' />
      </div>
      {isLoading || !data ? (
        <Loader />
      ) : (
        <>
          <div className='grid grid-cols-2 gap-4 xl:grid-cols-4'>
            {cards!.map(([k, v]) => (
              <Card key={k} shadow='sm'>
                <CardBody>
                  <p className='text-sm text-grey-price'>{k}</p>
                  <p className='text-2xl font-semibold'>{v}</p>
                </CardBody>
              </Card>
            ))}
          </div>
          <Card shadow='sm'>
            <CardBody className='gap-3'>
              <p className='font-semibold'>{t("revenueByDay")}</p>
              <Bars data={data.byDay.map((d) => ({ label: d.day, value: d.revenue }))} />
              <div className='flex justify-between text-xs text-grey-price'>
                <span>{data.from}</span>
                <span>{data.to}</span>
              </div>
            </CardBody>
          </Card>
          <div className='grid grid-cols-1 gap-4 xl:grid-cols-3'>
            <Table aria-label={t("topBooks")} topContent={<b>{t("topBooks")}</b>} className='xl:col-span-2'>
              <TableHeader>
                <TableColumn>{t("bookTitle")}</TableColumn>
                <TableColumn>{t("sold")}</TableColumn>
                <TableColumn>{t("revenue")}</TableColumn>
              </TableHeader>
              <TableBody>
                {data.topBooks.map((b) => (
                  <TableRow key={b.book_id}>
                    <TableCell>{b.title}</TableCell>
                    <TableCell>{b.sold}</TableCell>
                    <TableCell>{b.revenue.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Table aria-label={t("byGenre")} topContent={<b>{t("byGenre")}</b>}>
              <TableHeader>
                <TableColumn>{t("genres")}</TableColumn>
                <TableColumn>{t("sold")}</TableColumn>
              </TableHeader>
              <TableBody>
                {data.byGenre.map((g) => (
                  <TableRow key={g.name}>
                    <TableCell>{g.name}</TableCell>
                    <TableCell>{g.sold}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Table
            aria-label={t("lowStock")}
            topContent={
              <div className='flex items-center gap-3'>
                <b>{t("lowStock")}</b>
                <Input type='number' size='sm' className='w-[140px]' label={t("threshold")} value={threshold} onValueChange={setThreshold} min={0} />
              </div>
            }>
            <TableHeader>
              <TableColumn>{t("bookTitle")}</TableColumn>
              <TableColumn>{t("stock")}</TableColumn>
            </TableHeader>
            <TableBody>
              {data.lowStock.map((b) => (
                <TableRow key={b.book_id}>
                  <TableCell>{b.title}</TableCell>
                  <TableCell className={b.stock === 0 ? "text-red" : ""}>{b.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}
