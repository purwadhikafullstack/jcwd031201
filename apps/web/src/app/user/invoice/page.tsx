'use client';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
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
import { useRouter } from 'next/navigation';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface IInvoiceProps {}

const Invoice: React.FunctionComponent<IInvoiceProps> = (props) => {
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="flex my-28 mx-10 rounded-xl border-slate-500 border border-solid">
        <Sidebar />
        <div className="flex-1">
          <div className="w-full flex flex-col">
            <div className="w-full flex items-center border-b border-b-black border-b-solid p-5">
              <div className="w-full flex flex-col gap-3">
                <Input type="text" placeholder="Search" className="w-[46.4%]" />
                <div className="w-full flex items-center gap-5">
                  <div className="">
                    <DatePicker
                      className=" border-slate-200 shadow-sm border border-solid rounded-md p-2"
                      placeholderText="From"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                  <div className="">
                    <DatePicker
                      className=" border-slate-200 shadow-sm border border-solid rounded-md p-2"
                      placeholderText="To"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <Button>Search</Button>
              </div>
            </div>
            <div className="w-full flex justify-between border-b border-b-black border-b-solid p-5">
              <div className="flex flex-col gap-4">
                <p className="text-2xl font-bold">Invoice</p>
                <div className="flex items-center">
                  <Button className="rounded-r-none border-r-white border-r-solid border-r">
                    All
                  </Button>
                  <Button className="rounded-none border-r-white border-r-solid border-r">
                    Unpaid
                  </Button>
                  <Button className="rounded-none border-r-white border-r-solid border-r">
                    Paid
                  </Button>
                  <Button className="rounded-l-none">Draft</Button>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <Button className="bg-white border-slate-300 border border-solid text-black hover:bg-transparent">
                  Download
                </Button>
                <Button
                  onClick={() => router.push('/user/invoice/create')}
                  className="bg-green-400 text-white hover:bg-green-400"
                >
                  +Create Invoice
                </Button>
                <Button className="bg-red-500 hover:bg-red-500">
                  Delete Invoice
                </Button>
              </div>
            </div>
            <div className="w-full p-5">
              <div className="w-full flex flex-col border-solid border border-slate-300 rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Checkbox />
                      </TableHead>
                      <TableHead>Invoice Code</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        INV-6f533cc1-64f2-4255-97bf-30ba9b94130d
                      </TableCell>
                      <TableCell>Ardi Utama</TableCell>
                      <TableCell>19 September 2024</TableCell>
                      <TableCell>Rp 1.350.000</TableCell>
                      <TableCell>PAID</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        INV-6f533cc1-64f2-4255-97bf-30ba9b94130d
                      </TableCell>
                      <TableCell>Ardi Utama</TableCell>
                      <TableCell>19 September 2024</TableCell>
                      <TableCell>Rp 1.350.000</TableCell>
                      <TableCell>PAID</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={5}>Page 1 of 1</TableCell>
                      <TableCell>1</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Invoice);
