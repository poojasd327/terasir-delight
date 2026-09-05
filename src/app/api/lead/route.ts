import { NextResponse } from 'next/server';

const TELECRM_WEBHOOK_URL =
  process.env.CRM_WEBHOOK_URL ||
  'https://api.telecrm.in/gw/api/leads/webapi/39c86884-2812-8378-dcf2-adf3-1c906cf41c58';

const FALLBACK_URL =
  'https://app.telecrm.in/gw/api/leads/webapi/39c86884-2812-8378-dcf2-adf3-1c906cf41c58';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, productName, quantity, location } = data;

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Format phone with country code if needed
    let cleanPhone = String(phone).replace(/[^0-9]/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = `+91${cleanPhone}`;
    } else if (cleanPhone.length > 10 && !cleanPhone.startsWith('+')) {
      cleanPhone = `+${cleanPhone}`;
    }

    const payload = {
      name: name || 'Website Visitor',
      phone: cleanPhone,
      phoneNumber: cleanPhone,
      product: productName || 'Not Specified',
      productName: productName || 'Not Specified',
      quantity: quantity || 'Standard pack',
      location: location || 'Not Specified',
      source: 'Website 10s Lead Popup',
      notes: `Product: ${productName || '—'} | Quantity: ${quantity || '—'} | Location: ${location || '—'}`,
      fields: {
        product: productName,
        quantity: quantity,
        location: location,
        lead_source: 'Website 10s Lead Popup',
      },
    };

    let response = await fetch(TELECRM_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).catch(() => null);

    // If first endpoint failed, try fallback endpoint
    if (!response || !response.ok) {
      response = await fetch(FALLBACK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).catch(() => null);
    }

    return NextResponse.json({
      success: true,
      message: 'Lead sent successfully to CRM',
    });
  } catch (error: any) {
    console.error('Error forwarding lead to CRM webhook:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
