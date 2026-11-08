"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, addToast } from "@heroui/react";
import { RefreshCw } from "lucide-react";
import { errorMessage, useCurrenciesQuery, useRefreshRatesMutation, useSetRateMutation } from "@/store/api";

export default function AdminCurrenciesPage() {
  const t = useTranslations("admin");
  const tc = useTranslations("common");
  const { data = [] } = useCurrenciesQuery();
  const [setRate] = useSetRateMutation();
  const [refresh, refreshing] = useRefreshRatesMutation();
  const [rates, setRates] = useState<Record<string, string>>({});

  const save = async (code: string) => {
    try {
      await setRate({ code, rate: Number(rates[code]) }).unwrap();
      addToast({ title: tc("saved"), color: "success" });
    } catch (e) {
      addToast({ title: errorMessage(e), color: "danger" });
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center'>
        <h1 className='mr-auto text-3xl font-semibold'>{t("currencies")}</h1>
        <Button variant='flat' startContent={<RefreshCw size={16} />} isLoading={refreshing.isLoading}
          onPress={() => refresh().unwrap().catch((e) => addToast({ title: errorMessage(e), color: "danger" }))}>
          {t("refreshNbrb")}
        </Button>
      </div>
      <Table aria-label={t("currencies")}>
        <TableHeader>
          <TableColumn>{t("code")}</TableColumn>
          <TableColumn>{t("name")}</TableColumn>
          <TableColumn>{t("rate")}</TableColumn>
          <TableColumn>{t("rateDate")}</TableColumn>
          <TableColumn>{tc("actions")}</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((c) => (
            <TableRow key={c.currency_code}>
              <TableCell>{c.currency_code}</TableCell>
              <TableCell>{c.name}</TableCell>
              <TableCell>
                <Input size='sm' type='number' aria-label={t("rate")} className='w-[160px]' step='0.0001' min={0}
                  isDisabled={c.currency_code === "BYN"} value={rates[c.currency_code] ?? String(c.rate_to_byn)}
                  onValueChange={(v) => setRates((r) => ({ ...r, [c.currency_code]: v }))} />
              </TableCell>
              <TableCell>{c.rate_date.slice(0, 10)}</TableCell>
              <TableCell>
                {c.currency_code !== "BYN" && (
                  <Button size='sm' className='bg-orange-main text-white' isDisabled={rates[c.currency_code] === undefined} onPress={() => save(c.currency_code)}>
                    {tc("save")}
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
