"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Select, SelectItem,
  Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, addToast,
} from "@heroui/react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useConfirm } from "@/components/common";
import type { BookCard } from "@/lib/types";
import {
  api, errorMessage, useAuthorsQuery, useBooksQuery, useCurrenciesQuery, useDeleteBookMutation, useGenresQuery,
  usePublishersQuery, useSaveBookMutation,
} from "@/store/api";

const EMPTY = {
  isbn: "", title: "", publisherId: "", publishYear: "", pages: "", price: "", currencyCode: "BYN",
  stock: "0", annotation: "", coverUrl: "", authorIds: [] as string[], genreIds: [] as string[],
};
type Form = typeof EMPTY;

function BookModal({ initial, id, onClose }: { initial: Form; id?: number; onClose: () => void }) {
  const t = useTranslations("admin");
  const tc = useTranslations("common");
  const [form, setForm] = useState<Form>(initial);
  const { data: authors = [] } = useAuthorsQuery();
  const { data: genres = [] } = useGenresQuery();
  const { data: publishers = [] } = usePublishersQuery();
  const { data: currencies = [] } = useCurrenciesQuery();
  const [save, saving] = useSaveBookMutation();
  const set = (k: keyof Form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const num = (v: string) => (v === "" ? null : Number(v));

  const submit = async () => {
    const body = {
      ...form,
      publisherId: Number(form.publisherId), publishYear: num(form.publishYear), pages: num(form.pages),
      price: Number(form.price), stock: Number(form.stock),
      authorIds: form.authorIds.map(Number), genreIds: form.genreIds.map(Number),
    };
    try {
      await save({ id, body }).unwrap();
      addToast({ title: tc("saved"), color: "success" });
      onClose();
    } catch (e) {
      addToast({ title: errorMessage(e), color: "danger" });
    }
  };

  return (
    <Modal isOpen onClose={onClose} size='3xl' scrollBehavior='inside'>
      <ModalContent>
        <ModalHeader>{id ? t("editBook") : t("newBook")}</ModalHeader>
        <ModalBody className='grid grid-cols-2 gap-3'>
          <Input label={t("bookTitle")} value={form.title} onValueChange={set("title")} isRequired className='col-span-2' />
          <Input label={t("isbn")} value={form.isbn} onValueChange={set("isbn")} isRequired description='10 или 13 цифр' />
          <Select label={t("publisher")} selectedKeys={form.publisherId ? [form.publisherId] : []} isRequired
            onChange={(e) => set("publisherId")(e.target.value)}>
            {publishers.map((p) => <SelectItem key={String(p.publisher_id)}>{p.name}</SelectItem>)}
          </Select>
          <Select label={t("authors")} selectionMode='multiple' selectedKeys={form.authorIds} isRequired className='col-span-2'
            onSelectionChange={(keys) => setForm((f) => ({ ...f, authorIds: [...keys].map(String) }))}>
            {authors.map((a) => <SelectItem key={String(a.author_id)}>{`${a.first_name} ${a.last_name}`.trim()}</SelectItem>)}
          </Select>
          <Select label={t("genres")} selectionMode='multiple' selectedKeys={form.genreIds} className='col-span-2'
            onSelectionChange={(keys) => setForm((f) => ({ ...f, genreIds: [...keys].map(String) }))}>
            {genres.map((g) => <SelectItem key={String(g.genre_id)}>{g.name}</SelectItem>)}
          </Select>
          <Input type='number' label={t("year")} value={form.publishYear} onValueChange={set("publishYear")} />
          <Input type='number' label={t("pages")} value={form.pages} onValueChange={set("pages")} min={1} />
          <Input type='number' label={t("price")} value={form.price} onValueChange={set("price")} min={0} step='0.01' isRequired />
          <Select label={t("currency")} selectedKeys={[form.currencyCode]} onChange={(e) => e.target.value && set("currencyCode")(e.target.value)}>
            {currencies.map((c) => <SelectItem key={c.currency_code}>{c.currency_code}</SelectItem>)}
          </Select>
          <Input type='number' label={t("stock")} value={form.stock} onValueChange={set("stock")} min={0} isRequired />
          <Input label={t("cover")} value={form.coverUrl} onValueChange={set("coverUrl")} />
          <Textarea label={t("annotation")} value={form.annotation} onValueChange={set("annotation")} className='col-span-2' maxLength={4000} />
        </ModalBody>
        <ModalFooter>
          <Button variant='light' onPress={onClose}>{tc("cancel")}</Button>
          <Button className='bg-orange-main text-white' isLoading={saving.isLoading} onPress={submit}>{tc("save")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default function AdminBooksPage() {
  const t = useTranslations("admin");
  const tc = useTranslations("common");
  const [loadBook] = api.useLazyBookQuery();
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data } = useBooksQuery({ q: search, page, limit: 15, sort: "title" });
  const [remove] = useDeleteBookMutation();
  const [edit, setEdit] = useState<{ id?: number; form: Form } | null>(null);
  const { ask, modal } = useConfirm();

  const openEdit = async (b: BookCard) => {
    const d = await loadBook(b.book_id).unwrap();
    setEdit({
      id: b.book_id,
      form: {
        isbn: d.isbn, title: d.title, publisherId: String(d.publisher_id), publishYear: d.publish_year?.toString() ?? "",
        pages: d.pages?.toString() ?? "", price: String(d.price), currencyCode: d.currency_code, stock: String(d.stock),
        annotation: d.annotation ?? "", coverUrl: d.cover_url ?? "",
        authorIds: d.authorList.map((a) => String(a.author_id)), genreIds: d.genreList.map((g) => String(g.genre_id)),
      },
    });
  };

  const onDelete = async (b: BookCard) => {
    if (!(await ask(`${tc("confirmDelete")} «${b.title}»`))) return;
    remove(b.book_id).unwrap().catch((e) => addToast({ title: errorMessage(e), color: "danger" }));
  };

  return (
    <div className='flex flex-col gap-4'>
      {modal}
      <div className='flex flex-wrap items-center gap-3'>
        <h1 className='mr-auto text-3xl font-semibold'>{t("books")}</h1>
        <form onSubmit={(e) => { e.preventDefault(); setSearch(q); setPage(1); }} className='w-[320px]'>
          <Input size='sm' value={q} onValueChange={setQ} placeholder={tc("search")} startContent={<Search size={16} />} />
        </form>
        <Button className='bg-orange-main text-white' startContent={<Plus size={16} />} onPress={() => setEdit({ form: EMPTY })}>
          {t("newBook")}
        </Button>
      </div>
      <Table aria-label={t("books")}>
        <TableHeader>
          <TableColumn>{t("isbn")}</TableColumn>
          <TableColumn>{t("bookTitle")}</TableColumn>
          <TableColumn>{t("authors")}</TableColumn>
          <TableColumn>{t("price")}</TableColumn>
          <TableColumn>{t("stock")}</TableColumn>
          <TableColumn>{tc("actions")}</TableColumn>
        </TableHeader>
        <TableBody emptyContent={tc("empty")}>
          {(data?.items ?? []).map((b) => (
            <TableRow key={b.book_id}>
              <TableCell>{b.isbn}</TableCell>
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.authors}</TableCell>
              <TableCell>{b.price.toFixed(2)} {b.currency_code}</TableCell>
              <TableCell className={b.stock === 0 ? "text-red" : ""}>{b.stock}</TableCell>
              <TableCell>
                <div className='flex gap-1'>
                  <Button isIconOnly size='sm' variant='light' aria-label={tc("edit")} onPress={() => openEdit(b)}><Pencil size={16} /></Button>
                  <Button isIconOnly size='sm' variant='light' color='danger' aria-label={tc("delete")} onPress={() => onDelete(b)}><Trash2 size={16} /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data && data.total > 15 && (
        <Pagination className='self-center' total={Math.ceil(data.total / 15)} page={page} onChange={setPage} color='warning' />
      )}
      {edit && <BookModal initial={edit.form} id={edit.id} onClose={() => setEdit(null)} />}
    </div>
  );
}
