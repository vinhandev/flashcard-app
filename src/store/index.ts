import { create } from 'zustand';
import { CardProps } from '../types';
import { initRepeatPercent } from '../constants';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from './storage';

type Props = {
  cards: CardProps[];
  loading: boolean;
};
type Methods = {
  setCards: (cards: CardProps[]) => void;
  addCard: (card: CardProps) => void;
  updateCard: (id: string, card: CardProps) => void;
  deleteCard: (id: string) => void;
  setLoading: (loading: boolean) => void;
};

const initProps: Props = {
  cards: [],
  loading: false,
};

const useZutand = create(
  persist<Props & Methods>(
    (set) => ({
      ...initProps,
      setCards: (cards) => set(() => ({ cards })),
      addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
      updateCard: (id, paramCard) =>
        set((state) => {
          const newCards = state.cards.map((card) => {
            if (card.id === id) return paramCard;
            return card;
          });
          return { cards: newCards };
        }),
      deleteCard: (id) =>
        set((state) => {
          const newCards = state.cards.filter((card) => card.id !== id);
          return { cards: newCards };
        }),
      setLoading: (loading) => set(() => ({ loading })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useZutand;
