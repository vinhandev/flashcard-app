import { Alert, Platform, ToastAndroid } from 'react-native';

export function showError(error: unknown) {
  const message = (error as Error)?.message || 'Something went wrong';
  console.error(message);
  Platform.OS === 'android'
    ? ToastAndroid.show(message, ToastAndroid.SHORT)
    : Alert.alert(message);
}
