import { connectToDatabase } from '@/utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const userId = req.query.userId;
  const taskId = req.query.taskId;

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { db } = await connectToDatabase();

    // Extract the updated task data from the request body
    const updatedTask = req.body;

    // Update the user document to modify the existing task in the to-do list
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId), 'toDoList._id': new ObjectId(taskId) },
      { $set: { 'toDoList.$': { _id: new ObjectId(taskId), ...updatedTask, _id: new ObjectId(taskId) } } }
    );

    if (result.modifiedCount === 0) {
      console.warn('Failed to update task. User or task not found.');
      res.status(404).json({ error: 'User or task not found' });
      return;
    }

    // Send success response
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
