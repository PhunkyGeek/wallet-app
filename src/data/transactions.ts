export type TxType = "sent" | "received";
export type Transaction = {
  id: string;
  merchant: string;
  subtitle: string; // date/time
  amount: number;   // negative for sent, positive for received
  type: TxType;
  logo: "walmart" | "netflix" | "amazon" | "nike" | "topup" | "home_depot" | "reebok" | "apple" | "adidas";
};

export const transactions: Transaction[] = [
  { id:"1", merchant:"Walmart", subtitle:"Today 12:32", amount:-35.23, type:"sent", logo:"walmart" },
  { id:"2", merchant:"Top up", subtitle:"Yesterday 02:12", amount:+430.00, type:"received", logo:"topup" },
  { id:"3", merchant:"Netflix", subtitle:"Dec 24 13:53", amount:-13.00, type:"sent", logo:"netflix" },
  { id:"4", merchant:"Amazon", subtitle:"Dec 23 09:11", amount:-12.23, type:"sent", logo:"amazon" },
  { id:"5", merchant:"Nike", subtitle:"Dec 22 18:42", amount:-50.23, type:"sent", logo:"nike" },
  { id:"6", merchant:"The Home Depot", subtitle:"Dec 22 10:05", amount:-129.00, type:"sent", logo:"home_depot" },
  { id:"7", merchant:"Adidas", subtitle:"Dec 21 21:15", amount:-9.40, type:"sent", logo:"adidas" },
  { id:"8", merchant:"Apple", subtitle:"Dec 20 16:02", amount:-2.99, type:"sent", logo:"apple" },
  { id:"9", merchant:"Reebok", subtitle:"Dec 20 08:19", amount:-6.75, type:"sent", logo:"reebok" },
  { id:"10", merchant:"Top up", subtitle:"Dec 19 11:48", amount:+250.00, type:"received", logo:"topup" }
];
