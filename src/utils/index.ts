// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const joinPath = (...items: any) => {
  const path = items.join('/');
  return path;
};
