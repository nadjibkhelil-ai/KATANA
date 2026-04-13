import { NextRequest, NextResponse } from 'next/server';

// In-memory store (persists during server session)
// In production, replace with a real database
let orders: Order[] = [];

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  specialInstructions?: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  basePrice: number;
  extras?: { name: string; price: number; count: number }[];
  addons?: string[];
  sauces?: string[];
  notes?: string;
}

// GET all orders
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const since = searchParams.get('since');

  let result = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (since) {
    result = result.filter(
      (o) => new Date(o.updatedAt).getTime() > new Date(since).getTime()
    );
  }

  return NextResponse.json({ orders: result, timestamp: new Date().toISOString() });
}

// POST new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const orderNumber = `KTN-${Date.now().toString().slice(-6)}`;
    const now = new Date().toISOString();

    const newOrder: Order = {
      id: `order-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      orderNumber,
      customerName: body.customerName || 'Client',
      customerPhone: body.customerPhone || '',
      customerAddress: body.customerAddress || '',
      items: body.items || [],
      totalPrice: body.totalPrice || 0,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
      specialInstructions: body.specialInstructions || '',
    };

    orders.unshift(newOrder);

    // Keep only last 500 orders in memory
    if (orders.length > 500) {
      orders = orders.slice(0, 500);
    }

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// PATCH update order status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const validStatuses = ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'];
    if (!id || !status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid id or status' }, { status: 400 });
    }

    const orderIndex = orders.findIndex((o) => o.id === id);
    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    orders[orderIndex] = {
      ...orders[orderIndex],
      status,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, order: orders[orderIndex] });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
