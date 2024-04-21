import { FlatList, Text } from 'react-native';
import { Button, Flex } from '../components';
import useZutand from '../store';
import { router } from 'expo-router';
import useFireStore from '../hooks/useFireStore';

export default function ListScreen() {
  const cards = useZutand((state) => state.cards);
  const deleteCard = useZutand((state) => state.deleteCard);
  const { remove } = useFireStore('cards');

  const onUpdate = (id: string) => {
    router.push(`/update?id=${id}`);
  };
  const onDelete = async (id: string) => {
    try {
      await remove(id);
    } catch (error) {
      console.error('No Internet');
    }
    deleteCard(id);
  };
  const onBack = () => {
    router.back();
  };

  return (
    <Flex flex={1} padding={20} gap={10}>
      <Flex>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          List of card
        </Text>
      </Flex>
      <FlatList
        data={cards}
        ItemSeparatorComponent={() => <Flex height={10} />}
        renderItem={({ item }) => (
          <Flex
            padding={20}
            style={{
              backgroundColor: '#ddd',
            }}
            direction="row"
            align="center"
            gap={10}
          >
            <Flex flex={1}>
              <Text>{item.title}</Text>
            </Flex>
            <Button onPress={() => onUpdate(item.id)}>Update</Button>
            <Button onPress={() => onDelete(item.id)}>Delete</Button>
          </Flex>
        )}
      />
      <Flex align="center">
        <Button onPress={onBack}>Back</Button>
      </Flex>
    </Flex>
  );
}
