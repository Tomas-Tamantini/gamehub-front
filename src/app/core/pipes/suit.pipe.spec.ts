import { SuitPipe } from './suit.pipe';

describe('SuitPipe', () => {
  it('create an instance', () => {
    const pipe = new SuitPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the correct suit symbol', () => {
    const pipe = new SuitPipe();
    expect(pipe.transform('h')).toBe('♥');
    expect(pipe.transform('d')).toBe('♦');
    expect(pipe.transform('c')).toBe('♣');
    expect(pipe.transform('s')).toBe('♠');
  });
});
