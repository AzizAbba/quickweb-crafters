
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useData } from "@/context/DataContext";
import { format } from "date-fns";

const MessagesList = () => {
  const { messages, markMessageAsRead } = useData();
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    setDialogOpen(true);
    
    if (!message.isRead) {
      markMessageAsRead(message.id);
    }
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Contact Messages</CardTitle>
          <CardDescription>
            Messages from visitors through the contact form
          </CardDescription>
        </CardHeader>
        <CardContent>
          {messages.length > 0 ? (
            <Table>
              <TableCaption>Recent contact messages</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id} className={!message.isRead ? "bg-blue-50" : ""}>
                    <TableCell className="font-medium">{message.name}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>{message.subject}</TableCell>
                    <TableCell>{format(new Date(message.createdAt), 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${message.isRead ? "bg-gray-100" : "bg-blue-100 text-blue-800"}`}>
                        {message.isRead ? "Read" : "Unread"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => handleViewMessage(message)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No messages</h3>
              <p className="text-gray-500">There are no contact messages yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription className="flex justify-between text-sm text-gray-500">
              <span>From: {selectedMessage?.name} ({selectedMessage?.email})</span>
              <span>{selectedMessage?.createdAt && format(new Date(selectedMessage.createdAt), 'MMM d, yyyy')}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 border-t pt-4">
            <p className="whitespace-pre-wrap">{selectedMessage?.message}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MessagesList;
