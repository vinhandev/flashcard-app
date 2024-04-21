import { ReactNode } from 'react';
import {
  DimensionValue,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native';

export const Flex = ({
  style,
  flex,
  direction,
  justify,
  align,
  isTesting,
  padding,
  width,
  height,
  gap,
  ...props
}: ViewProps & {
  flex?: number;
  direction?: 'row' | 'column';
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: 'center' | 'flex-start' | 'flex-end';
  isTesting?: boolean;
  padding?: number;
  width?: DimensionValue;
  height?: DimensionValue;
  gap?: number;
}) => {
  return (
    <View
      style={[
        {
          flex,
          flexDirection: direction,
          justifyContent: justify,
          alignItems: align,
          padding,
          width,
          height,
          gap,
        },
        style,
        isTesting && { borderWidth: 1, backgroundColor: 'red' },
      ]}
      {...props}
    />
  );
};

export const Button = ({
  children,
  onPress,
  ...props
}: {
  children: ReactNode;
  onPress: () => void;
} & TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: props.disabled ? '#ccc' : '#124076',
        opacity: props.disabled ? 0.6 : 1,

        borderRadius: 5,
      }}
      onPress={onPress}
      {...props}
    >
      <Text
        style={{
          textAlign: 'center',
          color: props.disabled ? '#000' : 'white',
          fontSize: 20,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export const CustomInput = ({ style, ...props }: TextInputProps) => {
  return (
    <TextInput
      style={[
        {
          padding: 20,
          borderRadius: 10,
          justifyContent: 'flex-start',
          backgroundColor: '#fff',
          borderWidth:1,
          borderColor:'#ccc',

          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 2,
        },
        style,
      ]}
      {...props}
    />
  );
};
