// Fibery API utility functions
// Note: For production use, it's recommended to use the serverless function approach
// to keep your API token secure on the server side

export interface FiberyUser {
  name: string;
  email: string;
}

export interface FiberyApiConfig {
  token: string;
  workspace: string;
  entityType: string;
}

export class FiberyApi {
  private config: FiberyApiConfig;

  constructor(config: FiberyApiConfig) {
    this.config = config;
  }

  async createUser(user: FiberyUser): Promise<any> {
    try {
      const response = await fetch(`https://api.fibery.com/entities`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${this.config.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: this.config.entityType,
          data: {
            Name: user.name,
            Email: user.email,
            // Add any other required fields for your Users entity type
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Fibery API error: ${response.status} - ${errorData}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating user in Fibery:', error);
      throw error;
    }
  }

  async getUsers(): Promise<any[]> {
    try {
      const response = await fetch(`https://api.fibery.com/entities?type=${this.config.entityType}`, {
        headers: {
          'Authorization': `Token ${this.config.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Fibery API error: ${response.status} - ${errorData}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching users from Fibery:', error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<any> {
    try {
      const response = await fetch(`https://api.fibery.com/entities/${id}`, {
        headers: {
          'Authorization': `Token ${this.config.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Fibery API error: ${response.status} - ${errorData}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user from Fibery:', error);
      throw error;
    }
  }
}

// Example usage:
// const fiberyApi = new FiberyApi({
//   token: 'your_token_here',
//   workspace: 'your_workspace',
//   entityType: 'Users'
// });
// 
// try {
//   const result = await fiberyApi.createUser({ name: 'John Doe', email: 'john@example.com' });
//   console.log('User created:', result);
// } catch (error) {
//   console.error('Failed to create user:', error);
// }
