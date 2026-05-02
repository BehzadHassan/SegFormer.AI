import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const apiUrl = req.headers.get('x-api-url');
    
    if (!apiUrl) {
      return NextResponse.json({ error: 'API URL is required' }, { status: 400 });
    }

    // Clean URL
    const cleanUrl = apiUrl.trim().replace(/\/$/, '');

    const response = await fetch(`${cleanUrl}/predict`, {
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning': 'true'
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error response:', errorText);
      return NextResponse.json(
        { error: `Backend error: ${response.status} ${response.statusText}` }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request to backend. Ensure Ngrok URL is correct and backend is running.' }, 
      { status: 500 }
    );
  }
}
