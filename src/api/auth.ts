import { api } from './client';
import type {
  RequestOtpBody,
  RequestOtpResponse,
  RegisterCompleteBody,
  LoginVerifyBody,
  AuthResponse,
} from './types';

export const authApi = {
  registerRequestOtp(body: RequestOtpBody) {
    return api.post<RequestOtpResponse>('/auth/customer/register/request-otp', body);
  },

  registerComplete(body: RegisterCompleteBody) {
    return api.post<AuthResponse>('/auth/customer/register/complete', body);
  },

  loginRequestOtp(body: RequestOtpBody) {
    return api.post<RequestOtpResponse>('/auth/customer/login/request-otp', body);
  },

  loginVerify(body: LoginVerifyBody) {
    return api.post<AuthResponse>('/auth/customer/login/verify', body);
  },
};
