import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, SafeAreaView } from 'react-native';

export default function App() {
  const [phone, setPhone] = useState<string>('');

  const normalizeInput = (value: string) => {
    if (!value) return setPhone(value);
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!phone || value.length > phone.length) {
      if (cvLength < 4) return setPhone(currentValue);
      if (cvLength < 7) return setPhone(`${currentValue.slice(0, 4)}-${currentValue.slice(4)}`);
      return setPhone(
        `${currentValue.slice(0, 4)}-${currentValue.slice(4, 7)}-${currentValue.slice(7, 10)}`,
      );
    }
  };

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <Text>請輸入正確的電話號碼:</Text>
        <TextInput
          style={styles.input}
          maxLength={12}
          keyboardType={'number-pad'}
          onChangeText={(value) => {
            normalizeInput(value);
          }}
        >
          {phone}
        </TextInput>
        <Text>你輸入的號碼:{phone}</Text>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'red',
  },
  input: {
    width: '60%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
