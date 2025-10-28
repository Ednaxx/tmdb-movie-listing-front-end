import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

export function createStore<T>(
  name: string,
  initialState: StateCreator<T>,
  persistState?: boolean,
) {
  return persistState
    ? create<T>()(
        devtools(persist(initialState, { name }), {
          name: `dawn: ${name}`,
        }),
      )
    : create<T>()(devtools(initialState, { name: `dawn: '${name}'` }));
}
