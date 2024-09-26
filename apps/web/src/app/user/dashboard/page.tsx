'use client';
import * as React from 'react';
import { RiHome3Line, RiProfileLine } from 'react-icons/ri';
import { GrTransaction } from 'react-icons/gr';
import { LuWallet2 } from 'react-icons/lu';
import { TbFileInvoice } from 'react-icons/tb';
import { AiOutlinePieChart } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import { IoHelpCircleOutline } from 'react-icons/io5';
import Sidebar from '@/components/Sidebar';
import { Input } from '@/components/ui/input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import withAuth from '@/hoc/authGuard';
import useProfile from '@/helper/useProfile';

interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  const [name, setName] = React.useState<string>('');
  const token = localStorage.getItem('token') || '';
  const { data: profile, isError, isLoading } = useProfile(token);
  React.useEffect(() => {
    if (profile) {
      setName(profile.result.findProfile.firstName);
    }
  }, [profile]);

  return <div className="w-full mt-28">{name}</div>;
};

export default withAuth(Dashboard);
