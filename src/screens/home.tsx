import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { Button, Flex } from '../components';
import useZutand from '../store';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import useFireStore from '../hooks/useFireStore';
import { CardProps } from '../types';
import { showError } from '../utils';
import useLoading from '../hooks/useLoading';
import { useSupabase } from '../hooks/useSupabase';

const maxHeight = Dimensions.get('window').height - 300;
const colors = ['#BED7DC', '#FFB996', '#F6F7C4', '#756AB6', '#F3EEEA'];
export default function HomeScreen() {
  const cards = useZutand((state) => state.cards);
  const setCards = useZutand((state) => state.setCards);
  const updateCard = useZutand((state) => state.updateCard);

  const filteredCard = [...cards].sort((a, b) => a.repeatLevel - b.repeatLevel);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const isCardEmpty = cards.length === 0;

  const selectedCard = isCardEmpty ? null : filteredCard[selectedIndex];
  const { title, type, description, image } = selectedCard ?? {};
  const { getAll, update } = useSupabase();
  const { setLoading } = useLoading();
  useEffect(() => {
    async function init() {
      setLoading(true);
      try {
        const response = await getAll();

        setCards(response);
      } catch (error) {
        showError(error);
      }
      setLoading(false);
    }

    init();
  }, []);

  function onNext() {
    setIsOpen(false);
    if (selectedIndex === filteredCard.length - 1) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(selectedIndex + 1);
    }
  }

  function isCardCanReset() {
    return cards.every((card) => card.repeatLevel === 4);
  }

  async function onKnow() {
    if (isCardCanReset()) {
      setCards(
        cards.map((card) => {
          return {
            ...card,
            repeatLevel: 0,
          };
        })
      );
    } else {
      if (isCardEmpty || selectedCard === null) return;
      const id = selectedCard.id;
      const updatedCard = {
        description: selectedCard.description ?? '',
        repeatLevel: selectedCard.repeatLevel + 1,
        id: selectedCard.id,
        image: selectedCard.image ?? '',
        title: selectedCard.title ?? '',
        type: selectedCard.type,
      };
      try {
        setLoading(true);
        await update(id, updatedCard);
        setLoading(false);
      } catch (error) {
        showError(error);
      }
      updateCard(id, updatedCard);
    }

    onNext();
  }

  function onAdd() {
    router.push('/add');
  }
  function onNavigateList() {
    router.push('/list');
  }

  function onTriggerCard() {
    setIsOpen(!isOpen);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>
      <Flex
        flex={1}
        justify="space-evenly"
        gap={20}
        style={{
          paddingVertical: 20,
        }}
      >
        <Flex justify="center" direction="row" gap={10}>
          <Button onPress={onAdd}>Add Card</Button>
          <Button onPress={onNavigateList}>Card List</Button>
        </Flex>
        {!isCardEmpty ? (
          <Flex
            flex={1}
            gap={10}
            style={{
              borderRadius: 10,
              backgroundColor: colors[selectedCard?.repeatLevel ?? 0],
              marginHorizontal: 25,
              padding: 20,

              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.4,
              shadowRadius: 2,
            }}
          >
            <Flex align="center">
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#555',
                }}
              >
                {!isOpen ? 'Title' : 'Description'}
              </Text>
            </Flex>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Flex padding={20} justify="center" flex={1}>
                {!isOpen ? (
                  <Flex
                    flex={1}
                    justify="center"
                    align="center"
                    style={{
                      minHeight: maxHeight,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {title}
                    </Text>
                  </Flex>
                ) : (
                  <Flex
                    flex={1}
                    justify="center"
                    style={{
                      minHeight: maxHeight,
                    }}
                  >
                    {type === 'word' && (
                      <Text
                        style={{
                          textAlign: 'center',
                        }}
                      >
                        {description}
                      </Text>
                    )}
                    {type === 'image' && (
                      <Flex flex={1}>
                        <Image
                          source={{ uri: image }}
                          style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                          }}
                        />
                      </Flex>
                    )}
                  </Flex>
                )}
              </Flex>
            </ScrollView>
            )
          </Flex>
        ) : (
          <Flex flex={1} justify="center" align="center">
            <Text>No Card</Text>
          </Flex>
        )}
        <Flex direction="row" justify="space-around">
          <Button onPress={onTriggerCard}>Flip</Button>
          <Button onPress={onKnow}>I know it</Button>
          <Button onPress={onNext}>Next</Button>
        </Flex>
      </Flex>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
