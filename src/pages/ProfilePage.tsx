
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileTabContent from '@/components/profile/ProfileTabContent';
import AccountTabContent from '@/components/profile/AccountTabContent';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const ProfilePage = () => {
  const { user, updateProfile, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <ProfileTabContent user={user} updateProfile={updateProfile} />
        </TabsContent>
        
        <TabsContent value="account" className="space-y-4">
          <AccountTabContent user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
