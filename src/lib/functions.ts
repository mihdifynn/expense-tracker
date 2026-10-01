import type { CashFlow } from "@/lib/types";



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

export function isCashFlow(value: unknown): value is CashFlow {
    return value === 'in' || value === 'out';
}