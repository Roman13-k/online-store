"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RegOrLogModal } from "../../blocks/homepage/login/RegOrLogModal";
import { BuyerOrSellerModal } from "../../blocks/homepage/login/BuyerOrSellerModal";
import NavBar from "./NavBar";
import CatologMenu from "./CatologMenu";
import MainButton from "../../shared/buttons/MainButton";
import UserNav from "./UserNav";
import SearchInput from "../../shared/inputs/SearchInput";
import Container from "../../shared/containers/Container";
import { AuthChoose } from "@/types";

export function Header() {
  const [isOpenCatalog, setIsOpenCatalog] = useState(false);
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const [isOpenChoose, setIsOpenChoose] = useState<AuthChoose | boolean>(false);
  const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);

  return (
    <>
      {isOpenAuthModal && (
        <RegOrLogModal setIsOpenAuth={setIsOpenAuthModal} setIsOpenChoose={setIsOpenChoose} />
      )}
      {!!isOpenChoose && (
        <BuyerOrSellerModal setIsOpenChoose={setIsOpenChoose} isOpenChoose={isOpenChoose} />
      )}
      <header className='flex flex-col min-h-[110px] text-sm pt-2 shadow-md '>
        <Container className='relative'>
          <div>
            <div className='flex justify-between mb-5'>
              <p className='relative before:content-[url("/icons/marker.svg")] before:mr-2'>
                Пункт выдачи — Центральная ул., 1
              </p>
              <NavBar />
            </div>
            <div className='flex items-center'>
              <Link href='/'>
                <h1 className='flex items-center justify-center text-[38px] bg-gradient-to-b from-[#f35935] to-[#fb9026] bg-clip-text text-transparent before:content-[url("/img/logo.png")] before:mr-2 font-semibold'>
                  <span className='font-extrabold font-second'>ПРО</span>
                  <span className='font-medium font-third'>Книги</span>
                </h1>
              </Link>
              <MainButton className='ml-14 mr-5 ' onPress={() => setIsOpenCatalog(!isOpenCatalog)}>
                <p> Католог</p>
                <img src='/icons/open-btn.svg' alt='Icon' className='ml-2' />
              </MainButton>
              <CatologMenu isOpenCatalog={isOpenCatalog} />
              <SearchInput
                isOpenUploadModal={isOpenUploadModal}
                setIsOpenUploadModal={setIsOpenUploadModal}
              />
              <UserNav isOpenAuthModal={isOpenAuthModal} setIsOpenAuthModal={setIsOpenAuthModal} />
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}
