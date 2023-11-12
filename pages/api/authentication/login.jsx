import { connectToDatabase } from '@/utils/mongodb';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to MongoDB
      const { db } = await connectToDatabase();

      // Access the "users" collection
      const collection = db.collection('users');

      // Extract data from the request body
      const { username, password } = req.body;

      // Find the user by username
      const user = await collection.findOne({ username });

      if (!user) {
        // User not found
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        // Passwords do not match
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Create a JWT with the user's information as the payload
      const token = jwt.sign({
        userId: user._id,
        username: user.username,
      }, 'secret');

      // Respond with the token
      res.json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      // Respond with an error message
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Respond with a 404 for non-POST requests
    res.status(404).json({ error: 'Not Found' });
  }
}
