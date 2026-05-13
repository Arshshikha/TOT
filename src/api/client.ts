import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './config';
import type { ApiError } from './types';

export const TOKEN_STORAGE_KEY = 'auth_token';

export async function getStoredToken(): Promise<string | null> {
  return AsyncStorage.getItem(TOKEN_STORAGE_KEY);
}

export async function saveToken(token: string): Promise<void> {
  await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export async function removeToken(): Promise<void> {
  await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
}

type OnUnauthorized = () => void;

let onUnauthorizedCallback: OnUnauthorized | null = null;

export function setUnauthorizedHandler(fn: OnUnauthorized): void {
  onUnauthorizedCallback = fn;
}

function buildUrl(endpoint: string, params?: Record<string, unknown>): string {
  if (!params) return `${API_BASE_URL}${endpoint}`;

  const filtered = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== ''
  );
  if (filtered.length === 0) return `${API_BASE_URL}${endpoint}`;

  const qs = new URLSearchParams(
    filtered.map(([k, v]) => [k, String(v)])
  ).toString();
  return `${API_BASE_URL}${endpoint}?${qs}`;
}

async function request<T>(
  endpoint: string,
  options: RequestInit & { params?: Record<string, unknown> } = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;
  const token = await getStoredToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = buildUrl(endpoint, params);
  const res = await fetch(url, { ...fetchOptions, headers });

  if (res.status === 401) {
    await removeToken();
    onUnauthorizedCallback?.();
    const err: ApiError = { status: 401, message: 'Unauthorized' };
    throw err;
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: 'Request failed' }));
    const err: ApiError = { status: res.status, ...body };
    throw err;
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  get<T>(endpoint: string, params?: Record<string, unknown>) {
    return request<T>(endpoint, { method: 'GET', params });
  },
  post<T>(endpoint: string, body?: unknown) {
    return request<T>(endpoint, {
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },
  put<T>(endpoint: string, body?: unknown) {
    return request<T>(endpoint, {
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },
  delete<T>(endpoint: string, body?: unknown) {
    return request<T>(endpoint, {
      method: 'DELETE',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },
};
