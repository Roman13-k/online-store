"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs, addToast } from "@heroui/react";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useConfirm } from "@/components/common";
import { errorMessage, useAuthorsQuery, useDeleteDictMutation, useGenresQuery, usePublishersQuery, useSaveDictMutation } from "@/store/api";

type Name = "authors" | "genres" | "publishers";
interface Field { key: string; label: string; required?: boolean }
interface Row { id: number; values: Record<string, string> }

function DictTable({ name, fields, rows }: { name: Name; fields: Field[]; rows: Row[] }) {
  const tc = useTranslations("common");
  const [save] = useSaveDictMutation();
  const [remove] = useDeleteDictMutation();
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState<{ id: number; values: Record<string, string> } | null>(null);
  const { ask, modal } = useConfirm();

  const run = async (p: Promise<unknown>, after?: () => void) => {
    try {
      await p;
      after?.();
    } catch (e) {
      addToast({ title: errorMessage(e), color: "danger" });
    }
  };
  const add = () => run(save({ name, body: draft }).unwrap(), () => setDraft({}));
  const update = () => editing && run(save({ name, id: editing.id, body: editing.values }).unwrap(), () => setEditing(null));
  const del = async (r: Row) => {
    if (await ask(tc("confirmDelete"))) run(remove({ name, id: r.id }).unwrap());
  };

  return (
    <div className='flex flex-col gap-3'>
      {modal}
      <div className='flex items-end gap-2'>
        {fields.map((f) => (
          <Input key={f.key} size='sm' label={f.label} value={draft[f.key] ?? ""} onValueChange={(v) => setDraft((d) => ({ ...d, [f.key]: v }))} />
        ))}
        <Button className='bg-orange-main text-white' onPress={add}>{tc("add")}</Button>
      </div>
      <Table aria-label={name}>
        <TableHeader>
          {[...fields.map((f) => <TableColumn key={f.key}>{f.label}</TableColumn>), <TableColumn key='a'>{tc("actions")}</TableColumn>]}
        </TableHeader>
        <TableBody emptyContent={tc("empty")}>
          {rows.map((r) => (
            <TableRow key={r.id}>
              {[
                ...fields.map((f) => (
                  <TableCell key={f.key}>
                    {editing?.id === r.id ? (
                      <Input size='sm' aria-label={f.label} value={editing.values[f.key] ?? ""}
                        onValueChange={(v) => setEditing((e) => e && { ...e, values: { ...e.values, [f.key]: v } })} />
                    ) : (
                      r.values[f.key]
                    )}
                  </TableCell>
                )),
                <TableCell key='a'>
                  {editing?.id === r.id ? (
                    <div className='flex gap-1'>
                      <Button isIconOnly size='sm' variant='light' color='success' aria-label={tc("save")} onPress={update}><Check size={16} /></Button>
                      <Button isIconOnly size='sm' variant='light' aria-label={tc("cancel")} onPress={() => setEditing(null)}><X size={16} /></Button>
                    </div>
                  ) : (
                    <div className='flex gap-1'>
                      <Button isIconOnly size='sm' variant='light' aria-label={tc("edit")} onPress={() => setEditing({ id: r.id, values: r.values })}><Pencil size={16} /></Button>
                      <Button isIconOnly size='sm' variant='light' color='danger' aria-label={tc("delete")} onPress={() => del(r)}><Trash2 size={16} /></Button>
                    </div>
                  )}
                </TableCell>,
              ]}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function DictionariesPage() {
  const t = useTranslations("admin");
  const { data: authors = [] } = useAuthorsQuery();
  const { data: genres = [] } = useGenresQuery();
  const { data: publishers = [] } = usePublishersQuery();
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-3xl font-semibold'>{t("dictionaries")}</h1>
      <Tabs aria-label={t("dictionaries")} color='warning'>
        <Tab key='authors' title={t("dictAuthors")}>
          <DictTable
            name='authors'
            fields={[{ key: "lastName", label: t("lastName") }, { key: "firstName", label: t("firstName") }]}
            rows={authors.map((a) => ({ id: a.author_id, values: { lastName: a.last_name, firstName: a.first_name } }))}
          />
        </Tab>
        <Tab key='genres' title={t("dictGenres")}>
          <DictTable name='genres' fields={[{ key: "name", label: t("name") }]}
            rows={genres.map((g) => ({ id: g.genre_id, values: { name: g.name } }))} />
        </Tab>
        <Tab key='publishers' title={t("dictPublishers")}>
          <DictTable
            name='publishers'
            fields={[{ key: "name", label: t("name") }, { key: "country", label: t("country") }]}
            rows={publishers.map((p) => ({ id: p.publisher_id, values: { name: p.name, country: p.country ?? "" } }))}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
