export type Transaction = {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description?: string | null;
  date: Date;
};
