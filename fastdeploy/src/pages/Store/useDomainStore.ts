import { create } from 'zustand';

interface DomainStore {
  selectedDomain: string | null;
  setSelectedDomain: (domain: string) => void;
}

 const useDomainStore = create<DomainStore>((set) => ({
    selectedDomain: null,
    setSelectedDomain: (domain) => set({ selectedDomain: domain }),
}));

export default useDomainStore;
