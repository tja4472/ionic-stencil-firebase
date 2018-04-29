// Force typescript to treat as module.
export {};

describe('Jest Tests', () => {
  describe('group name 1', () => {
    it('test name 1', async () => {
      expect(3).toBe(3);
    });

    it('test name 2', async () => {
      expect(3).toBe(3);
    });
  });

  describe('group name 2', () => {
    it('test name 3', async () => {
      debugger;
      expect(3).toBe(3);
    });
  });
});
