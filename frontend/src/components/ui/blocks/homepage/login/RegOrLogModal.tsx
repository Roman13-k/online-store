import ModalLayout from "@/components/ui/layout/ModalLayout";
import MainButton from "@/components/ui/shared/buttons/MainButton";
import TextDivider from "@/components/ui/shared/divider/TextDivider";
import { AuthChoose } from "@/types";
import React, { Dispatch, SetStateAction } from "react";

interface RegOrLogModalProps {
  setLoginModal: Dispatch<SetStateAction<boolean>>;
  setAuthChoose: Dispatch<SetStateAction<AuthChoose | null>>;
  setNextLoginModal: Dispatch<SetStateAction<boolean>>;
}

export function RegOrLogModal({
  setLoginModal,
  setAuthChoose,
  setNextLoginModal,
}: RegOrLogModalProps) {
  const handleNextLoginModal = (authChoose: AuthChoose) => {
    setLoginModal(false);
    setAuthChoose(authChoose);
    setNextLoginModal(true);
  };

  return (
    <ModalLayout onClose={() => setLoginModal(false)}>
      <MainButton
        onPress={() => {
          handleNextLoginModal("registration");
        }}
        className='flex justify-center items-center min-h-[62px] min-w-[385px] text-white mt-[40px]'>
        Зарегистрироваться
      </MainButton>
      <TextDivider />
      <button
        onClick={() => {
          handleNextLoginModal("login");
        }}
        className='flex justify-center items-center h-[62px] w-[385px] bg-colar font-medium text-lg text-orange-main rounded-[5px] mb-[38px]'>
        Войти
      </button>
    </ModalLayout>
  );
}
