const round = (num: number) => Math.round(num * 1000) / 1000;

const findNextIndex = (str: string, separators: string[]) => {
  let found: { idx?: number, separator?: string } = {};

  for (const separator of separators) {
    const idx = str.indexOf(separator);

    if (idx >= 0 && (found.idx === undefined || idx < found.idx))
      found = { idx, separator };
  }

  return found;
};

export const add = (numbers: string): string => {
  if (numbers === '')
    return '0';

  let separators = [',', '\n'];
  let startPosition = 0;

  if (numbers.startsWith('//')) {
    if (numbers === '//')
      return 'Error: expected a separator but found EOF.';

    const { idx: backslackNIndex } = findNextIndex(numbers.slice(2), ['\n']);

    if (backslackNIndex === undefined)
      return 'Error: expected \n but found EOF.';

    separators = [numbers.substr(2, backslackNIndex)];

    if (separators[0] === '')
      return 'Error: expected a separator but found \n.';

    startPosition = 3 + separators[0].length;
  }

  if (separators.includes(numbers[numbers.length - 1]))
    return 'Error: expected number, but found EOF';

  let sum = 0;

  for (let i = startPosition; i < numbers.length; ++i) {
    const char = numbers[i];

    if (!char.match(/[0-9]/))
      return `Error: expected number, but found ${char} at position ${i}.`;

    const { idx: nextSeparatorIndex, separator = '' } = findNextIndex(numbers.slice(i), separators);
    const number = numbers.substr(i, nextSeparatorIndex);

    sum += parseFloat(number);
    i += number.length + separator.length - 1;

    if (i + 1 < numbers.length) {
      const { idx: nextIdx } = findNextIndex(numbers.slice(i), separators);

      if (nextIdx !== 0)
        return `Error: expected ${separators[0]} at position ${i}.`;
    }
  }

  return round(sum).toString();
};
