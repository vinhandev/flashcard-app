import { useEffect, useState } from 'react';
import { CardProps } from '../types';
import useZutand from '../store';
import { useLocalSearchParams } from 'expo-router';
import { ManageCardForm } from '../components/ManageCardForm';

export const UpdateScreen = () => {
  const { id } = useLocalSearchParams() ?? {};
  const cards = useZutand((state) => state.cards);
  const [state, setState] = useState<CardProps>({
    id: '',
    title: '',
    repeatLevel: 0,
    type: 'word',
    description: '',
    image: '',
  });

  useEffect(() => {
    const card = cards.find((item) => item.id === id);
    if (!card) return;
    setState(card);
  }, [id]);

  return <ManageCardForm state={state} setState={setState} mode="edit" />;
};
