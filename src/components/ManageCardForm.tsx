import { useState } from 'react';
import { Button, CustomInput, Flex } from '../components';
import { CardProps } from '../types';
import useImageCropPicker from '../hooks/useImageCropPicker';
import { OptionProps } from '../types/react-native-crop-image-picker';
import useZutand from '../store';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Image, Keyboard, Text } from 'react-native';
import useFireStore from '../hooks/useFireStore';
import { showError } from '../utils';
import useLoading from '../hooks/useLoading';
type Props = {
  state: CardProps;
  setState: (card: CardProps) => void;
  mode: 'add' | 'edit';
};

const defaultCameraOptions: OptionProps = {
  width: 300,
  height: 300,
  cropping: true,
};
export const ManageCardForm = ({ state, setState, mode }: Props) => {
  const { id } = useLocalSearchParams() ?? {};
  const { openCamera, openLibrary } = useImageCropPicker();
  const add = useZutand((state) => state.addCard);
  const update = useZutand((state) => state.updateCard);
  const { setLoading } = useLoading();

  const { write, add: addFireStore } = useFireStore('cards');

  const onChangeType = (type: 'word' | 'image') => {
    setState({ ...state, type });
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

  const onOpenCamera = async () => {
    const { path } = await openCamera(defaultCameraOptions);
    onChangeImage(path);
  };

  const onOpenLibrary = async () => {
    const { path } = await openLibrary(defaultCameraOptions);
    onChangeImage(path);
  };

  const onSubmit = async () => {
    Keyboard.dismiss();

    if (
      (state.description === '' && state.type === 'word') ||
      (state.image === '' && state.type === 'image') ||
      state.title === ''
    )
      return;
    if (mode === 'add') {
      setLoading(true);
      let id = '';
      try {
        const response = await addFireStore(state);
        console.log('response', response);
        id = response.id;
      } catch (error) {
        showError(error);
      }
      setLoading(false);

      add({ ...state, id });
    }

    if (mode === 'edit' && id) {
      const updateId = typeof id === 'object' ? id[0] : id;
      try {
        setLoading(true);
        await write(updateId, state);
        setLoading(false);
      } catch (error) {
        showError(error);
      }
      update(updateId, state);
    }
    router.replace('/');
  };

  function onBack() {
    router.back();
  }

  return (
    <Flex padding={30} flex={1} justify="space-evenly">
      <Flex align="center">
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          {mode === 'add' ? 'Add new card' : 'Edit card'}
        </Text>
      </Flex>

      <Flex
        flex={1}
        gap={20}
        style={{
          paddingVertical: 20,
        }}
      >
        <Flex>
          <CustomInput
            value={state.title}
            onChangeText={onChangeTitle}
            placeholder="Title of card"
          />
        </Flex>
        <Flex align="center" direction="row" justify="space-between" gap={10}>
          <Flex flex={1}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              Type: {state.type === 'word' ? 'Word' : 'Image'}
            </Text>
          </Flex>
          <Button
            disabled={state.type === 'word'}
            onPress={() =>
              onChangeType(state.type === 'word' ? 'image' : 'word')
            }
          >
            {'Word'}
          </Button>
          <Button
            disabled={state.type === 'image'}
            onPress={() =>
              onChangeType(state.type === 'word' ? 'image' : 'word')
            }
          >
            {'Image'}
          </Button>
        </Flex>
        <Flex flex={1}>
          {state.type === 'word' ? (
            <CustomInput
              multiline
              numberOfLines={5}
              value={state.description}
              onChangeText={onChangeDescription}
              placeholder="Description for card"
              textAlignVertical="top"
              style={{ flex: 1 }}
            />
          ) : (
            <Flex flex={1} gap={10}>
              <Flex
                flex={1}
                style={{
                  borderWidth: 1,
                }}
              >
                {state.image !== '' && (
                  <Image
                    source={{ uri: state.image }}
                    style={{ width: '100%', height: '100%' }}
                  />
                )}
              </Flex>
              <Flex gap={5} justify="space-between">
                <Button onPress={onOpenCamera}>Take Picture</Button>
                <Button onPress={onOpenLibrary}>Add from library</Button>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>

      <Flex align="center" direction="row" justify="space-between">
        <Button onPress={onBack}>Back</Button>
        <Button onPress={onSubmit}>
          {mode === 'add' ? 'Add Card' : 'Update Card'}
        </Button>
      </Flex>
    </Flex>
  );
};
