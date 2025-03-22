export const sanitizeInput = (input: string): string => {
  return input
    .replace(/,/g, ".")
    .replace(/[^\d.]/g, "")
    .split(".")
    .reduce((acc, part, i) => {
      if (i === 0) return part;
      if (i === 1) return `${acc}.${part}`;
      return acc;
    });
};
