"use client";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, Spinner } from "@heroui/react";
import { useRouter } from "@/i18n/navigation";
import type { OrderStatus, Role } from "@/lib/types";
import { useMeQuery } from "@/store/api";
import Container from "./ui/shared/containers/Container";

export function Page({ title, actions, children }: PropsWithChildren<{ title?: string; actions?: ReactNode }>) {
  return (
    <Container className='py-8 !gap-6'>
      {(title || actions) && (
        <div className='flex flex-wrap items-center justify-between gap-4'>
          {title && <h1 className='text-3xl font-semibold'>{title}</h1>}
          {actions}
        </div>
      )}
      {children}
    </Container>
  );
}

export function Loader() {
  return (
    <div className='flex justify-center py-16'>
      <Spinner color='warning' />
    </div>
  );
}

const STATUS_COLOR: Record<OrderStatus, "default" | "primary" | "secondary" | "success" | "danger"> = {
  new: "primary",
  paid: "secondary",
  packed: "default",
  issued: "success",
  cancelled: "danger",
};

export function StatusChip({ status }: { status: OrderStatus }) {
  const t = useTranslations("status");
  return (
    <Chip size='sm' variant='flat' color={STATUS_COLOR[status]}>
      {t(status)}
    </Chip>
  );
}

// Проверка роли в браузере только скрывает страницы; права проверяет сервер
export function RequireRole({ role, children }: PropsWithChildren<{ role: Role }>) {
  const { data, isLoading } = useMeQuery();
  const router = useRouter();
  const allowed = data?.user?.role === role;
  useEffect(() => {
    if (!isLoading && !allowed) router.replace(role === "admin" ? "/admin/login" : "/login");
  }, [isLoading, allowed, role, router]);
  if (isLoading || !allowed) return <Loader />;
  return <>{children}</>;
}

// Диалог подтверждения: ask() возвращает обещание с ответом пользователя
export function useConfirm() {
  const t = useTranslations("common");
  const [state, setState] = useState<{ text: string; resolve: (v: boolean) => void } | null>(null);
  const ask = (text: string) => new Promise<boolean>((resolve) => setState({ text, resolve }));
  const close = (answer: boolean) => {
    state?.resolve(answer);
    setState(null);
  };
  const modal = (
    <Modal isOpen={!!state} onClose={() => close(false)} size='sm'>
      <ModalContent>
        <ModalBody className='pt-6'>{state?.text}</ModalBody>
        <ModalFooter>
          <Button variant='light' onPress={() => close(false)}>{t("no")}</Button>
          <Button className='bg-orange-main text-white' onPress={() => close(true)}>{t("yes")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
  return { ask, modal };
}

export function download(path: string) {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  window.open(`${base}/api${path}`, "_blank");
}
