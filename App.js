import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FloatingButton from './FloatingButton';
import CircularReveal from './CircularReveal';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <FloatingButton style={styles.button} /> */}
      <CircularReveal style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkgrey',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  button: {
    marginBottom: 50,
  },
});
