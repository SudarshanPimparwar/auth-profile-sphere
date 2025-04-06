
import { toast } from "sonner";

export interface Client {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

// Function to get all clients
export const getClients = async (token: string): Promise<Client[]> => {
  try {
    const response = await fetch('http://localhost:5000/api/clients', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch clients');
    }
    
    const data = await response.json();
    return data.clients;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`Error fetching clients: ${error.message}`);
    } else {
      toast.error('An unknown error occurred while fetching clients');
    }
    return [];
  }
};
