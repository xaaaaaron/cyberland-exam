import { Text, StyleSheet, Pressable, PressableProps } from 'react-native';
import { ChevronLeft } from '../icons/ChevronLeft';

type ButtonProps = PressableProps;

export const BackButton = (props: ButtonProps) => {
  return (
    <Pressable style={styles.container} {...props}>
      <ChevronLeft size={24} color="white" />
      <Text style={styles.back}>Back</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
