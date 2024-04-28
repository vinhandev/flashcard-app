import { Alert, Platform } from 'react-native';

export function showError(error: unknown) {
  const message = (error as Error)?.message || 'Something went wrong';
  console.error(message);
  Alert.alert(message);
}
