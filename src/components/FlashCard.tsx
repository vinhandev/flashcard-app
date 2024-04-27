import { Dimensions, Image, ScrollView, Text } from 'react-native';
import { Flex } from '.';
import { CardProps } from '../types';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import useLoading from '../hooks/useLoading';

import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const colors = ['#BED7DC', '#FFB996', '#F6F7C4', '#756AB6', '#F3EEEA'];

type Props = {
  isOpen: boolean;
  title: string;
  description: string;
  repeatLevel: number;
  selectedCard: CardProps | null;
  type: 'word' | 'image';
  id: string;
  image: string;
};

const maxHeight = Dimensions.get('window').height - 250;

export default function FlashCard({
  id,
  repeatLevel,
  title,
  description,
  isOpen,
  selectedCard,
  type,
  image,
}: Props) {
  const flip = useSharedValue(0);
  const scale = useSharedValue(2);
  const opacity = useSharedValue(0);
  const { loading } = useLoading();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      {
        translateY: translateY.value,
      },
    ],
  }));

  const animatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(flip.value, [0, 1], [0, 180]);
    return {
      opacity: opacity.value,
      transform: [
        {
          scale: scale.value,
        },
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(flip.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
      flex: 1,
    };
  }, []);

  useEffect(() => {
    flip.value = isOpen ? 1 : 0;
  }, [isOpen, id]);

  useEffect(() => {
    if (loading) {
      scale.value = 2;
      opacity.value = 0;
    } else {
      scale.value = withSpring(1);
      opacity.value = withTiming(1);
    }
  }, [loading]);

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[{ flex: 1, zIndex: 20 }, containerStyle]}>
        <Flex flex={1}>
          <Flex
            padding={20}
            justify="center"
            style={{
              height: maxHeight,
            }}
          >
            <Animated.View
              style={[
                animatedStyle,
                {
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,

                  backfaceVisibility: 'hidden',
                },
              ]}
            >
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
                <Flex align="center" direction="row" justify="space-between">
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 14,
                      color: '#555',
                    }}
                  >
                    #{id}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#555',
                      position: 'absolute',
                      left: 0,
                      right: 0,
                    }}
                  >
                    {'Title'}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 14,
                      color: '#555',
                    }}
                  >
                    {repeatLevel !== undefined ? repeatLevel + 1 : ''}
                  </Text>
                </Flex>
                <Flex flex={1} justify="center" align="center">
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
              </Flex>
            </Animated.View>
            <Animated.View
              style={[
                backAnimatedStyle,
                {
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,

                  backfaceVisibility: 'hidden',
                },
              ]}
            >
              <Flex
                flex={1}
                gap={10}
                style={{
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginHorizontal: 25,
                  padding: 20,

                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.4,
                  shadowRadius: 2,
                }}
              >
                <Flex align="center" direction="row" justify="space-between">
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 14,
                      color: '#555',
                    }}
                  >
                    #{id}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#555',
                      position: 'absolute',
                      left: 0,
                      right: 0,
                    }}
                  >
                    {'Description'}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 14,
                      color: '#555',
                    }}
                  >
                    {repeatLevel !== undefined ? repeatLevel + 1 : ''}
                  </Text>
                </Flex>
                <Flex
                  flex={1}
                  justify="center"
                  style={{
                    height: maxHeight - 80,
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
              </Flex>
            </Animated.View>
          </Flex>
        </Flex>
      </Animated.View>
    </GestureDetector>
  );
}
