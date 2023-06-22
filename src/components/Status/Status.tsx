import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatusComponentProps {
  message: string;
}

const Status: React.FC<StatusComponentProps> = ({message }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
   
    messageText: {
      fontSize: 24, 
      textAlign: 'center',
      color: '#405DE6', 
    },
  });
  

export default Status;
