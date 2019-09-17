import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Animated} from 'react-native';

// Animated.View
// Animated.Text
// Animated.Image
// Animated.ScrollView

export default function App() {
  const [ballY] = useState(new Animated.Value(0));
  const [ballX] = useState(Animated.divide(ballY, 2));

  useEffect(() => {
    // linear
    // Animated.timing(ballY, {
    //   toValue: 500,
    //   duration: 1000,
    // }).start();

    // linear com efeito elastico
    // Animated.spring(ballY, {
    //   toValue: 300,
    //   bounciness: 20,
    // }).start();

    Animated.decay(ballY, {
      velocity: 1,
    }).start();
  }, [ballY]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Animated.View style={[styles.ball, {top: ballY, left: ballX}]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  ball: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'red',
  },
});
