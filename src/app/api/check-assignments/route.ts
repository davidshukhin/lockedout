import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authConfig } from '~/server/auth/config';
import { checkAssignments } from '~/server/actions/check_assignments';

/**
 * API endpoint to check if the user has any active, unsubmitted assignments
 * Returns:
 * - shouldBlock: boolean - true if the user has active assignments (should block), false if not
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authConfig);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Call the checkAssignments function - returns true if all assignments are submitted
    const allAssignmentsSubmitted = await checkAssignments();
    
    // Return shouldBlock: true if there are active assignments
    // In the check_assignments.ts function, the return value means:
    // - true: all assignments are submitted (should NOT block)
    // - false: there are pending assignments (should block)
    return NextResponse.json({ 
      shouldBlock: !allAssignmentsSubmitted,
      message: allAssignmentsSubmitted 
        ? 'All assignments submitted, no need to block' 
        : 'Active assignments found, should block'
    });
  } catch (error) {
    console.error('Error checking assignments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 