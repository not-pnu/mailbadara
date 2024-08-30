import { create } from 'zustand';
import { EDescription } from '@/enums/subscribe';

interface ISubscribeFormStore {
  step: number;
  onNextStep: () => void;
  descriptionType: EDescription;
  setDescriptionType: (descriptionType: EDescription) => void;
  reset: () => void;
}

export const useSubscribeFormStore = create<ISubscribeFormStore>((set) => ({
  step: 0,
  onNextStep: () => {
    set((state) => ({ step: state.step + 1 }));
  },
  descriptionType: EDescription.DEFAULT,
  setDescriptionType: (descriptionType) => set({ descriptionType }),
  reset: () => set({ step: 0, descriptionType: EDescription.DEFAULT }),
}));
