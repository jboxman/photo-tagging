//import { describe, it, expect } from 'vitest';

const selectListItemsJson = {
  value: '3',
  label: 'locality > US > FL',
};
// const tags = await import('./tags.json').then((module) => module.default);

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});
