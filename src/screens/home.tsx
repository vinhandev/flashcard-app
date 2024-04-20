import { StatusBar } from 'expo-status-bar';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, Flex } from '../components';
import useZutand from '../store';
import { useEffect, useState } from 'react';
import { CardProps } from '../types';
import { router } from 'expo-router';

const maxHeight = Dimensions.get('window').height -300;
export default function HomeScreen() {
  const cards = useZutand((state) => state.cards);
  const updateCard = useZutand((state) => state.updateCard);

  const filteredCard = [...cards].sort((a, b) => a.repeatLevel - b.repeatLevel);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const isCardEmpty = cards.length === 0;

  const selectedCard = isCardEmpty ? null : filteredCard[selectedIndex];

  function onPrevious() {
    if (selectedIndex === 0) return;
    setSelectedIndex(selectedIndex - 1);
  }

  function onNext() {
    if (selectedIndex === filteredCard.length - 1) return;
    setSelectedIndex(selectedIndex + 1);
  }

  function onKnow() {
    if (isCardEmpty || selectedCard === null) return;
    updateCard(selectedIndex, {
      ...selectedCard,
      repeatLevel: 1,
    });
  }

  function onAdd() {
    router.push('/add')
  }

  function onTriggerCard() {
    setIsOpen(!isOpen);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex flex={1} justify="space-evenly" gap={20} padding={20}>
        <Flex align="center">
          <Button onPress={onAdd}>Add Card</Button>
        </Flex>
        <Flex flex={1}>
          <ScrollView>
            <Flex padding={20} justify="center" align="center" flex={1}>
              {isOpen ? (
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
                    }}
                  >
                    {JSON.stringify(selectedCard)}
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Quibusdam earum perspiciatis eligendi odit, ut maiores quasi
                    doloremque obcaecati soluta eum exercitationem excepturi
                    doloribus facere, numquam praesentium corporis laboriosam id
                    laudantium?
                  </Text>
                </Flex>
              ) : (
                <Flex
                  flex={1}
                  justify="center"
                  align="center"
                  style={{
                    minHeight: maxHeight,
                  }}
                >
                  <Text>Left</Text>
                </Flex>
              )}
            </Flex>
          </ScrollView>
        </Flex>
        <Flex direction="row" gap={10} justify="center">
          <Button onPress={onTriggerCard}>Flip Card</Button>
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
