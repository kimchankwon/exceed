import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

interface CreateMemberRequest {
  name: string;
  email: string;
}

interface CreateMemberResponse {
  message: string;
  fiberyId?: string;
  member: {
    name: string;
    email: string;
  };
}

interface ErrorResponse {
  error: string;
  details?: string;
  message?: string;
}

interface FiberyEntityResponse {
  id: string;
  [key: string]: any;
}

export default async function API(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the request body
    const { name, email }: CreateMemberRequest = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Fibery API configuration for your Members database
    const FIBERY_TOKEN = process.env.FIBERY_TOKEN;
    const FIBERY_WORKSPACE = process.env.FIBERY_WORKSPACE || 'testa'; // Your workspace name

    if (!FIBERY_TOKEN) {
      return res.status(500).json({ error: 'Fibery configuration missing' });
    }
    // Make a fetch call to Fibery's /api/commands endpoint to create a new entity
    const fiberyResponse = await fetch(`https://${FIBERY_WORKSPACE}.fibery.io/api/commands`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${FIBERY_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          command: "fibery.entity/create",
          args: {
            type: "Space/Members",
            entity: {
              "Space/Name": name,
              "Space/Email": email
            }
          }
        }
      ])
    });

    if (!fiberyResponse.ok) {
      const errorData = await fiberyResponse.text();
      console.error('Fibery API error:', errorData);
      
      return res.status(fiberyResponse.status).json({ 
        error: 'Failed to create member in Fibery',
        details: errorData
      });
    }

    const fiberyData: FiberyEntityResponse = await fiberyResponse.json();

    const successResponse: CreateMemberResponse = {
      message: 'Member created successfully',
      fiberyId: fiberyData.id,
      member: { name, email }
    };

    return res.status(200).json(successResponse);

  } catch (error) {
    console.error('Error creating member:', error);
    
    const errorResponse: ErrorResponse = {
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
    
    return res.status(500).json(errorResponse);
  }
}
