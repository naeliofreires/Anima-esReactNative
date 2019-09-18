import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
  Dimensions,
  Alert,
} from 'react-native';

const {width} = Dimensions.get('window');

export default function User({user, onPress}) {
  const [opacity] = useState(new Animated.Value(0));
  const [offSet] = useState(new Animated.ValueXY({x: 0, y: 50}));

  const _panResponder = PanResponder.create({
    onPanResponderTerminationRequest: () => false, // continue executando mesmo se eu sair em cima do elemento
    onMoveShouldSetPanResponder: () => true,

    // quando o usuario clicar e arrastar
    onPanResponderMove: Animated.event([
      null,
      {
        dx: offSet.x,
      },
    ]),

    // quando o usuario soltar o card
    onPanResponderRelease: () => {
      if (offSet.x._value < -200) {
        Alert.alert('Deleted!');
      }

      Animated.spring(offSet.x, {
        toValue: 0,
        bounciness: 10,
      }).start();
    },

    // solucao para o Android
    onPanResponderTerminate: () => {
      Animated.spring(offSet.x, {
        toValue: 0,
        bounciness: 10,
      }).start();
    },
  });

  useEffect(() => {
    Animated.parallel([
      // efeito chiclete
      Animated.spring(offSet.y, {
        toValue: 0,
        speed: 5,
        bounciness: 20,
      }),

      // efeito opacity
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
      }),
    ]).start();
  }, [offSet.y, opacity]);

  return (
    <Animated.View
      {..._panResponder.panHandlers}
      style={[
        {
          transform: [
            ...offSet.getTranslateTransform(),
            {
              rotateZ: offSet.x.interpolate({
                inputRange: [-width, width],
                outputRange: ['-50deg', '50deg'],
              }),
            },
          ],
        },
        {opacity: opacity},
      ]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.userContainer}>
          <Image style={styles.thumbnail} source={{uri: user.thumbnail}} />

          <View style={[styles.infoContainer, {backgroundColor: user.color}]}>
            <View style={styles.bioContainer}>
              <Text style={styles.name}>{user.name.toUpperCase()}</Text>
              <Text style={styles.description}>{user.description}</Text>
            </View>
            <View style={styles.likesContainer}>
              <Text style={styles.likes}>{user.likes}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'column',
    marginHorizontal: 15,
  },

  thumbnail: {
    width: '100%',
    height: 150,
  },

  infoContainer: {
    backgroundColor: '#57BCBC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },

  bioContainer: {
    flex: 1,
  },

  name: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 10,
  },

  description: {
    color: '#FFF',
    fontSize: 13,
    marginTop: 2,
  },

  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
  },

  likes: {
    color: '#FFF',
    fontSize: 12,
    marginLeft: 5,
  },
});
