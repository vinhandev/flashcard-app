import { supabase } from '../service/supabase';
import { CardProps } from '../types';

export type Card = {
  id: string;
  title: string;
  description: string;
  image: string;
  repeatLevel: number;
  type: 'word' | 'image';
};

export function useSupabase() {
  async function add(card: Card) {
    const addCard: Omit<Card, 'id'> = {
      description: card.description,
      image: card.image,
      repeatLevel: card.repeatLevel,
      title: card.title,
      type: card.type,
    };
    const docRef = await supabase.from('cards').insert(addCard).select('*');
    console.log('Document written with ID: ', docRef.data);
    return docRef?.data?.[0] as CardProps | null;
  }

  async function getAll(): Promise<Card[]> {
    const { data, error } = await supabase.from('cards').select('*');
    if (error) {
      console.log('error', error);
    }
    return (data ?? []) as Card[];
  }

  async function update(id: string, card: Card) {
    const docRef = await supabase.from('cards').update(card).eq('id', id);
    console.log('Document written with ID: ', docRef.data);
  }

  async function remove(id: string) {
    const docRef = await supabase.from('cards').delete().eq('id', id);
    console.log('Document written with ID: ', docRef.data);
  }

  return {
    add,
    getAll,
    update,
    remove,
  };
}
