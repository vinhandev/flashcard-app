import { useState } from 'react';
import { Button, CustomInput, Flex } from '../components';
import { CardProps } from '../types';
import useImageCropPicker from '../hooks/useImageCropPicker';
import { OptionProps } from '../types/react-native-crop-image-picker';
import useZutand from '../store';
import { router } from 'expo-router';
import { Image } from 'react-native';
import { ManageCardForm } from '../components/ManageCardForm';

export const AddScreen = () => {
  const [state, setState] = useState<CardProps>({
    id: '',
    title: '',
    repeatLevel: 0,
    type: 'word',
    description: '',
    image: '',
  });

  return <ManageCardForm state={state} setState={setState} mode="add" />;
};
