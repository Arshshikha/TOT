import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import { saveToken } from '../api/client';
import type {
  RequestOtpBody,
  RegisterCompleteBody,
  LoginVerifyBody,
  AuthResponse,
  ApiError,
} from '../api/types';

export function useRegisterRequestOtp() {
  return useMutation<
    { data: { expiresAt: string } },
    ApiError,
    RequestOtpBody
  >({
    mutationFn: authApi.registerRequestOtp,
  });
}

export function useRegisterComplete() {
  return useMutation<AuthResponse, ApiError, RegisterCompleteBody>({
    mutationFn: authApi.registerComplete,
    onSuccess: async (res) => {
      await saveToken(res.data.accessToken);
    },
  });
}

export function useLoginRequestOtp() {
  return useMutation<
    { data: { expiresAt: string } },
    ApiError,
    RequestOtpBody
  >({
    mutationFn: authApi.loginRequestOtp,
  });
}

export function useLoginVerify() {
  return useMutation<AuthResponse, ApiError, LoginVerifyBody>({
    mutationFn: authApi.loginVerify,
    onSuccess: async (res) => {
      await saveToken(res.data.accessToken);
    },
  });
}
