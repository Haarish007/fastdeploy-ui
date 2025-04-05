import { create } from 'zustand';

interface BucketStore {
  selectedBucket: string | null;
  setSelectedBucket: (bucket: string) => void;
}

 const useBucketStore = create<BucketStore>((set) => ({
  selectedBucket: null,
  setSelectedBucket: (bucket) => set({ selectedBucket: bucket }),
}));

export default useBucketStore;
