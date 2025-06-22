import React, { useEffect, useState } from "react";
import { useUserdataQuery } from "../../API/userApi";
import { useNavigate } from "react-router-dom";

export function Buyer() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) navigate("/");
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
