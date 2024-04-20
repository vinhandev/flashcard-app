import { create } from 'zustand';
import { CardProps } from '../types';
import { initRepeatPercent } from '../constants';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from './storage';

type Props = {
  cards: CardProps[];
};
type Methods = {
  setCards: (cards: CardProps[]) => void;
  addCard: (card: CardProps) => void;
  updateCard: (index: number, card: CardProps) => void;
  deleteCard: (index: number) => void;
};

const initProps: Props = {
  cards: [],
};

const useZutand = create(
  persist<Props & Methods>(
    (set) => ({
      ...initProps,
      setCards: (cards) => set(() => ({ cards })),
      addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
      updateCard: (index = 0, card) =>
        set((state) => {
          const newCards = [...state.cards];
          newCards[index] = card;
          return { cards: newCards };
        }),
      deleteCard: (index) =>
        set((state) => {
          const newCards = [...state.cards];
          newCards.splice(index, 1);
          return { cards: newCards };
        }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useZutand;
