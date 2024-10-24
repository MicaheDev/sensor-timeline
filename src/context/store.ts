import { eventos, Event } from "../lib/data"
import { create } from "zustand";

const useEventsStore = create<EventStore>((set) => ({
  events: eventos,
  setEvents: (newEvents: Event[]) => set({ events: newEvents }),
  activeFilters: new Set(),
  setActiveFilters: (newFilters: Set<string>) =>
    set({ activeFilters: newFilters }),
  setInitialEvents: () => set({ events: eventos }),
  filterByName: (filterNames: string[]): void =>
    set((state) => ({
      events: state.events.filter(
        (event) =>
          filterNames.some((name) =>
            event.name.toLowerCase().includes(name.toLowerCase()),
          ), // Use some for at least one match
      ),
    })),
}));

interface EventStore {
  events: Event[];
  activeFilters: Set<string>;
  setActiveFilters: (newFilters: Set<string>) => void;
  setEvents: (newEvents: Event[]) => void;
  setInitialEvents: () => void;
  filterByName: (name: string[]) => void;
}

export default useEventsStore;
