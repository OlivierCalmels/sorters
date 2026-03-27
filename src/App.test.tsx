import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

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
  expect(screen.getByRole("link", { name: /Tri à bulles/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Tri par sélection/i })).toBeInTheDocument();
});
