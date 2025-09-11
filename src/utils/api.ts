import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { toastifyError } from '../common/AlertMsg';

// Types
interface ApiResponse<T = any> {
  data: T;
  code?: string;
  [key: string]: any;
}

interface TableResponse<T = any> {
  Table?: T[];
  Table1?: any[];
  [key: string]: any;
}

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const errorMessage =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      'An error occurred';
    toastifyError(errorMessage);
    return Promise.reject(error);
  }
);


/**
 * Add, Update, or Delete data
 */
export const addUpdateDelete = async <T = any>(
  url: string,
  postData: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await api.post<ApiResponse<T>>(url, postData, config);
    return response.data;
  } catch (error) {
    console.error('Error in addUpdateDelete:', error);
    throw error;
  }
};

/**
 * Get data with POST request (returns Table array)
 */
export const getPostData = async <T = any>(
  url: string,
  postData: any,
  config?: AxiosRequestConfig
): Promise<T[]> => {
  try {
    const response = await api.post<ApiResponse<string>>(url, postData, config);
    if (response.data.data) {
      const parsed: TableResponse<T> = JSON.parse(response.data.data);
      return parsed.Table || [];
    }
    return [];
  } catch (error) {
    console.error('Error in getPostData:', error);
    return [];
  }
};

/**
 * Get data with GET request (returns Table array)
 */
export const getData = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T[]> => {
  try {
    const response = await api.get<ApiResponse<string>>(url, config);
    if (response.data.data) {
      const parsed: TableResponse<T> = JSON.parse(response.data.data);
      return parsed.Table || [];
    }
    return [];
  } catch (error) {
    console.error('Error in getData:', error);
    return [];
  }
};

/**
 * Fetch data with authentication from sessionStorage
 */
export const fetchDataWithAuth = async <T = any>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T | undefined> => {
  try {
    const auth = JSON.parse(sessionStorage.getItem('auth') || '{}');
    const apiConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config?.headers,
        ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
      },
    };

    const apiUrl = `${process.env.REACT_APP_Base_URL || ''}${endpoint}`;
    const response = await api.get<T>(apiUrl, apiConfig);
    return response.data;
  } catch (error) {
    console.error('Error in fetchDataWithAuth:', error);
    return undefined;
  }
};

/**
 * Simple fetch data without auth
 */
export const fetchData = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T | undefined> => {
  try {
    const response = await api.get<T>(url, config);
    return response.data;
  } catch (error) {
    console.error('Error in fetchData:', error);
    return undefined;
  }
};

export default {
  addUpdateDelete,
  getPostData,
  getData,
  fetchDataWithAuth,
  fetchData,
};
