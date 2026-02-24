// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
export async function POST(request) {
  try {
    const { firstName, lastName, email, phone, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('yourDatabaseName'); // Replace with your actual database name
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 409 }
      );
    }

    // IMPORTANT: Hash the password before storing (use bcrypt or similar)
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      firstName,
      lastName,
      email,
      phone,
      password: password, // ⚠️ Store hashed password in production!
      createdAt: new Date(),
      // Add any other fields you need
    };

    await usersCollection.insertOne(newUser);

    // Generate a JWT token (implement your own token logic)
    const token = 'your_generated_jwt_token';

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Optionally handle other methods
export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}