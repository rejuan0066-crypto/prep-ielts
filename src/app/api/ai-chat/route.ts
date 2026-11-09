import { NextResponse } from 'next/server';
import { generateMihuResponse } from '@/lib/mihuAiEngine';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body.message || '';
    const response = generateMihuResponse(message);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { reply: 'দুঃখিত, কোনো একটি সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।', suggestions: [] },
      { status: 500 }
    );
  }
}
