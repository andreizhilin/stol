import { describe, it, expect } from 'vitest';

import { buildSigninUri } from '.';

describe('Auth service', () => {
  it('buildSigninUri', () => {
    expect(buildSigninUri()).toContain('https://oauth.yandex.ru/authorize');
  });
});
