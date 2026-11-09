import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users_db.json');

function getUsersDatabase(): Record<string, any> {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify({}, null, 2), 'utf8');
      return {};
    }
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(raw || '{}');
  } catch (error) {
    console.error('Error reading users database:', error);
    return {};
  }
}

function saveUsersDatabase(db: Record<string, any>) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(USERS_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing users database:', error);
  }
}

// GET: Retrieve a user profile by email or googleId
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email')?.toLowerCase();
    const googleId = searchParams.get('googleId');

    if (!email && !googleId) {
      return NextResponse.json({ success: false, error: 'Email or Google ID required' }, { status: 400 });
    }

    const db = getUsersDatabase();
    let userRecord = null;

    if (email && db[email]) {
      userRecord = db[email];
    } else if (googleId) {
      userRecord = Object.values(db).find((u: any) => u.profile?.googleId === googleId) || null;
    }

    if (!userRecord) {
      return NextResponse.json({ success: true, user: null, message: 'User not found' });
    }

    return NextResponse.json({ success: true, user: userRecord.profile });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Server error' }, { status: 500 });
  }
}

// POST: Save or update user profile
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, profile, password } = body;

    if (!email || !profile) {
      return NextResponse.json({ success: false, error: 'Email and profile required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const db = getUsersDatabase();

    const existing = db[cleanEmail];
    const mergedProfile = existing ? { ...existing.profile, ...profile } : profile;

    db[cleanEmail] = {
      email: cleanEmail,
      password: password || existing?.password || 'google_oauth_user',
      profile: mergedProfile,
      updatedAt: new Date().toISOString()
    };

    saveUsersDatabase(db);

    return NextResponse.json({ success: true, user: mergedProfile });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Server error' }, { status: 500 });
  }
}
