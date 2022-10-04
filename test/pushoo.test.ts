// Tests for the CLI part of the project.

import pushooNotice from 'pushoo';

import { afterEach, describe, expect, test, vi } from 'vitest';
import { resolve } from '../src/utils/promise';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('pushoo', () => {
  test('pushoo ifttt test', async () => {
    const [ifttt_error, ifttt_rlt] = await resolve(
      pushooNotice('ifttt', {
        title: 'test',
        content: 'test',
        token: 'test'
      })
    );

    expect(ifttt_rlt).toBeDefined();
  });
});
