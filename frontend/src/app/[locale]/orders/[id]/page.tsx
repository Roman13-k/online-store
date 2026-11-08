"use client";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, addToast } from "@heroui/react";
import { Loader, Page, RequireRole, useConfirm } from "@/components/common";
import { OrderView } from "@/components/orders/OrderView";
import { errorMessage, useCancelOrderMutation, useOrderQuery } from "@/store/api";

function Order() {
  const t = useTranslations();
  const id = Number(useParams<{ id: string }>().id);
  const { data: order, isLoading } = useOrderQuery(id);
  const [cancel, cancelling] = useCancelOrderMutation();
  const { ask, modal } = useConfirm();
  if (isLoading || !order) return <Loader />;

  const onCancel = async () => {
    if (!(await ask(`${t("orders.cancel")}?`))) return;
    cancel(id).unwrap().catch((e) => addToast({ title: errorMessage(e), color: "danger" }));
  };

  return (
    <Page title={t("orders.details", { id })}>
      {modal}
      <OrderView
        order={order}
        actions={order.status === "new" && (
          <Button size='sm' color='danger' variant='light' isLoading={cancelling.isLoading} onPress={onCancel}>
            {t("orders.cancel")}
          </Button>
        )}
      />
    </Page>
  );
}

export default function OrderPage() {
  return (
    <RequireRole role='buyer'>
      <Order />
    </RequireRole>
  );
}
