"use client";
import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { Store } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

export function renderWithProvider(children: ReactElement, store: Store) {
  return render(<Provider store={store}>{children}</Provider>);
}
