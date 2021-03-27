import { add } from './add';

describe('add', () => {
  it('should return 0 for an empty string', () => {
    expect(add('')).toEqual('0');
  });

  it('should return the value when called with a single number', () => {
    expect(add('1')).toEqual('1');
  });

  it('should return the sum when called with multiple numbers', () => {
    expect(add('1,2,3')).toEqual('6');
    expect(add('1.1,2.2')).toEqual('3.3');
  });

  it('should handle \\n as a separator', () => {
    expect(add('1\n2,3')).toEqual('6');
  });

  it('should return an error when the input contains two consecutive separators', () => {
    expect(add('1,2,\n3')).toEqual('Error: expected number, but found \n at position 4.');
    expect(add('1,2,3,\n3')).toEqual('Error: expected number, but found \n at position 6.');
    expect(add('1,2,3,,3')).toEqual('Error: expected number, but found , at position 6.');
  });

  it('should return an error message when the input ends with a spearator', () => {
    expect(add('1,2,')).toEqual('Error: expected number, but found EOF');
  });

  it('should handle a custom separator', () => {
    expect(add('//;\n1;2')).toEqual('3');
    expect(add('//;\n')).toEqual('0');
    expect(add('//;\n1;;2')).toEqual('Error: expected number, but found ; at position 6.');
    expect(add('//;\n1;')).toEqual('Error: expected number, but found EOF');
    expect(add('//sep\n1sep2')).toEqual('3');
  });

  it('should return an error when no custom separator is given', () => {
    expect(add('//')).toEqual('Error: expected a separator but found EOF.');
    expect(add('//;')).toEqual('Error: expected \n but found EOF.');
    expect(add('//\n')).toEqual('Error: expected a separator but found \n.');
    expect(add("//;\n1;2")).toEqual('3');
    expect(add("//|\n1|2|3")).toEqual('6');
    expect(add("//sep\n2sep3")).toEqual('5');
    expect(add("//|\n1|2,3")).toEqual('Error: expected | at position 7.');
    expect(add("//|\n1|2,3|4")).toEqual('Error: expected | at position 7.');
    expect(add("//sep\n2seb3")).toEqual('Error: expected sep at position 7.');
  });
});
