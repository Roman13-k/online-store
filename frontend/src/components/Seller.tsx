import React from "react";
import { useBooksListQuery } from "../API/booksApi";
import { Loading } from "./ui/shared/Loading";

export function Seller() {
  const { data, isLoading, isError, isSuccess } = useBooksListQuery();
  if (isLoading) return <Loading />;
  if (isError) return <p>Ошибка</p>;
  return (
    <section>
      {data.map((d: any) => (
        <div key={d.name}>
          <h2>{d.name}</h2>
          <p>{d.count}</p>
          <p>{d.description}</p>
        </div>
      ))}
      {isSuccess && <p>успех</p>}
    </section>
  );
}
