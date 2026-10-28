import type { AppData } from "@/lib/types";

import { CASH_FLOWS } from "@/lib/constants";



export function formatRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(amount)
}


export function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

export function isCashFlow(value: unknown): value is typeof CASH_FLOWS[number] {
    return (CASH_FLOWS as readonly unknown[]).includes(value);
}


export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


function getCuttofDate() {

  const date = new Date();
  date.setFullYear(date.getFullYear() - 1, date.getMonth(), 1);

  return date.toLocaleDateString('en-CA')
}


export function deleteOldExpenses(data: AppData): AppData {

  const cutoff = getCuttofDate();

  const oldExpenses = data.expenses.filter(exp => exp.date < cutoff);
  if (oldExpenses.length === 0) return data

  const deltaMap = new Map<string, number>();
  const add = (id: string, n: number) => deltaMap.set(id, (deltaMap.get(id) ?? 0) + n);

  for (const e of oldExpenses) {
    if (e.flow === 'in') {
      add(e.accountId, e.amount);
    }
    else if (e.flow === 'out') {
      add(e.accountId, -e.amount);
    }
    else if (e.flow === 'transfer') {
      add(e.accountId, -e.amount);
      add(e.toAccountId, e.amount);
    }
  }

  return {
    ...data,
    accounts: data.accounts.map(acc => ({
      ...acc,
      startBalance: acc.startBalance + (deltaMap.get(acc.id) ?? 0)
    })),
    expenses: data.expenses.filter(exp => exp.date >= cutoff)
  }
}