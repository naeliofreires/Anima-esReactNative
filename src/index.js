import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Animated} from 'react-native';

// Animated.View
// Animated.Text
// Animated.Image
// Animated.ScrollView

export default function App() {
  const [ballY] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(ballY, {
      toValue: 300,
      duration: 500,
    }).start();
  }, [ballY]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.ball,
            {
              top: ballY,
              opacity: ballY.interpolate({
                inputRange: [0, 300],
                outputRange: [1, 0.2],
                extrapolate: 'clamp',
              }),
            },
          ]}
        />
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

/*

  => linear com efeito elastico

  Animated.spring(ballY, {
    toValue: 300,
    bounciness: 20,
  }).start();

  Animated.decay(ballY, {
    velocity: 1,
  }).start();

  Animated.stagger(value,[]);

  Animated.loop(
    Animated.sequence([
      Animated.timing(ballY, {
        toValue: 200,
        duration: 500,
      }),

      Animated.delay(100),

      Animated.timing(ballX, {
        toValue: 200,
        duration: 500,
      }),

      Animated.delay(100),

      Animated.timing(ballY, {
        toValue: 0,
        duration: 500,
      }),

      Animated.delay(100),

      Animated.timing(ballX, {
        toValue: 0,
        duration: 500,
      }),
    ]),
  ).start();
*/
