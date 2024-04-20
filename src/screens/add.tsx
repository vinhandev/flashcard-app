import { useState } from 'react';
import { Button, CustomInput, Flex } from '../components';
import { CardProps } from '../types';
import { TextInput } from 'react-native';
import { Camera } from 'react-native-vision-camera';

export const AddScreen = () => {
  const [state, setState] = useState<CardProps>({
    title: '',
    repeatLevel: 0,
    type: 'word',
    description: '',
    image: '',
  });
  const onChangeType = (type: 'word' | 'image') => {
    setState({ ...state, type });
  };

  const onChangeRepeatLevel = (repeatLevel: 0 | 1) => {
    setState({ ...state, repeatLevel });
  };

  const onChangeTitle = (title: string) => {
    setState({ ...state, title });
  };

  const onChangeDescription = (description: string) => {
    setState({ ...state, description });
  };

  const onChangeImage = (image: string) => {
    setState({ ...state, image });
  };

  const onSubmit = () => {
    console.log(state);
  };
  return (
    <Flex>
      <Flex>
        <CustomInput
          value={state.title}
          onChangeText={onChangeTitle}
          placeholder="title"
        />
      </Flex>
      <Flex direction="row">
        <Button
          onPress={() => onChangeType(state.type === 'word' ? 'image' : 'word')}
        >
          {state.type === 'word' ? 'Word' : 'Image'}
        </Button>
      </Flex>
      {state.type === 'word' ? (
        <Flex>
          <CustomInput
            multiline
            numberOfLines={5}
            value={state.description}
            onChangeText={onChangeDescription}
            placeholder="description"
          />
        </Flex>
      ) : (
        <Flex>
          <Camera>
            
          </Camera>
        </Flex>
      )}
      <Button onPress={onSubmit}>Add</Button>
    </Flex>
  );
};
