
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import CreateUserModal from './CreateUserModal';
import { toast } from '@/hooks/use-toast';

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

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Jean Baptiste Uwimana',
      country: 'Rwanda',
      amount: 125000,
      email: 'jean.uwimana@email.rw',
      phoneNumber: '+250 788 123 456',
      periodStart: '2024-01-01',
      periodEnd: '2024-12-31',
      status: 'active'
    },
    {
      id: '2',
      name: 'Marie Claire Mukamana',
      country: 'Rwanda',
      amount: 89000,
      email: 'marie.mukamana@email.rw',
      phoneNumber: '+250 789 654 321',
      periodStart: '2024-02-15',
      periodEnd: '2024-12-31',
      status: 'active'
    },
    {
      id: '3',
      name: 'Eric Nshimiyimana',
      country: 'Rwanda',
      amount: 156000,
      email: 'eric.nshimiyimana@email.rw',
      phoneNumber: '+250 787 987 654',
      periodStart: '2023-12-01',
      periodEnd: '2024-11-30',
      status: 'inactive'
    },
    {
      id: '4',
      name: 'Agnes Niyonzima',
      country: 'Rwanda',
      amount: 203000,
      email: 'agnes.niyonzima@email.rw',
      phoneNumber: '+250 786 456 789',
      periodStart: '2024-03-01',
      periodEnd: '2025-02-28',
      status: 'active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = (userData: Omit<User, 'id'>) => {
    const newUser = {
      ...userData,
      id: Date.now().toString()
    };
    setUsers(prev => [...prev, newUser]);
    toast({
      title: "Success",
      description: "User created successfully"
    });
  };

  const handleEditUser = (userId: string) => {
    toast({
      title: "Edit User",
      description: "Edit functionality will be implemented soon"
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    toast({
      title: "Success",
      description: "User deleted successfully"
    });
  };

  const formatCurrency = (amount: number) => {
    return `RWF ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Customer Management</h2>
          <p className="text-gray-400 mt-1">Manage customer accounts and subscriptions</p>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create
        </Button>
      </div>

      {/* Search Section */}
      <Card className="bg-slate-800/50 border-white/10">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search customers by name, email, or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-700/50 border-white/10 text-white placeholder:text-gray-400"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-blue-100 text-sm">Total Customers</p>
              <p className="text-3xl font-bold text-white">{users.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-green-100 text-sm">Active Customers</p>
              <p className="text-3xl font-bold text-white">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-purple-100 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-white">
                {formatCurrency(users.reduce((sum, user) => sum + user.amount, 0))}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-orange-100 text-sm">Countries</p>
              <p className="text-3xl font-bold text-white">
                {new Set(users.map(u => u.country)).size}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <Card className="bg-slate-800/50 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Customer Database</CardTitle>
          <CardDescription className="text-gray-400">
            Complete list of all registered customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-white font-medium">Country</th>
                  <th className="text-left py-3 px-4 text-white font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-white font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-white font-medium">Phone</th>
                  <th className="text-left py-3 px-4 text-white font-medium">Period Start</th>
                  <th className="text-left py-3 px-4 text-white font-medium">Period End</th>
                  <th className="text-left py-3 px-4 text-white font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-white font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 text-white font-medium">{user.name}</td>
                    <td className="py-4 px-4 text-gray-300">{user.country}</td>
                    <td className="py-4 px-4 text-green-400 font-medium">{formatCurrency(user.amount)}</td>
                    <td className="py-4 px-4 text-gray-300">{user.email}</td>
                    <td className="py-4 px-4 text-gray-300">{user.phoneNumber}</td>
                    <td className="py-4 px-4 text-gray-300">{formatDate(user.periodStart)}</td>
                    <td className="py-4 px-4 text-gray-300">{formatDate(user.periodEnd)}</td>
                    <td className="py-4 px-4">
                      <Badge 
                        variant={user.status === 'active' ? 'default' : 'secondary'}
                        className={user.status === 'active' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-gray-600 hover:bg-gray-700'
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditUser(user.id)}
                          className="border-white/20 text-blue-400 hover:bg-blue-600/20"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteUser(user.id)}
                          className="border-white/20 text-red-400 hover:bg-red-600/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No customers found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateUser}
      />
    </div>
  );
};

export default UserManagement;
