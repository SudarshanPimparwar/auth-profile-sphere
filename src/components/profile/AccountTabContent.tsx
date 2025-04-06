
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/contexts/AuthContext';

interface AccountTabContentProps {
  user: User | null;
}

const AccountTabContent = ({ user }: AccountTabContentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>
          Manage your account settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Account ID</h3>
            <p className="text-sm text-muted-foreground">{user?._id}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Email Address</h3>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Account Created</h3>
            <p className="text-sm text-muted-foreground">April 5, 2025</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountTabContent;
