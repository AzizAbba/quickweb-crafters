
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/context/DataContext";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { UserWithPassword } from "@/types/auth";

const UsersTable = () => {
  const { users, updateUserStatus } = useData();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithPassword | null>(null);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  const handleUserAction = (user: UserWithPassword, action: 'deactivate' | 'activate' | 'delete') => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const confirmAction = () => {
    if (!selectedUser) return;
    
    updateUserStatus(selectedUser.id, selectedUser.active ? false : true);
    
    toast({
      title: "User Updated",
      description: `User ${selectedUser.username} has been updated.`,
    });
    
    setDialogOpen(false);
    setSelectedUser(null);
  };

  const togglePasswordVisibility = (userId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  return (
    <>
      <Card className="overflow-hidden transform transition-all hover:shadow-lg">
        <CardHeader className="bg-white border-b">
          <CardTitle className="text-brand-blue">Manage Users</CardTitle>
          <CardDescription>
            View and manage system users
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>All registered users in the system</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono">
                          {showPasswords[user.id] ? user.password : '••••••••'}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => togglePasswordVisibility(user.id)}
                          className="h-8 w-8"
                        >
                          {showPasswords[user.id] ? 
                            <EyeOff className="h-4 w-4" /> : 
                            <Eye className="h-4 w-4" />
                          }
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === "admin" ? 
                        "bg-blue-100 text-blue-800" : 
                        "bg-green-100 text-green-800"
                      }`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.active !== false ? 
                        "bg-green-100 text-green-800" : 
                        "bg-red-100 text-red-800"
                      }`}>
                        {user.active !== false ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {user.role !== "admin" && (
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant={user.active !== false ? "destructive" : "outline"} 
                            size="sm"
                            onClick={() => handleUserAction(user, user.active !== false ? 'deactivate' : 'activate')}
                            className="transition-all hover:scale-105"
                          >
                            {user.active !== false ? "Deactivate" : "Activate"}
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to {selectedUser?.active !== false ? "deactivate" : "activate"} user {selectedUser?.username}?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmAction} 
              variant={selectedUser?.active !== false ? "destructive" : "default"}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UsersTable;
