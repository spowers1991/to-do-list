import { connectToDatabase } from '@/utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const userId = req.query.userId;
  const taskId = req.query.taskId;

  try {
    const { db } = await connectToDatabase();

    // Update the user document to remove the specified task from the to-do list
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { toDoList: { _id: new ObjectId(taskId) } } }
    );

    if (result.modifiedCount === 0) {
      console.warn('No matching task found for deletion.');
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    // Send success response
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
