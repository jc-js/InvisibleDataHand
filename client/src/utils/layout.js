/**
 * Returns a CSS width string using calc() to account for gaps in a flex layout.
 * Ensures that N items fit per row without wrapping due to the gap.
 * 
 * @param {number} itemsPerRow - number of items in the row
 * @param {number} gapPx - gap in pixels between items
 */

export const getResponsiveWidth = (itemsPerRow, gapPx = 0) => {
  const totalGap = (itemsPerRow - 1) * gapPx;
  const width = `calc(${100 / itemsPerRow}% - ${totalGap / itemsPerRow}px)`;
  return width;
};
