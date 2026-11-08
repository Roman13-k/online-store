"use client";
import { ChangeEvent, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, ButtonGroup, Card, CardBody, Input, addToast } from "@heroui/react";
import { Upload } from "lucide-react";
import { download } from "@/components/common";
import { API_URL, api } from "@/store/api";
import { useDispatch } from "react-redux";

interface ImportResult { inserted: number; updated: number; rejected: number; errors: { row: number; message: string }[] }

function Formats({ formats, onPick }: { formats: string[]; onPick: (f: string) => void }) {
  return (
    <ButtonGroup size='sm' variant='flat' className='w-fit'>
      {formats.map((f) => <Button key={f} onPress={() => onPick(f)}>{f.toUpperCase()}</Button>)}
    </ButtonGroup>
  );
}

export default function AdminExchangePage() {
  const t = useTranslations("admin");
  const dispatch = useDispatch();
  const file = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [from, setFrom] = useState(new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10));
  const [to, setTo] = useState(new Date().toISOString().slice(0, 10));

  // Файл передаётся на сервер; проверка полей и запись в базу выполняются в одной транзакции
  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    const body = new FormData();
    body.append("file", f);
    try {
      const res = await fetch(`${API_URL}/api/admin/import/books`, { method: "POST", body, credentials: "include" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      setResult(json);
      dispatch(api.util.invalidateTags(["Books", "Dict"]));
    } catch (err) {
      addToast({ title: (err as Error).message, color: "danger" });
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-3xl font-semibold'>{t("exchange")}</h1>
      <Card shadow='sm'>
        <CardBody className='gap-3'>
          <p className='font-semibold'>{t("exportBooks")}</p>
          <Formats formats={["json", "xml", "csv"]} onPick={(f) => download(`/admin/export/books?format=${f}`)} />
          <p className='mt-2 font-semibold'>{t("exportOrders")}</p>
          <Formats formats={["json", "xml", "csv"]} onPick={(f) => download(`/admin/export/orders?format=${f}`)} />
        </CardBody>
      </Card>
      <Card shadow='sm'>
        <CardBody className='gap-3'>
          <p className='font-semibold'>{t("importBooks")}</p>
          <p className='text-sm text-grey-price'>{t("importHint")}</p>
          <input ref={file} type='file' accept='.json,.xml,.csv' hidden onChange={onFile} />
          <Button className='w-fit bg-orange-main text-white' startContent={<Upload size={16} />} isLoading={busy} onPress={() => file.current?.click()}>
            {t("chooseFile")}
          </Button>
          {result && (
            <div className='text-sm'>
              <p className='font-medium'>
                {t("importResult", { inserted: result.inserted, updated: result.updated, rejected: result.rejected })}
              </p>
              {result.errors.map((e) => <p key={e.row} className='text-red'>#{e.row}: {e.message}</p>)}
            </div>
          )}
        </CardBody>
      </Card>
      <Card shadow='sm'>
        <CardBody className='gap-3'>
          <p className='font-semibold'>{t("reports")}</p>
          <div className='flex flex-wrap items-center gap-3'>
            <span className='w-[200px]'>{t("reportSales")}</span>
            <Input type='date' size='sm' label={t("from")} value={from} onValueChange={setFrom} className='w-[160px]' />
            <Input type='date' size='sm' label={t("to")} value={to} onValueChange={setTo} className='w-[160px]' />
            <Formats formats={["pdf", "docx", "xlsx"]} onPick={(f) => download(`/admin/reports/sales?format=${f}&from=${from}&to=${to}`)} />
          </div>
          <div className='flex flex-wrap items-center gap-3'>
            <span className='w-[200px]'>{t("reportStock")}</span>
            <Formats formats={["pdf", "docx", "xlsx"]} onPick={(f) => download(`/admin/reports/stock?format=${f}`)} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
