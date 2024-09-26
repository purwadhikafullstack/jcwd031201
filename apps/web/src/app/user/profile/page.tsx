'use client';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import Image from 'next/image';
import { UserContext } from '@/contexts/UserContext';
import withAuth from '@/hoc/authGuard';
import { useMutation, useQuery } from '@tanstack/react-query';
import apiCall from '@/helper/apiCall';
import { toast, ToastContainer } from 'react-toastify';
import useProfile from '@/helper/useProfile';
import 'react-toastify/dist/ReactToastify.css';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
  const [username, setUsername] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [companyName, setCompanyName] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [isCreated, setIsCreated] = React.useState<boolean>(false);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string>('/27002.jpg');
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<{ [key: string]: string }>({
    firstName: '',
    lastName: '',
    companyName: '',
    address: '',
    phone: '',
  });
  const { user } = React.useContext(UserContext);
  const router = useRouter();
  const token = localStorage.getItem('token') || '';

  const formValidation = () => {
    setError({
      firstName: '',
      lastName: '',
      companyName: '',
      address: '',
      phone: '',
    });

    let isValid = true;

    if (!firstName) {
      setError((prev) => ({ ...prev, firstName: 'First name is required' }));
      isValid = false;
    }
    if (!lastName) {
      setError((prev) => ({ ...prev, lastName: 'Last name is required' }));
      isValid = false;
    }
    if (!companyName) {
      setError((prev) => ({
        ...prev,
        companyName: 'Company name is required',
      }));
      isValid = false;
    }
    if (!address) {
      setError((prev) => ({ ...prev, address: 'Address is required' }));
      isValid = false;
    }
    if (!phone) {
      setError((prev) => ({ ...prev, phone: 'Phone is required' }));
      isValid = false;
    }

    return isValid;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setImageFile(file);
      setImageUrl(url);
    }
  };
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = () => {
    setImageFile(null);
    setImageUrl('/27002.jpg');
  };

  const { data: profile, isLoading, isError } = useProfile(token);

  const createProfile = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('companyName', companyName);
      formData.append('address', address);
      formData.append('phone', phone);
      if (imageFile) {
        formData.append('img', imageFile);
      }
      const { data } = await apiCall.post('/api/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      setIsCreated(data.result.isCreated);
      toast('Create Profile Success');
      router.replace('/user/profile');
    },
    onError: (error: any) => {
      console.log(error);
      toast('Failed to Create Profile');
    },
  });

  const handleCreateProfile = () => {
    createProfile.mutate();
  };
  const updateProfile = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('companyName', companyName);
      formData.append('address', address);
      formData.append('phone', phone);
      if (imageFile) {
        formData.append('img', imageFile);
      }
      const { data } = await apiCall.patch('/api/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      setIsCreated(data.result.isCreated);
      toast('Update Profile Success');
      router.replace('/user/profile');
    },
    onError: (error: any) => {
      console.log(error);
      toast('Failed to Update Profile');
    },
  });

  const handleUpdateProfile = () => {
    updateProfile.mutate();
  };

  const handleUndoChanges = () => {
    setFirstName(profile.result.findProfile.firstName || '');
    setLastName(profile.result.findProfile.lastName || '');
    setCompanyName(profile.result.findProfile.companyName || '');
    setAddress(profile.result.findProfile.address || '');
    setPhone(profile.result.findProfile.phone || '');
    setIsCreated(profile.result.findProfile.isCreated || false);
    setImageUrl(
      'http://localhost:8000' + profile.result.findProfile.profilePicture ||
        '/27002.jpg',
    );
    setImageFile(null);
  };

  const handleClickButton = () => {
    if (formValidation()) {
      setIsDialogOpen(true);
    }
  };

  React.useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
    if (user?.username) {
      setUsername(user.username);
    }
    if (profile) {
      setFirstName(profile.result.findProfile.firstName || '');
      setLastName(profile.result.findProfile.lastName || '');
      setCompanyName(profile.result.findProfile.companyName || '');
      setAddress(profile.result.findProfile.address || '');
      setPhone(profile.result.findProfile.phone || '');
      setIsCreated(profile.result.findProfile.isCreated || false);
      setImageUrl(
        'http://localhost:8000' + profile.result.findProfile.profilePicture ||
          '/27002.jpg',
      );
    }
  }, [user, profile]);
  return (
    <div className="w-full">
      <ToastContainer />
      <div className="flex mt-28 mb-10 mx-10 rounded-xl border-slate-500 border border-solid">
        <Sidebar />
        <div className="flex-1">
          <div className="w-full flex flex-col">
            <div className="w-full flex justify-between items-center border-b border-solid border-b-black p-5">
              <div className="flex flex-col">
                <p className="text-2xl font-bold">Profile</p>
                <p className="text-slate-300">This is your profile</p>
              </div>
              <div className="flex items-center gap-5">
                <Button onClick={handleUndoChanges}>Undo Changes</Button>
                <Button
                  onClick={handleClickButton}
                  className="hover:bg-green-500 bg-green-500"
                >
                  Save Changes
                </Button>
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to make changes to your profile?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Make sure the informations are correct
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-red-500 text-white">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={
                          isCreated ? handleUpdateProfile : handleCreateProfile
                        }
                      >
                        {isCreated ? 'Update Profile' : 'Create Profile'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <div className="w-full flex flex-col gap-3 p-5">
              <div className="w-full flex gap-5 items-center">
                <div className="w-24 h-24 relative">
                  <Image
                    src={imageFile ? imageUrl : imageUrl}
                    alt="avatar"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full border border-black border-solid"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold">Avatar</p>
                  <p>Upload image under 1 MB</p>
                </div>
                <div className="flex items-center gap-5">
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                  <Button onClick={triggerFileInput}>Browse Image</Button>
                  <Button
                    onClick={handleDeleteImage}
                    className="hover:bg-red-500 bg-red-500"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <div className="w-full flex flex-col gap-3">
                <Label>Email Address</Label>
                <Input
                  className="w-1/2"
                  placeholder="Your email address"
                  type="text"
                  value={email}
                  disabled
                />
              </div>
              <div className="w-full flex flex-col gap-3">
                <Label>Username</Label>
                <Input
                  className="w-1/2"
                  placeholder="Your username"
                  type="text"
                  value={username}
                  disabled
                />
              </div>
              <div className="w-full flex flex-col gap-3">
                <Label>First Name</Label>
                <Input
                  className="w-1/2"
                  placeholder="Your first name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {error.firstname && (
                  <p className="text-red-500">{error.firstName}</p>
                )}
              </div>
              <div className="w-full flex flex-col gap-3">
                <Label>Last Name</Label>
                <Input
                  className="w-1/2"
                  placeholder="Your last name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {error.lastName && (
                  <p className="text-red-500">{error.lastName}</p>
                )}
              </div>
              <div className="w-full flex flex-col gap-3">
                <Label>Company Name</Label>
                <Input
                  className="w-1/2"
                  placeholder="Your company name"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                {error.companyName && (
                  <p className="text-red-500">{error.companyName}</p>
                )}
              </div>
              <div className="w-full flex flex-col gap-3">
                <Label>Address</Label>
                <Input
                  className="w-1/2"
                  placeholder="Your address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {error.address && (
                  <p className="text-red-500">{error.address}</p>
                )}
              </div>
              <div className="w-full flex flex-col gap-3">
                <Label>Phone</Label>
                <Input
                  className="w-1/2"
                  placeholder="Your phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {error.phone && <p className="text-red-500">{error.phone}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Profile);
