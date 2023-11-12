import { connectToDatabase } from '@/utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const userId = req.query.userId;

  try {
    const { db } = await connectToDatabase();

    // Fetch the to-do list for the user based on userId
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

    // Return the to-do list in the response
    res.status(200).json({ toDoListItems: user.toDoList || [] });
  } catch (error) {
    console.error('Error fetching to-do list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
