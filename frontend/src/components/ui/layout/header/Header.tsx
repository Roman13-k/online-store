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
import { AuthChoose, BuyerOrSeller } from "@/types";
import { Login } from "../../blocks/homepage/login/Login";
import { RegBuyer } from "../../blocks/homepage/login/RegBuyer";
import { RegSeller } from "../../blocks/homepage/login/RegSeller";
import Image from "next/image";

export function Header() {
  const [isCatalogMenu, setIsCatalogMenu] = useState(false);
  const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);

  const [loginModal, setLoginModal] = useState(false);
  const [nextLoginModal, setNextLoginModal] = useState(false);
  const [authChoose, setAuthChoose] = useState<AuthChoose | null>(null);
  const [buyerOrSeller, setBuyerOrSeller] = useState<BuyerOrSeller | null>(null);

  const handleCLose = () => {
    setAuthChoose(null);
    setBuyerOrSeller(null);
  };

  return (
    <>
      {authChoose === "registration" && buyerOrSeller === "buyer" && (
        <RegBuyer handleClose={handleCLose} />
      )}
      {authChoose === "registration" && buyerOrSeller === "seller" && (
        <RegSeller handleClose={handleCLose} />
      )}
      {authChoose === "login" && buyerOrSeller !== null && (
        <Login authChoose={authChoose} buyerOrSeller={buyerOrSeller} handleCLose={handleCLose} />
      )}
      {loginModal && (
        <RegOrLogModal
          setNextLoginModal={setNextLoginModal}
          setLoginModal={setLoginModal}
          setAuthChoose={setAuthChoose}
        />
      )}
      {nextLoginModal && (
        <BuyerOrSellerModal
          setNextLoginModal={setNextLoginModal}
          setBuyerOrSeller={setBuyerOrSeller}
        />
      )}
      <header className='flex flex-col min-h-[110px] text-sm pt-2 shadow-md '>
        <Container className='relative'>
          <div>
            <div className='flex justify-between mb-5'>
              <p className='relative before:content-[url("/icons/marker.svg")] before:mr-2'>
                Пункт выдачи — Центральная ул., 1
              </p>
              <NavBar setBuyerOrSeller={setBuyerOrSeller} setAuthChoose={setAuthChoose} />
            </div>
            <div className='flex items-center'>
              <Link href='/'>
                <h1 className='flex items-center justify-center text-[38px] bg-gradient-to-b from-[#f35935] to-[#fb9026] bg-clip-text text-transparent before:content-[url("/img/logo.png")] before:mr-2 font-semibold'>
                  <span className='font-extrabold font-second'>ПРО</span>
                  <span className='font-medium font-third'>Книги</span>
                </h1>
              </Link>
              <MainButton className='ml-14 mr-5 ' onPress={() => setIsCatalogMenu((prev) => !prev)}>
                <p> Католог</p>
                <Image
                  width={12}
                  height={16}
                  src='/icons/open-btn.svg'
                  alt='open.svg'
                  className='ml-2'
                />
              </MainButton>
              <CatologMenu isOpenCatalog={isCatalogMenu} />
              <SearchInput
                isOpenUploadModal={isOpenUploadModal}
                setIsOpenUploadModal={setIsOpenUploadModal}
              />
              <UserNav setLoginModal={setLoginModal} />
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}
