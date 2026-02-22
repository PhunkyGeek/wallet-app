export const money = (n: number) =>
  n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const signMoney = (n: number) => {
  const abs = Math.abs(n);
  const prefix = n < 0 ? "-" : "+";
  return `${prefix}$${money(abs)}`;
};
