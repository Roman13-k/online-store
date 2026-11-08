"use client";
import { useTranslations } from "next-intl";
import { Button, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, addToast } from "@heroui/react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { Cover } from "@/components/books/BookCard";
import { Loader, Page, RequireRole, useConfirm } from "@/components/common";
import { useCurrency } from "@/lib/currency";
import {
  errorCode, errorMessage, useCartQuery, useClearCartMutation, usePlaceOrderMutation, usePreviewQuery, useSetCartItemMutation,
} from "@/store/api";

function Cart() {
  const t = useTranslations("cart");
  const router = useRouter();
  const currency = useCurrency();
  const { data: items = [], isLoading } = useCartQuery();
  const { data: preview } = usePreviewQuery(currency.code, { skip: !items.length });
  const [setItem] = useSetCartItemMutation();
  const [clear] = useClearCartMutation();
  const [place, placing] = usePlaceOrderMutation();
  const { ask, modal } = useConfirm();

  if (isLoading) return <Loader />;
  if (!items.length) {
    return (
      <Page title={t("title")}>
        <p className='text-grey-price'>{t("empty")}</p>
        <Button as={Link} href='/catalog' radius='sm' className='w-fit bg-orange-main text-white'>
          {t("goCatalog")}
        </Button>
      </Page>
    );
  }

  const change = (bookId: number, quantity: number) =>
    setItem({ bookId, quantity }).unwrap().catch((e) => addToast({ title: errorMessage(e), color: "danger" }));

  const checkout = async () => {
    if (!preview || !(await ask(t("confirm", { total: `${preview.total.toFixed(2)} ${preview.currency}` })))) return;
    try {
      const order = await place(currency.code).unwrap();
      addToast({ title: t("placed", { id: order.order_id }), color: "success" });
      router.push(`/orders/${order.order_id}`);
    } catch (e) {
      const text = errorCode(e) === "OUT_OF_STOCK" ? t("outOfStock", { books: errorMessage(e) }) : errorMessage(e);
      addToast({ title: text, color: "danger" });
    }
  };

  return (
    <Page title={t("title")} actions={<Button variant='light' color='danger' onPress={() => clear()}>{t("clear")}</Button>}>
      {modal}
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]'>
        <Table aria-label={t("title")} removeWrapper>
          <TableHeader>
            <TableColumn>{t("book")}</TableColumn>
            <TableColumn>{t("price")}</TableColumn>
            <TableColumn>{t("quantity")}</TableColumn>
            <TableColumn>{t("sum")}</TableColumn>
            <TableColumn> </TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((i) => (
              <TableRow key={i.book_id}>
                <TableCell>
                  <Link href={`/book/${i.book_id}`} className='flex items-center gap-3'>
                    <Cover src={i.cover_url} title={i.title} className='h-16 w-12 rounded' />
                    <span>
                      <b>{i.title}</b>
                      <br />
                      <span className='text-sm text-grey-price'>{i.authors}</span>
                    </span>
                  </Link>
                </TableCell>
                <TableCell>{currency.format(i.price_byn)}</TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Button isIconOnly size='sm' variant='flat' aria-label='-' onPress={() => change(i.book_id, i.quantity - 1)}>
                      <Minus size={14} />
                    </Button>
                    <span className='w-6 text-center'>{i.quantity}</span>
                    <Button isIconOnly size='sm' variant='flat' aria-label='+' isDisabled={i.quantity >= i.stock}
                      onPress={() => change(i.book_id, i.quantity + 1)}>
                      <Plus size={14} />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{currency.format(i.sum_byn)}</TableCell>
                <TableCell>
                  <Button isIconOnly size='sm' variant='light' color='danger' aria-label={t("remove")} onPress={() => change(i.book_id, 0)}>
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <aside className='flex h-fit flex-col gap-3 rounded-md bg-grey-f5f7 p-5 shadow-normal'>
          <Select label={t("currency")} selectedKeys={[currency.code]} onChange={(e) => e.target.value && currency.setCode(e.target.value)}>
            {currency.codes.map((c) => (
              <SelectItem key={c}>{c}</SelectItem>
            ))}
          </Select>
          {preview && (
            <>
              <div className='flex justify-between'><span>{t("subtotal")}</span><span>{preview.subtotal.toFixed(2)} BYN</span></div>
              <div className='flex justify-between'>
                <span>{t("discount")}{preview.discount_name ? ` (${preview.discount_name}, ${preview.percent}%)` : ""}</span>
                <span>−{preview.discount_sum.toFixed(2)} BYN</span>
              </div>
              <p className='text-sm text-grey-price'>{t("rate", { currency: preview.currency, rate: preview.rate_to_byn })}</p>
              <div className='flex justify-between text-xl font-semibold'>
                <span>{t("toPay")}</span>
                <span>{preview.total.toFixed(2)} {preview.currency}</span>
              </div>
            </>
          )}
          <Button radius='sm' size='lg' className='bg-orange-main text-white' isLoading={placing.isLoading} onPress={checkout}>
            {t("checkout")}
          </Button>
        </aside>
      </div>
    </Page>
  );
}

export default function CartPage() {
  return (
    <RequireRole role='buyer'>
      <Cart />
    </RequireRole>
  );
}
