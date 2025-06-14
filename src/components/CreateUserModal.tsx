
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface User {
  name: string;
  country: string;
  amount: number;
  email: string;
  phoneNumber: string;
  periodStart: string;
  periodEnd: string;
  status: 'active' | 'inactive';
}

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: User) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<User>({
    name: '',
    country: 'Rwanda',
    amount: 0,
    email: '',
    phoneNumber: '',
    periodStart: '',
    periodEnd: '',
    status: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      country: 'Rwanda',
      amount: 0,
      email: '',
      phoneNumber: '',
      periodStart: '',
      periodEnd: '',
      status: 'active'
    });
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
          <DialogTitle className="text-xl font-bold">Create New Customer</DialogTitle>
          <DialogDescription className="text-gray-400">
            Add a new customer to the management system
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Jean Baptiste Uwimana"
                required
                className="bg-slate-700/50 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country" className="text-white">Country</Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                <SelectTrigger className="bg-slate-700/50 border-white/10 text-white">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="e.g., jean.uwimana@email.rw"
                required
                className="bg-slate-700/50 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-white">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="e.g., +250 788 123 456"
                required
                className="bg-slate-700/50 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-white">Amount (RWF)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', Number(e.target.value))}
                placeholder="e.g., 125000"
                required
                className="bg-slate-700/50 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="periodStart" className="text-white">Period Start</Label>
              <Input
                id="periodStart"
                type="date"
                value={formData.periodStart}
                onChange={(e) => handleInputChange('periodStart', e.target.value)}
                required
                className="bg-slate-700/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="periodEnd" className="text-white">Period End</Label>
              <Input
                id="periodEnd"
                type="date"
                value={formData.periodEnd}
                onChange={(e) => handleInputChange('periodEnd', e.target.value)}
                required
                className="bg-slate-700/50 border-white/10 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-white">Status</Label>
            <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => handleInputChange('status', value)}>
              <SelectTrigger className="bg-slate-700/50 border-white/10 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Customer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
