import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { SORT_MODES } from "./data/sortModes";

test("affiche le titre Sorters", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole("heading", { name: /^Sorters$/i })).toBeInTheDocument();
});

test("liste les modes de tri", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  for (const mode of SORT_MODES) {
    expect(
      screen.getByRole("link", { name: new RegExp(mode.title, "i") })
    ).toBeInTheDocument();
  }
});
