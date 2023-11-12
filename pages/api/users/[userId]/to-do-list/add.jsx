import { connectToDatabase } from '@/utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const userId = req.query.userId;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    
    // Extract the new task data from the request body
    const newTask = req.body;

    // Assign a unique identifier to the new task
    newTask._id = new ObjectId(); // Ensure 'new' keyword is used here

    // Update the user document to add the new task to the to-do list
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $push: { toDoList: newTask } }
    );

    if (result.modifiedCount === 0) {
      console.warn('Failed to add task. User not found.');
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Send success response
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
