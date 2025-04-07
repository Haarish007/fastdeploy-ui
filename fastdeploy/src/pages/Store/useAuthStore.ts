import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => {
      return {
        auth: {},
        saveAuth: (authObj:any) => {
          set({
            auth: {
              ...authObj,
            },
          });
        },
        resetAuth: () => {
          set({ auth: {} }, true);
          window?.location?.replace?.("/");
        },
      };
    },
    {
      name: "@_deployzone_auth_",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
