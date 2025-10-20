import { Hono } from 'hono';
import prisma from '../db.js';

// Hono route for transaction-related endpoints
const dashboard = new Hono();

dashboard.get('/overview', async (c) => {
  const transactions = await prisma.transaction.findMany();

  const totalIncome = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);
	const balance = totalIncome - totalExpense;

	console.log({ totalIncome, totalExpense, balance });

  return c.json({ totalIncome, totalExpense, balance });
});

dashboard.get('/list', async (c) => {
  const transactions = await prisma.transaction.findMany();
  return c.json(transactions);
});

export default dashboard;
