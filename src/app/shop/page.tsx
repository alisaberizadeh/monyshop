'use client';
export const dynamic = 'force-dynamic';
import dynamicImport from 'next/dynamic'; 

const ShopClient = dynamicImport(() => import('./ShopClient'), { ssr: false });

export default function ShopPage() {
  return <ShopClient />;
}
