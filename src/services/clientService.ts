
import { toast } from "sonner";

export interface Client {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

// Mock clients data
const mockClients: Client[] = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    company: "ABC Corp"
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    company: "XYZ Inc"
  },
  {
    _id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    company: "123 Industries"
  }
];

// Function to initialize mock clients in localStorage if they don't exist
const initMockClients = () => {
  if (!localStorage.getItem('clients')) {
    localStorage.setItem('clients', JSON.stringify(mockClients));
  }
};

// Initialize mock clients
initMockClients();

// Function to get all clients
export const getClients = async (token: string): Promise<Client[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would fetch from your API with the token
    // For demo purposes, we'll get from localStorage
    const storedClients = localStorage.getItem('clients');
    
    if (!storedClients) {
      // If no clients in storage, use mock data
      localStorage.setItem('clients', JSON.stringify(mockClients));
      return mockClients;
    }
    
    return JSON.parse(storedClients);
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`Error fetching clients: ${error.message}`);
    } else {
      toast.error('An unknown error occurred while fetching clients');
    }
    return [];
  }
};
