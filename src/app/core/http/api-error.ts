import { HttpErrorResponse } from '@angular/common/http';
import type { ApiErrorBody } from '../models/api.model';

export function getApiErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (!(error instanceof HttpErrorResponse)) return fallback;
  const body = error.error as ApiErrorBody | undefined;
  return body?.errors?.[0]?.msg ?? body?.error ?? body?.message ?? fallback;
}
