'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    company: string;
    image_url: string;
    order_index: number;
}

interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    message: string;
    status: 'new' | 'read' | 'replied' | 'archived';
    created_at: string;
    updated_at: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

type Tab = 'team' | 'contacts';

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState<Tab>('contacts');
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [contacts, setContacts] = useState<ContactSubmission[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        company: '',
        image_url: '',
        order_index: 0,
    });
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    useEffect(() => {
        checkSession();
    }, []);

    useEffect(() => {
        if (activeTab === 'contacts') {
            fetchContacts(pagination.page);
        }
    }, [activeTab]);

    const checkSession = async () => {
        try {
            const response = await fetch('/api/admin/session');
            const data = await response.json();
            
            if (!data.authenticated) {
                router.push('/admin');
                return;
            }
            
            fetchTeamMembers();
            fetchContacts(1);
        } catch (error) {
            console.error('Session check error:', error);
            router.push('/admin');
        }
    };

    const fetchTeamMembers = async () => {
        try {
            const response = await fetch('/api/admin/teams');
            if (response.ok) {
                const data = await response.json();
                setTeamMembers(data);
            }
        } catch (error) {
            console.error('Error fetching team members:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchContacts = async (page: number) => {
        try {
            const response = await fetch(`/api/admin/contacts?page=${page}&limit=${pagination.limit}`);
            if (response.ok) {
                const data = await response.json();
                setContacts(data.data);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/session', { method: 'DELETE' });
            router.push('/admin');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', role: '', company: '', image_url: '', order_index: 0 });
        setEditingMember(null);
        setShowForm(false);
        setError('');
    };

    const handleImageUpload = async (file: File) => {
        setUploading(true);
        setError('');
        
        try {
            const uploadFormData = new FormData();
            uploadFormData.append('image', file);
            
            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: uploadFormData,
            });
            
            if (response.ok) {
                const data = await response.json();
                setFormData(prev => ({ ...prev, image_url: data.url }));
                setSuccess('Image uploaded successfully!');
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to upload image');
            }
        } catch (error) {
            setError('Failed to upload image');
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = (member: TeamMember) => {
        setFormData({
            name: member.name,
            role: member.role,
            company: member.company || '',
            image_url: member.image_url,
            order_index: member.order_index,
        });
        setEditingMember(member);
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setSaving(true);

        try {
            const url = '/api/admin/teams';
            const method = editingMember ? 'PUT' : 'POST';
            const body = editingMember
                ? { ...formData, id: editingMember.id }
                : formData;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                setSuccess(editingMember ? 'Team member updated!' : 'Team member added!');
                resetForm();
                fetchTeamMembers();
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to save');
            }
        } catch (error) {
            setError('An error occurred');
            console.error('Save error:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteTeam = async (id: string) => {
        if (!confirm('Are you sure you want to delete this team member?')) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/teams?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setSuccess('Team member deleted!');
                fetchTeamMembers();
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to delete');
            }
        } catch (error) {
            setError('An error occurred');
            console.error('Delete error:', error);
        }
    };

    const handleUpdateContactStatus = async (id: string, status: string) => {
        try {
            const response = await fetch('/api/admin/contacts', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status }),
            });

            if (response.ok) {
                setSuccess('Status updated!');
                fetchContacts(pagination.page);
                if (selectedContact?.id === id) {
                    setSelectedContact({ ...selectedContact, status: status as ContactSubmission['status'] });
                }
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to update status');
            }
        } catch (error) {
            setError('An error occurred');
            console.error('Update error:', error);
        }
    };

    const handleDeleteContact = async (id: string) => {
        if (!confirm('Are you sure you want to delete this contact submission?')) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/contacts?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setSuccess('Contact deleted!');
                setSelectedContact(null);
                fetchContacts(pagination.page);
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to delete');
            }
        } catch (error) {
            setError('An error occurred');
            console.error('Delete error:', error);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('de-CH', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            new: 'bg-blue-100 text-blue-800',
            read: 'bg-gray-100 text-gray-800',
            replied: 'bg-green-100 text-green-800',
            archived: 'bg-yellow-100 text-yellow-800',
        };
        return styles[status] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Tabs */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('contacts')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'contacts'
                                    ? 'border-blue-900 text-blue-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Contact Submissions
                            {contacts.filter(c => c.status === 'new').length > 0 && (
                                <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                                    {contacts.filter(c => c.status === 'new').length}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('team')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'team'
                                    ? 'border-blue-900 text-blue-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Team Management
                        </button>
                    </nav>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Messages */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                        {success}
                    </div>
                )}

                {/* Contact Submissions Tab */}
                {activeTab === 'contacts' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Contact List */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Messages ({pagination.total})
                                    </h2>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {contacts.length === 0 ? (
                                        <div className="px-6 py-8 text-center text-gray-500">
                                            No contact submissions yet.
                                        </div>
                                    ) : (
                                        contacts.map((contact) => (
                                            <button
                                                key={contact.id}
                                                onClick={() => {
                                                    setSelectedContact(contact);
                                                    if (contact.status === 'new') {
                                                        handleUpdateContactStatus(contact.id, 'read');
                                                    }
                                                }}
                                                className={`w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
                                                    selectedContact?.id === contact.id ? 'bg-blue-50' : ''
                                                }`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`font-medium text-gray-900 ${contact.status === 'new' ? 'font-bold' : ''}`}>
                                                                {contact.name}
                                                            </span>
                                                            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadge(contact.status)}`}>
                                                                {contact.status}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 truncate">{contact.email}</p>
                                                        <p className="text-sm text-gray-500 truncate mt-1">{contact.message}</p>
                                                    </div>
                                                    <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                                                        {formatDate(contact.created_at)}
                                                    </span>
                                                </div>
                                            </button>
                                        ))
                                    )}
                                </div>

                                {/* Pagination */}
                                {pagination.totalPages > 1 && (
                                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                        <div className="text-sm text-gray-600">
                                            Page {pagination.page} of {pagination.totalPages}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => fetchContacts(pagination.page - 1)}
                                                disabled={pagination.page <= 1}
                                                className="px-3 py-1 border border-gray-300 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            >
                                                Previous
                                            </button>
                                            {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                                                let page;
                                                if (pagination.totalPages <= 5) {
                                                    page = i + 1;
                                                } else if (pagination.page <= 3) {
                                                    page = i + 1;
                                                } else if (pagination.page >= pagination.totalPages - 2) {
                                                    page = pagination.totalPages - 4 + i;
                                                } else {
                                                    page = pagination.page - 2 + i;
                                                }
                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => fetchContacts(page)}
                                                        className={`px-3 py-1 border rounded text-sm font-medium ${
                                                            pagination.page === page
                                                                ? 'bg-blue-900 text-white border-blue-900'
                                                                : 'border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            })}
                                            <button
                                                onClick={() => fetchContacts(pagination.page + 1)}
                                                disabled={pagination.page >= pagination.totalPages}
                                                className="px-3 py-1 border border-gray-300 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Contact Detail */}
                        <div className="lg:col-span-1">
                            {selectedContact ? (
                                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{selectedContact.name}</h3>
                                        <button
                                            onClick={() => setSelectedContact(null)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email</label>
                                            <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                                                {selectedContact.email}
                                            </a>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Received</label>
                                            <p className="text-gray-900">{formatDate(selectedContact.created_at)}</p>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Status</label>
                                            <select
                                                value={selectedContact.status}
                                                onChange={(e) => handleUpdateContactStatus(selectedContact.id, e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                                            >
                                                <option value="new">New</option>
                                                <option value="read">Read</option>
                                                <option value="replied">Replied</option>
                                                <option value="archived">Archived</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Message</label>
                                            <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg text-sm">
                                                {selectedContact.message}
                                            </p>
                                        </div>
                                        
                                        <div className="flex gap-2 pt-4">
                                            <a
                                                href={`mailto:${selectedContact.email}?subject=Re: Contact Request from ${selectedContact.name}`}
                                                className="flex-1 bg-blue-900 text-white py-2 px-4 rounded-lg text-sm font-semibold text-center hover:bg-blue-800 transition-colors"
                                            >
                                                Reply
                                            </a>
                                            <button
                                                onClick={() => handleDeleteContact(selectedContact.id)}
                                                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl shadow-lg p-6 text-center text-gray-500">
                                    Select a message to view details
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Team Management Tab */}
                {activeTab === 'team' && (
                    <>
                        {/* Add Button */}
                        {!showForm && (
                            <button
                                onClick={() => setShowForm(true)}
                                className="mb-6 bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                            >
                                + Add Team Member
                            </button>
                        )}

                        {/* Form */}
                        {showForm && (
                            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">
                                    {editingMember ? 'Edit Team Member' : 'Add Team Member'}
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Image Upload */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Profile Photo
                                        </label>
                                        <div className="flex items-start gap-6">
                                            {/* Preview */}
                                            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                                {formData.image_url ? (
                                                    <Image
                                                        src={formData.image_url}
                                                        alt="Preview"
                                                        width={96}
                                                        height={96}
                                                        className="object-cover w-full h-full"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                                        No image
                                                    </div>
                                                )}
                                            </div>
                                            {/* Upload Area */}
                                            <div className="flex-1">
                                                <label className="relative cursor-pointer">
                                                    <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${uploading ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}>
                                                        {uploading ? (
                                                            <div className="flex items-center justify-center gap-2 text-blue-600">
                                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                                </svg>
                                                                <span>Uploading...</span>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                                <p className="mt-2 text-sm text-gray-600">
                                                                    <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                                                                </p>
                                                                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                                                            </>
                                                        )}
                                                    </div>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        disabled={uploading}
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) handleImageUpload(file);
                                                        }}
                                                    />
                                                </label>
                                                {formData.image_url && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, image_url: '' })}
                                                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                                                    >
                                                        Remove image
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Role / Position
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none"
                                                placeholder="CEO"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Company
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none"
                                                placeholder="R&B Company GmbH"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Display Order
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.order_index}
                                                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="submit"
                                            disabled={saving || uploading}
                                            className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50"
                                        >
                                            {saving ? 'Saving...' : editingMember ? 'Update' : 'Add'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="px-6 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Team List */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Photo</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Company</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {teamMembers.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                                No team members yet. Add your first team member!
                                            </td>
                                        </tr>
                                    ) : (
                                        teamMembers.map((member) => (
                                            <tr key={member.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                                        {member.image_url ? (
                                                            <Image
                                                                src={member.image_url}
                                                                alt={member.name}
                                                                width={48}
                                                                height={48}
                                                                className="object-cover w-full h-full"
                                                                unoptimized
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-blue-900 text-white font-bold">
                                                                {member.name.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                                                <td className="px-6 py-4 text-gray-600">{member.role}</td>
                                                <td className="px-6 py-4 text-gray-600">{member.company || '-'}</td>
                                                <td className="px-6 py-4 text-gray-600">{member.order_index}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleEdit(member)}
                                                        className="text-blue-600 hover:text-blue-800 font-medium mr-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteTeam(member.id)}
                                                        className="text-red-600 hover:text-red-800 font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
