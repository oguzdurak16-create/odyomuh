export function historicalYear(year, era) {
  if (!Number.isSafeInteger(year) || year < 1 || year > 1000000 || !['bce', 'ce'].includes(era)) throw new RangeError('1 ile 1.000.000 arasında tam bir yıl ve geçerli dönem seçin. Tarihsel gösterimde yıl 0 yoktur.');
  return era === 'bce' ? 1 - year : year;
}
export function historicalInterval(firstYear, firstEra, lastYear, lastEra) {
  const first = historicalYear(firstYear, firstEra), last = historicalYear(lastYear, lastEra);
  return { years: Math.abs(last - first), firstCentury: Math.ceil(firstYear / 100), lastCentury: Math.ceil(lastYear / 100), reverse: last < first };
}
