"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Button, Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch,
  Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, addToast,
} from "@heroui/react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useConfirm } from "@/components/common";
import type { Discount } from "@/lib/types";
import { errorMessage, useDeleteDiscountMutation, useDiscountsQuery, useSaveDiscountMutation } from "@/store/api";

const today = () => new Date().toISOString().slice(0, 10);
const day = (s: string) => s.slice(0, 10);

export default function AdminDiscountsPage() {
  const t = useTranslations("admin");
  const tc = useTranslations("common");
  const { data = [] } = useDiscountsQuery();
  const [save, saving] = useSaveDiscountMutation();
  const [remove] = useDeleteDiscountMutation();
  const [edit, setEdit] = useState<{ id?: number; name: string; percent: string; startsOn: string; endsOn: string; minSum: string; isActive: boolean } | null>(null);
  const { ask, modal } = useConfirm();

  const open = (d?: Discount) =>
    setEdit(d
      ? { id: d.discount_id, name: d.name, percent: String(d.percent), startsOn: day(d.starts_on), endsOn: day(d.ends_on), minSum: String(d.min_sum), isActive: d.is_active }
      : { name: "", percent: "10", startsOn: today(), endsOn: today(), minSum: "0", isActive: true });

  const submit = async () => {
    if (!edit) return;
    const { id, ...f } = edit;
    try {
      await save({ id, body: { ...f, percent: Number(f.percent), minSum: Number(f.minSum) } }).unwrap();
      setEdit(null);
    } catch (e) {
      addToast({ title: errorMessage(e), color: "danger" });
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      {modal}
      <div className='flex items-center'>
        <h1 className='mr-auto text-3xl font-semibold'>{t("discounts")}</h1>
        <Button className='bg-orange-main text-white' startContent={<Plus size={16} />} onPress={() => open()}>{t("newDiscount")}</Button>
      </div>
      <Table aria-label={t("discounts")}>
        <TableHeader>
          <TableColumn>{t("name")}</TableColumn>
          <TableColumn>{t("percent")}</TableColumn>
          <TableColumn>{t("startsOn")}</TableColumn>
          <TableColumn>{t("endsOn")}</TableColumn>
          <TableColumn>{t("minSum")}</TableColumn>
          <TableColumn>{t("active")}</TableColumn>
          <TableColumn>{t("used")}</TableColumn>
          <TableColumn>{tc("actions")}</TableColumn>
        </TableHeader>
        <TableBody emptyContent={tc("empty")}>
          {data.map((d) => (
            <TableRow key={d.discount_id}>
              <TableCell>{d.name}</TableCell>
              <TableCell>{d.percent}%</TableCell>
              <TableCell>{day(d.starts_on)}</TableCell>
              <TableCell>{day(d.ends_on)}</TableCell>
              <TableCell>{d.min_sum.toFixed(2)}</TableCell>
              <TableCell><Chip size='sm' variant='flat' color={d.is_active ? "success" : "default"}>{d.is_active ? tc("yes") : tc("no")}</Chip></TableCell>
              <TableCell>{d.used}</TableCell>
              <TableCell>
                <div className='flex gap-1'>
                  <Button isIconOnly size='sm' variant='light' aria-label={tc("edit")} onPress={() => open(d)}><Pencil size={16} /></Button>
                  <Button isIconOnly size='sm' variant='light' color='danger' aria-label={tc("delete")}
                    onPress={async () => (await ask(tc("confirmDelete"))) && remove(d.discount_id).unwrap().catch((e) => addToast({ title: errorMessage(e), color: "danger" }))}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {edit && (
        <Modal isOpen onClose={() => setEdit(null)}>
          <ModalContent>
            <ModalHeader>{edit.id ? edit.name : t("newDiscount")}</ModalHeader>
            <ModalBody>
              <Input label={t("name")} value={edit.name} onValueChange={(v) => setEdit({ ...edit, name: v })} isRequired />
              <Input type='number' label={t("percent")} value={edit.percent} onValueChange={(v) => setEdit({ ...edit, percent: v })} min={0.01} max={100} />
              <div className='flex gap-2'>
                <Input type='date' label={t("startsOn")} value={edit.startsOn} onValueChange={(v) => setEdit({ ...edit, startsOn: v })} />
                <Input type='date' label={t("endsOn")} value={edit.endsOn} onValueChange={(v) => setEdit({ ...edit, endsOn: v })} />
              </div>
              <Input type='number' label={t("minSum")} value={edit.minSum} onValueChange={(v) => setEdit({ ...edit, minSum: v })} min={0} />
              <Switch isSelected={edit.isActive} onValueChange={(v) => setEdit({ ...edit, isActive: v })}>{t("active")}</Switch>
            </ModalBody>
            <ModalFooter>
              <Button variant='light' onPress={() => setEdit(null)}>{tc("cancel")}</Button>
              <Button className='bg-orange-main text-white' isLoading={saving.isLoading} onPress={submit}>{tc("save")}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
