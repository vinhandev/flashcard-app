import { Slot } from 'expo-router';
import { Flex } from '../src/components';
import { ActivityIndicator, Dimensions, Text } from 'react-native';
import useLoading from '../src/hooks/useLoading';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  const { loading } = useLoading();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Slot />

      <Flex
        style={{
          display: loading ? 'flex' : 'none',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,

          zIndex: 2,

          justifyContent: 'center',
          alignItems: 'center',

          backgroundColor: '#00000099',
        }}
      >
        <ActivityIndicator
          style={{ zIndex: 3 }}
          color={'#fff'}
          size={'large'}
        />
      </Flex>
    </SafeAreaView>
  );
};

export default App;
