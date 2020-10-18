module.exports = function toReadable (number) {
  const units = 'one,two,three,four,five,six,seven,eight,nine'.split(',');
  const teens = 'eleven,twelve,thirteen,fourteen,fifteen,sixteen,seventeen,eighteen,nineteen'.split(',');
  const tens = 'ten,twenty,thirty,forty,fifty,sixty,seventy,eighty,ninety'.split(',');
  const hundreds = units.map(s => s + ' hundred');
  const words = [units,tens,hundreds];

  return Array.from(String(number))
        .map(Number)
        .reverse() // for using array index as number rank
        .map((digit, index, digits_arr) => {
            if(digit == 0) // zeros do not convert to words
                return null;
            if(index == 0 && digits_arr[1] == 1) // lookahead for teens
                return teens[digit-1];
            if(index == 1 && digit == 1 && digits_arr[0] > 0) // lookbehind for teens
                return null;
            return words[index][digit-1];
        })
        .filter(s => s)
        .reverse()
        .join(' ')
        || 'zero';
}
