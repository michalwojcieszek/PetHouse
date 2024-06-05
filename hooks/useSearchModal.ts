import { create } from "zustand";

type SearchModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchModal;
