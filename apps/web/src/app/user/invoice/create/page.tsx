'use client';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ICreateInvoiceProps {}

const CreateInvoice: React.FunctionComponent<ICreateInvoiceProps> = (props) => {
  const [date, setDate] = React.useState<Date | null>(null);
  const [checked, setChecked] = React.useState<boolean>(false);
  const [clientVal, setClientVal] = React.useState<string>('');
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="flex my-28 mx-10 rounded-xl border-slate-500 border border-solid">
        <Sidebar />
        <div className="flex-1">
          <div className="w-full flex flex-col">
            <div className="w-full flex justify-between border-b border-b-black border-b-solid p-5">
              <div className="w-full flex items-center gap-5">
                <p className="text-2xl font-bold">New Invoice</p>
                <p className="text-xl">|</p>
                <div className="flex items-center gap-3">
                  <p className="">Show Preview</p>
                  <Switch
                    checked={checked}
                    onCheckedChange={setChecked}
                    className={
                      checked
                        ? 'data-[state=checked]:bg-green-500'
                        : 'data-[state=unchecked]:bg-red-500'
                    }
                  />
                </div>
              </div>
              <div className="flex items-center gap-5">
                <Button
                  onClick={() => router.replace('/user/invoice')}
                  className="bg-white border-slate-300 border border-solid text-black hover:bg-transparent"
                >
                  Save as Draft
                </Button>
                <Button className="bg-green-400 text-white hover:bg-green-400">
                  Create Invoice
                </Button>
              </div>
            </div>
            <div className="w-full p-5 flex gap-5">
              <div className="w-full flex flex-col gap-5 border-solid border border-slate-300 rounded-lg p-5">
                <div className="w-full flex flex-col gap-3">
                  <p>Invoice Details</p>
                  <div className="bg-slate-200 h-0.5 w-full"></div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <p>Client</p>
                  <Select onValueChange={(e) => setClientVal(e)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={'client'}>Ardi Utama</SelectItem>
                      <SelectItem value={'new'}>+ Add new client</SelectItem>
                    </SelectContent>
                  </Select>
                  {clientVal === 'new' && (
                    <div className="flex flex-col gap-5">
                      <p className="">Client&apos;s details</p>
                      <div className="flex flex-col gap-2">
                        <Label>Name</Label>
                        <Input placeholder="Client's name" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Address</Label>
                        <Input placeholder="Client's address" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Phone</Label>
                        <Input placeholder="Client's phone" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Email</Label>
                        <Input placeholder="Client's email" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full flex items-center justify-between">
                  <div className="flex flex-col gap-3">
                    <Label>Due Date</Label>
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      className=" border-slate-200 shadow-sm border border-solid rounded-md p-1"
                    />
                  </div>
                  <div className="w-1/4 flex flex-col gap-3">
                    <Label>Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectItem value="PAID">PAID</SelectItem>
                        <SelectItem value="UNPAID">UNPAID</SelectItem>
                        <SelectItem value="OVERDUE">OVERDUE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label>Recurring Date</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="14">14</SelectItem>
                        <SelectItem value="21">21</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <p>Invoice Product</p>
                  <div className="bg-slate-200 h-0.5 w-full"></div>
                </div>
                <div className="w-full flex items-center gap-5">
                  <div className="w-full flex flex-col gap-3">
                    <Label>Product Name</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product">Keyboard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label>Quantity</Label>
                    <Input type="number" placeholder="quantity" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label>Price Unit</Label>
                    <Input type="number" placeholder="price unit" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label>Total</Label>
                    <Input type="number" placeholder="total" />
                  </div>
                </div>
                <div className="w-full flex items-center gap-2 cursor-pointer">
                  <p className="text-green-700">+</p>
                  <p className="underline text-green-700">Add item</p>
                </div>
              </div>
              {checked && (
                <div className="w-full flex flex-col gap-5 border-solid bg-slate-100 border border-slate-300 rounded-lg p-5">
                  <p>Preview</p>
                  <div className="w-full p-5 bg-white flex flex-col gap-3 border-solid border border-black rounded-lg">
                    <div className="w-full flex justify-between items-center">
                      <div className="flex flex-col">
                        <p className="text-xl font-bold">Invoice</p>
                        <p>Invoice Code INV/01233/123130</p>
                      </div>
                      <div>
                        <p>PT. Berjaya Berjangka</p>
                      </div>
                    </div>
                    <div className="w-full h-0.5 bg-slate-200"></div>
                    <div className="w-full flex flex-col">
                      <p>Client: Ardi Utama</p>
                      <p>Address: Jl. Nangka No.50</p>
                      <p>Phone: 0812345321</p>
                      <p>Email: 0812345321</p>
                    </div>
                    <div className="w-full">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Item</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Keyboard</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>Rp 150.000</TableCell>
                            <TableCell>Rp 450.000</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2</TableCell>
                            <TableCell>Mouse</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>Rp 150.000</TableCell>
                            <TableCell>Rp 150.000</TableCell>
                          </TableRow>
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TableCell colSpan={4}>Total</TableCell>
                            <TableCell>Rp 600.000</TableCell>
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </div>
                    <div className="w-full flex flex-col">
                      <p>Payment Information:</p>
                      <p>Bank Account: BCA</p>
                      <p>Account Number: 23453242</p>
                      <p>Account Name: PT. Berjaya Berjangka</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
