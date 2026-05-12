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

export const useUserStorage = create(
  persist(
    (set) => ({
      loggedUser: null,
      setLoggedUser: (loggedUser) => set({ loggedUser }),
    }),
    { name: "user-storage" },
  ),
);
