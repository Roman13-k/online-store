"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { H1 } from "../../shared/text";
import BookOrShopButton from "../../shared/buttons/BookOrShopButton";
import SubShops from "./SubShops";
import SubBooks from "./SubBooks";

type Variant = "book" | "shop";

export default function Subscriptions() {
  const t = useTranslations("main.buyerScreen.subscriptions");
  const [selected, setSelected] = useState<Variant>("book");

  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-between items-center w-full'>
        <H1>{selected === "book" ? t("books") : t("shops")}</H1>
        <BookOrShopButton setState={setSelected} state={selected} />
      </div>
      {selected === "book" && <SubBooks />}
      {selected === "shop" && <SubShops />}
    </div>
  );
}
