import { connectToDatabase } from '@/utils/mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to MongoDB
      const { db } = await connectToDatabase();

      // Access the "users" collection
      const collection = db.collection('users');

      // Extract data from the request body
      const { username, email, password } = req.body;

      // Check if the username or email already exists
      const existingUser = await collection.findOne({
        $or: [
          { username: username },
          { email: email }
        ]
      });

      if (existingUser) {
        // If username or email already exists, respond with an error message
        return res.status(400).json({ error: 'Username or email already exists' });
      }

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the user data with the hashed password into the MongoDB collection
      const result = await collection.insertOne({ username, email, password: hashedPassword });

      // Respond with a success message
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during registration:', error);
      // Respond with an error message
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Respond with a 404 for non-POST requests
    res.status(404).json({ error: 'Not Found' });
  }
}
