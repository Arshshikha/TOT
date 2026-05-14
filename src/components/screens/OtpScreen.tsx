import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import { useLoginVerify, useRegisterComplete, useRegisterRequestOtp } from '../../hooks/useAuth';
import { useUser } from '../../context/UserContext';

type RouteParams = {
  phone: string;
  mode: 'login' | 'register';
  devOtp?: string;
};

export default function OtpScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { phone, mode, devOtp } = route.params as RouteParams;

  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');

  const { setAuthUser } = useUser();
  const loginVerify = useLoginVerify();
  const registerComplete = useRegisterComplete();
  const registerRequestOtp = useRegisterRequestOtp();

  const isRegister = mode === 'register';
  const isPending = loginVerify.isPending || registerComplete.isPending;

  const navigateToApp = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainTabs', state: { routes: [{ name: 'MyAccount' }] } }],
      })
    );
  };

  const handleVerify = async () => {
    if (otp.length < 4) {
      Alert.alert('Invalid OTP', 'Please enter the OTP sent to your phone.');
      return;
    }

    try {
      if (isRegister) {
        if (!email) {
          Alert.alert('Required', 'Please enter your email to complete registration.');
          return;
        }

        const res = await registerComplete.mutateAsync({
          phone,
          otp,
          email,
          firstName,
        });

        await setAuthUser(res.data.user);
      } else {
        const res = await loginVerify.mutateAsync({ phone, otp });
        await setAuthUser(res.data.user);
      }

      navigateToApp();
    } catch (err: any) {
      Alert.alert('Error', err?.message ?? 'Verification failed. Please try again.');
    }
  };

  const handleResend = async () => {
    try {
      if (isRegister) {
        await registerRequestOtp.mutateAsync({ phone });
      } else {
        navigation.goBack();
      }

      Alert.alert('Sent', 'A new OTP has been sent to your phone.');
    } catch (err: any) {
      Alert.alert('Error', err?.message ?? 'Failed to resend OTP.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>

      <Text style={styles.subtitle}>OTP sent to {phone}</Text>

      {devOtp ? (
        <Text style={styles.testOtp}>Test OTP: {devOtp}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        placeholder="Enter OTP"
        maxLength={6}
      />

      {isRegister && (
        <>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Email address *"
          />

          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name (optional)"
          />
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerify}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>VERIFY OTP</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    color: '#555',
  },
  testOtp: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#FF6600',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#FF6600',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendButton: {
    alignItems: 'center',
    padding: 10,
  },
  resendText: {
    color: '#FF6600',
    fontSize: 15,
  },
});