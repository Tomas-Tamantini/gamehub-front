import { MoneyPipe } from './money.pipe';

describe('MoneyPipe', () => {
  it('should create an instance', () => {
    const pipe = new MoneyPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return $0.00 for 0', () => {
    const pipe = new MoneyPipe();
    expect(pipe.transform(0)).toBe('$0.00');
    expect(pipe.transform(0.001)).toBe('$0.00');
    expect(pipe.transform(-0.001)).toBe('$0.00');
  });

  it('should return plus or minus signal if not $0.00', () => {
    const pipe = new MoneyPipe();
    expect(pipe.transform(1)).toBe('+$1.00');
    expect(pipe.transform(-1)).toBe('-$1.00');
  });

  it('should round to 2 decimal places', () => {
    const pipe = new MoneyPipe();
    expect(pipe.transform(1.234)).toBe('+$1.23');
    expect(pipe.transform(1.239)).toBe('+$1.24');
    expect(pipe.transform(-1.234)).toBe('-$1.23');
    expect(pipe.transform(-1.236)).toBe('-$1.24');
  });
});
