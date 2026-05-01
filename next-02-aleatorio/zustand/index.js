import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTaskFilter = create(
  persist(
    (set) => ({
      filtrarConcluidas: false,
      toggleFiltrarConcluidas: () =>
        set((state) => ({ filtrarConcluidas: !state.filtrarConcluidas })),
    }),
    { name: "taskFilter-storage" },
  ),
);
