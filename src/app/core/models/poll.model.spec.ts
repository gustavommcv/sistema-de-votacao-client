import { describe, expect, it } from 'vitest';
import { getPollStatus } from './poll.model';

const poll = {
  start_date: '2026-08-15T12:00:00.000Z',
  end_date: '2026-08-15T14:00:00.000Z',
};

describe('getPollStatus', () => {
  it.each([
    ['not-started', '2026-08-15T11:59:00.000Z'],
    ['in-progress', '2026-08-15T13:00:00.000Z'],
    ['finished', '2026-08-15T14:01:00.000Z'],
  ] as const)('retorna %s para a data informada', (expected, now) => {
    expect(getPollStatus(poll, new Date(now))).toBe(expected);
  });
});
