export const getContrastColor = (hex: string): string => {
  const cleanedHex = hex.replace(/^#/, "");

  const [r, g, b] =
    cleanedHex.length === 3
      ? [...cleanedHex].map((c) => Number.parseInt(c + c, 16))
      : cleanedHex.length === 6
        ? [0, 2, 4].map((i) => Number.parseInt(cleanedHex.slice(i, i + 2), 16))
        : (() => {
            throw new Error("Invalid HEX color.");
          })();

  const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

  return luminance < 0.5 ? "#FFFFFF" : "#000000";
};
