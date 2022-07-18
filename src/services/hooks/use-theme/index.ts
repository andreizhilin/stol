export function useTheme() {
  const theme = {
    colors: {
      red: '#FF5630',
      yellow: '#FFAB00',
      green: '#36B37E',
      teal: '#00B8D9',
      purple: '#6554C0',
    },
  } as const;

  return theme;
}
