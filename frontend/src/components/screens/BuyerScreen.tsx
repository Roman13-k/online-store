"use client";
import { useBuyerProfileQuery } from "@/store/userApi";
import React from "react";
import { Loading } from "../ui/shared/loading/Loading";

export default function BuyerScreen() {
  const { data, isLoading, isError } = useBuyerProfileQuery("");

  if (isLoading) return <Loading />;

  if (isError) return <p>Ошибка</p>;

  return (
    <div>
      <h2>Профиль пользователя</h2>
      <p>{data}</p>
    </div>
  );
}
