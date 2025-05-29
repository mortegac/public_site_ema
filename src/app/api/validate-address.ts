// pages/api/validate-address.js
import { NextApiRequest, NextApiResponse } from 'next';


const KEY = "AIzaSyBdAjJeBoZ8ehrL0byX2ZBHHtQSI6pfIvQ"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { address } = req.body;
    const apiKey = process.env.Maps_API_KEY; // Sin NEXT_PUBLIC si solo se usa en el backend

    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    try {
      const response = await fetch(
        `https://addressvalidation.googleapis.com/v1:validateAddress?key=${KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: {
              addressLines: [address],
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Google API Error: ${errorData.error.message}`);
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error: any) {
      console.error('Address validation error:', error.message);
      return res.status(500).json({ error: 'Failed to validate address', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}