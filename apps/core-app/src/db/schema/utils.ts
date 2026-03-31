export const createId = (prefix: string) => {
  return (
    prefix + Date.now().toString().slice(36) + crypto.randomUUID().slice(36)
  );
};
