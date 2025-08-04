import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen } from '@/screens/HomeScreen';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HomeScreen />
    </GestureHandlerRootView>
  );
}
