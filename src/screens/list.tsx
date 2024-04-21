import { FlatList, Text } from 'react-native';
import { Button, Flex } from '../components';
import useZutand from '../store';
import { router } from 'expo-router';
import useFireStore from '../hooks/useFireStore';
import { showError } from '../utils';
import useLoading from '../hooks/useLoading';

export default function ListScreen() {
  const cards = useZutand((state) => state.cards);
  const deleteCard = useZutand((state) => state.deleteCard);
  const { remove } = useFireStore('cards');
  const { setLoading } = useLoading();

  const onUpdate = (id: string) => {
    router.push(`/update?id=${id}`);
  };
  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await remove(id);
      setLoading(false);
    } catch (error) {
      showError(error);
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
        keyExtractor={(item, index) => `${index}`}
        ItemSeparatorComponent={() => <Flex height={10} />}
        ListEmptyComponent={() => (
          <Flex justify="center" align="center" flex={1}>
            <Text>No data</Text>
          </Flex>
        )}
        renderItem={({ item }) => (
          <Flex
            padding={20}
            style={{
              backgroundColor: '#ddd',
            }}
            direction="row"
            gap={10}
          >
            <Flex flex={1} justify="flex-start" >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                {item.title}
              </Text>
            </Flex>
            <Flex gap={10}>
              <Button onPress={() => onUpdate(item.id)}>Update</Button>
              <Button onPress={() => onDelete(item.id)}>Delete</Button>
            </Flex>
          </Flex>
        )}
      />
      <Flex align="center">
        <Button onPress={onBack}>Back</Button>
      </Flex>
    </Flex>
  );
}
