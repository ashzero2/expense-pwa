import { Hono } from 'hono';
import prisma from '../db.js';
import type { Transaction } from '../types.js';

// Hono route for transaction-related endpoints
const transaction = new Hono();

transaction.post('/add', async (c) => {
  const body = await c.req.json();

	const { amount, type, category, description, date }: Transaction = body;
	const newTransaction = await prisma.transaction.create({
		data: {
			amount: parseFloat(amount as unknown as string),
			type,
			category,
			description: description || null,
			date: new Date(date),
		},
	});
	console.log('New Transaction Added:', newTransaction);
	return c.json(newTransaction, 201);
});

transaction.get('/list', async (c) => {
  const transactions = await prisma.transaction.findMany();
  return c.json(transactions);
});

export default transaction;
