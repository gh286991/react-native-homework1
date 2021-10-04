import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useCallback } from 'react';
import { Animated, StyleSheet, Text, TextInput, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';

export default function App() {
  const [phone, setPhone] = useState<string>('');
  const [isInitial, setIsInitial] = useState<boolean>(true);
  const [right, setRight] = useState<boolean>(true);
  const anim = useRef(new Animated.Value(0));
  const rightAnswer = '0919-123-456';

  const shake = useCallback(() => {
    // makes the sequence loop
    Animated.loop(
      // runs the animation array in sequence
      Animated.sequence([
        Animated.timing(anim.current, {
          toValue: -5,
          duration: 50,
          useNativeDriver: true,
        }),

        Animated.timing(anim.current, {
          toValue: 5,
          duration: 50,
          useNativeDriver: true,
        }),

        Animated.timing(anim.current, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]),
      // loops the above animation config 2 times
      { iterations: 2 },
    ).start();
  }, []);

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

  const onClickAnswer = () => {
    if (phone === rightAnswer) {
      setRight(true);
      setIsInitial(false);
    } else {
      shake();
      setRight(false);
      setIsInitial(false);
    }
  };

  return (
    <>
      <StatusBar style="auto" />
      <LinearGradient colors={['#a1c4fd', '#c2e9fb']} style={styles.linearGradient}>
        <SafeAreaView style={styles.container}>
          <Text>請輸入正確的電話號碼: </Text>

          <Animated.View
            style={{
              transform: [{ translateX: anim.current }],
              ...(right ? styles.input : styles.wrongInput),
            }}
          >
            <TextInput
              maxLength={12}
              keyboardType={'number-pad'}
              onChangeText={(value) => {
                normalizeInput(value);
              }}
            >
              {phone}
            </TextInput>
          </Animated.View>
          <Text>你輸入的號碼:{phone}</Text>
          {right && !isInitial ? (
            <Text style={{ color: 'red', fontSize: 20 }}>輸入正確</Text>
          ) : null}
          <Button onPress={onClickAnswer} style={styles.button}>
            <Text style={{ color: 'white', fontSize: 18 }}>確定</Text>
          </Button>
        </SafeAreaView>
      </LinearGradient>
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
  wrongInput: {
    width: '60%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'red',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#66B3FF',
    margin: 20,
  },
});
