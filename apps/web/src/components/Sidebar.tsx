'use client';
import * as React from 'react';
import { AiOutlinePieChart } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import { GrTransaction } from 'react-icons/gr';
import { IoHelpCircleOutline } from 'react-icons/io5';
import { LuWallet2 } from 'react-icons/lu';
import { RiHome3Line, RiProfileLine } from 'react-icons/ri';
import { TbFileInvoice } from 'react-icons/tb';
import { CiBoxes } from 'react-icons/ci';
import { usePathname, useRouter } from 'next/navigation';

interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="w-[20%] border-r-solid border-r-black border-r rounded-l-xl">
      <div className="w-full flex flex-col ">
        <div className="w-full flex-col flex gap-3 p-5">
          <p>MAIN MENU</p>
          <div className="w-full flex flex-col justify-center gap-3">
            <div
              className={`w-full flex gap-3 p-3 items-center cursor-pointer ${pathname.includes('/dashboard') && 'shadow-lg rounded-xl border-solid border border-slate-200'}`}
              onClick={() => router.push('/user/dashboard')}
            >
              <RiHome3Line size={20} />
              <p className="text-slate-400">Dashboard</p>
            </div>
            <div
              className={`w-full flex gap-3 p-3 items-center cursor-pointer ${pathname.includes('/profile') && 'shadow-lg rounded-xl border-solid border border-slate-200'}`}
              onClick={() => router.push('/user/profile')}
            >
              <RiProfileLine size={20} />
              <p className="text-slate-400">Profile</p>
            </div>
            <div
              className={`w-full flex gap-3 p-3 items-center cursor-pointer ${pathname.includes('/product') && 'shadow-lg rounded-xl border-solid border border-slate-200'}`}
              onClick={() => router.push('/user/product')}
            >
              <CiBoxes size={20} />
              <p className="text-slate-400">Products</p>
            </div>
            <div className="w-full flex gap-3 p-3 items-center">
              <GrTransaction size={20} />
              <p className="text-slate-400">Transactions</p>
            </div>
            <div className="w-full flex gap-3 p-3 items-center">
              <LuWallet2 size={20} />
              <p className="text-slate-400">My Wallet</p>
            </div>
            <div
              className={`w-full flex gap-3 items-center cursor-pointer p-3 ${pathname.includes('/invoice') && 'shadow-lg rounded-xl border-solid border border-slate-200'}`}
              onClick={() => router.push('/user/invoice')}
            >
              <TbFileInvoice size={20} />
              <p className="text-slate-400">Invoices</p>
            </div>
            <div className="w-full flex gap-3 p-3 items-center">
              <AiOutlinePieChart size={20} />
              <p className="text-slate-400">Reports</p>
            </div>
          </div>
        </div>
        <div className="w-full flex-col flex gap-3 p-5">
          <p>PREFERENCES</p>
          <div className="w-full flex flex-col justify-center gap-3">
            <div className="w-full flex gap-3 p-3 items-center">
              <CiSettings size={20} />
              <p className="text-slate-400">Settings</p>
            </div>
            <div className="w-full flex gap-3 p-3 items-center">
              <IoHelpCircleOutline size={20} />
              <p className="text-slate-400">Help Center</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
