'use client';
import Link from 'next/link';
import * as React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div
      className={`w-full ${pathname.includes('/user') && 'bg-black z-20'}  ${pathname === '/login' || pathname.includes('/reset-password') || pathname === '/register' || pathname === '/verify' || pathname === '/forgot-password' ? 'text-black z-20 bg-white' : 'text-white/25'} flex justify-between items-center fixed left-0 right-0 top-0 p-7`}
    >
      <div className="w-1/4 relative">
        <Image
          src={`${pathname === '/login' || pathname.includes('/reset-password') || pathname === '/register' || pathname === '/verify' || pathname === '/forgot-password' ? '/logo-black.png' : '/logo-no-background.png'}`}
          alt="logo"
          width={50}
          height={50}
          className="cursor-pointer"
          onClick={() => router.push('/')}
        />
      </div>
      <div className="w-full flex justify-center items-center gap-5">
        <p>
          <Link href={''}>Features</Link>
        </p>
        <p>Pricing</p>
        <p>Company</p>
        <p>Resources</p>
      </div>
      <div className="w-1/4 flex justify-end items-center gap-3">
        <Button
          onClick={() => router.push('/login')}
          className={`bg-transparent ${pathname === '/login' || pathname.includes('/reset-password') || pathname === '/register' || pathname === '/verify' || pathname === '/forgot-password' ? 'text-black' : 'text-white'} shadow-none hover:bg-transparent`}
        >
          Login
        </Button>
        <Button
          onClick={() => router.push('/register')}
          className={`bg-transparent ${pathname === '/login' || pathname.includes('/reset-password') || pathname === '/register' || pathname === '/verify' || pathname === '/forgot-password' ? 'text-black border-solid border-black border' : 'text-white shadow-none hover:bg-transparent border-solid border border-white rounded-xl'} `}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
