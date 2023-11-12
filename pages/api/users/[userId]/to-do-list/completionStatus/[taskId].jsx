import { connectToDatabase } from '@/utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const userId = req.query.userId;
  const taskId = req.query.taskId;

  try {
    const { db } = await connectToDatabase();

    // Update the completion status using the $bit operator to toggle the value
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId), 'toDoList._id': new ObjectId(taskId) },
      { $bit: { 'toDoList.$.completionStatus': { xor: 1 } } }
    );

    if (result.modifiedCount === 0) {
      console.warn('No matching task found for updating.');
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    // Fetch the updated task to get the current completion status
    const updatedTask = await db.collection('users').findOne(
      { _id: new ObjectId(userId), 'toDoList._id': new ObjectId(taskId) },
      { 'toDoList.$': 1 }
    );

    if (!updatedTask || !updatedTask.toDoList || updatedTask.toDoList.length === 0) {
      console.warn('Updated task not found.');
      res.status(404).json({ error: 'Updated task not found' });
      return;
    }

    const updatedCompletionStatus = updatedTask.toDoList[0].completionStatus;

    // Send success response
    res.status(200).json({ success: true, completed: updatedCompletionStatus });
  } catch (error) {
    console.error('Error updating task completion status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
