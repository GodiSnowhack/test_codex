import { writeFile, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ORDERS_FILE = join(process.cwd(), 'orders.json');

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    if (!payload.name || !payload.phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Name and phone are required.' })
      };
    }

    const raw = await readFile(ORDERS_FILE, 'utf-8').catch(() => '[]');
    const orders = JSON.parse(raw);
    orders.push({ ...payload, timestamp: new Date().toISOString() });
    await writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Order stored.' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Unexpected error', error: error.message })
    };
  }
};
