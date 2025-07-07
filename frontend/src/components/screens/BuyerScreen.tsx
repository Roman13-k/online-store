"use client";
import { useUserdataQuery } from "@/store/userApi";
import { useRouter } from "next/navigation";
import React from "react";

export default function BuyerScreen() {
  const navigate = useRouter();
  const token = localStorage.getItem("token");
  if (!token) navigate.push("/");
  const { data, isLoading, isError } = useUserdataQuery({
    token,
    url: "buyer",
  });

  if (isError) {
    return <p>Что-то не так</p>;
  }

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      <h2>Профиль пользователя</h2>
      <p>{data.profile.email}</p>
    </div>
  );
}
