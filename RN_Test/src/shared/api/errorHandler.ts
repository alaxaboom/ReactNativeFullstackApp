import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function extractErrorMessage(err: unknown): string {
  if (typeof err === 'object' && err !== null) {
    if ('status' in err) {
      const error = err as FetchBaseQueryError;
      if (typeof error.data === 'object' && error.data && 'message' in error.data) {
        return (error.data as { message: string }).message;
      }
      return `Request failed with status ${error.status}`;
    }
    if ('message' in err) {
      return (err as { message: string }).message;
    }
  }
  return 'An unknown error occurred';
}

