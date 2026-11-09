import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'user_progress.json');

// Ensure data directory and database file exist
function getDatabase(): Record<string, any> {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify({}, null, 2), 'utf8');
      return {};
    }
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw || '{}');
  } catch (error) {
    console.error('Error reading progress database:', error);
    return {};
  }
}

function saveDatabase(db: Record<string, any>) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing progress database:', error);
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || searchParams.get('email') || 'default_user';

    const db = getDatabase();
    const userProgress = db[userId] || null;

    return NextResponse.json({ success: true, progress: userProgress });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch progress' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, userEmail, lastReadWord, index, category } = body;

    const userKey = userId || userEmail || 'default_user';

    const db = getDatabase();
    if (!db[userKey]) {
      db[userKey] = {
        userId: userKey,
        userEmail: userEmail || ''
      };
    }

    if (body.lastReadWord) {
      db[userKey].vocabulary = {
        lastReadWord: body.lastReadWord,
        index: body.index || 1,
        category: body.category || 'All',
        timestamp: Date.now(),
        updatedAt: new Date().toISOString()
      };
    }

    if (body.foundation) {
      db[userKey].foundation = {
        ...body.foundation,
        timestamp: Date.now(),
        updatedAt: new Date().toISOString()
      };
    }

    saveDatabase(db);

    return NextResponse.json({ success: true, progress: db[userKey] });
  } catch (error: any) {
    console.error('Progress POST error:', error);
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 });
  }
}
