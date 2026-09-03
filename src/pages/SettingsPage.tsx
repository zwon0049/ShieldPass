import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardBody, CardHeader, CardFooter, Input, Button, Form, FormGroup, Toast } from '../components';
import { type User } from '../types';
import { Upload } from 'lucide-react';

interface SettingsPageProps {
  onLogout: () => void;
}

export function SettingsPage({ onLogout }: SettingsPageProps) {
  const { user, updateUser, logout } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<User>(
    user || {
      id: '',
      name: '',
      email: '',
      theme: 'system' as 'light' | 'dark' | 'system',
    }
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Not authenticated</h2>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: User) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setFormData(prev => ({ ...prev, avatar: imageData }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ 
      ...prev, 
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' 
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      updateUser(formData);
      setIsSaving(false);
      setShowSuccess(true);
    }, 500);
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your profile and preferences</p>
        </div>

        {/* Profile Settings */}
        <Card className="mb-6">
          <CardHeader title="Profile Settings" description="Update your personal information" />
          <Form onSubmit={handleSaveProfile}>
            <CardBody className="space-y-6">
              {/* Avatar */}
              <FormGroup>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-4">
                  Profile Picture
                </label>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={formData.avatar}
                      alt={formData.name}
                      className="w-24 h-24 rounded-full object-cover border-2 border-indigo-200 dark:border-indigo-800"
                      onError={e => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop';
                      }}
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      aria-label="Upload profile picture"
                    />
                  </div>
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      icon={<Upload className="w-4 h-4" />}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Upload Photo
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemovePhoto}
                    >
                      Remove Photo
                    </Button>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </FormGroup>

              {/* Name */}
              <FormGroup>
                <Input
                  label="Display Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </FormGroup>

              {/* Email */}
              <FormGroup>
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  placeholder="your.email@example.com"
                  hint="Email is managed by your Google account"
                />
              </FormGroup>
            </CardBody>

            <CardFooter align="right">
              <Button
                variant="secondary"
                size="md"
                type="reset"
              >
                Cancel
              </Button>
              <Button
                size="md"
                type="submit"
                isLoading={isSaving}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Form>
        </Card>

        {/* Account Settings */}
        <Card className="mb-6">
          <CardHeader title="Account" description="Manage your account settings" />
          <CardBody className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Connected Accounts
              </label>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Google Account</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                </div>
                <div className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-xs font-medium">
                  Connected
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="danger"
                className="w-full justify-center"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Info Card */}
        {/* <Card>
          <CardBody>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-400">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">ℹ️ About ShieldPass</p>
              <p className="text-xs text-blue-800 dark:text-blue-400 leading-relaxed">
                ShieldPass v1.0 • Created to help you take control of your subscriptions and protect yourself from unwanted charges.
              </p>
            </div>
          </CardBody>
        </Card> */}
      </div>

      <Toast
        open={showSuccess}
        type="success"
        message="Profile settings saved successfully!"
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}
