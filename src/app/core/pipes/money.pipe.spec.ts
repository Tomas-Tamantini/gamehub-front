import { MoneyPipe } from './money.pipe';

describe('MoneyPipe', () => {
  it('should create an instance', () => {
    const pipe = new MoneyPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return $0.00 for 0', () => {
    const pipe = new MoneyPipe();
    expect(pipe.transform(0)).toBe('$0.00');
  });

  it('should assume value to be in cents', () => {
    const pipe = new MoneyPipe();
    expect(pipe.transform(1234)).toBe('+$12.34');
  });

  it('should return plus or minus signal if not $0.00', () => {
    const pipe = new MoneyPipe();
    expect(pipe.transform(100)).toBe('+$1.00');
    expect(pipe.transform(-3)).toBe('-$0.03');
  });
});
