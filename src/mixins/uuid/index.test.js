import getUUID from './index';

it('returns a negative number', async () => {
  expect(getUUID()).toBeLessThan(0);
});

it('returns progressively decreasing numbers', async () => {
  const first = getUUID();
  const sec = getUUID();
  const third = getUUID();
  expect(third).toBeLessThan(sec);
  expect(sec).toBeLessThan(first);
  expect(first).toBeLessThan(0);
});
