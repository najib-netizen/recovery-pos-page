
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface User {
  id: string;
  name: string;
  country: string;
  amount: number;
  email: string;
  phoneNumber: string;
  periodStart: string;
  periodEnd: string;
  status: 'active' | 'inactive';
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: User) => void;
  user: User | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState<User>({
    id: '',
    name: '',
    country: 'Rwanda',
    amount: 0,
    email: '',
    phoneNumber: '',
    periodStart: '',
    periodEnd: '',
    status: 'active'
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleInputChange = (field: keyof User, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-white/20 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Customer</DialogTitle>
          <DialogDescription className="text-gray-400">
            Update customer information
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="edit-name" className="text-white text-xs">Full Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Jean Baptiste Uwimana"
                required
                className="bg-slate-700/50 border-white/10 text-white placeholder:text-gray-400 text-xs"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="edit-country" className="text-white text-xs">Country</Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                <SelectTrigger className="bg-slate-700/50 border-white/10 text-white h-8 text-xs">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="Rwanda">Rwanda</SelectItem>
                  <SelectItem value="Uganda">Uganda</SelectItem>
                  <SelectItem value="Kenya">Kenya</SelectItem>
                  <SelectItem value="Tanzania">Tanzania</SelectItem>
                  <SelectItem value="Burundi">Burundi</SelectItem>
                  <SelectItem value="DRC">Democratic Republic of Congo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="edit-email" className="text-white text-xs">Email Address</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="e.g., jean.uwimana@email.rw"
                required
                className="bg-slate-700/50 border-white/10 text-white placeholder:text-gray-400 text-xs"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="edit-phoneNumber" className="text-white text-xs">Phone Number</Label>
              <Input
                id="edit-phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="e.g., +250 788 123 456"
                required
                className="bg-slate-700/50 border-white/10 text-white placeholder:text-gray-400 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label htmlFor="edit-amount" className="text-white text-xs">Amount (RWF)</Label>
              <Input
                id="edit-amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', Number(e.target.value))}
                placeholder="e.g., 125000"
                required
                className="bg-slate-700/50 border-white/10 text-white placeholder:text-gray-400 text-xs"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="edit-periodStart" className="text-white text-xs">Period Start</Label>
              <Input
                id="edit-periodStart"
                type="date"
                value={formData.periodStart}
                onChange={(e) => handleInputChange('periodStart', e.target.value)}
                required
                className="bg-slate-700/50 border-white/10 text-white text-xs"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="edit-periodEnd" className="text-white text-xs">Period End</Label>
              <Input
                id="edit-periodEnd"
                type="date"
                value={formData.periodEnd}
                onChange={(e) => handleInputChange('periodEnd', e.target.value)}
                required
                className="bg-slate-700/50 border-white/10 text-white text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="edit-status" className="text-white text-xs">Status</Label>
            <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => handleInputChange('status', value)}>
              <SelectTrigger className="bg-slate-700/50 border-white/10 text-white h-8 text-xs">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-white/60 text-black hover:bg-white/5 h-8 text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs"
            >
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;