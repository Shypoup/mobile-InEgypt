import {StyleSheet, Text, View} from 'react-native';

import React from 'react';

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hello from Explore</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default ExploreScreen;
