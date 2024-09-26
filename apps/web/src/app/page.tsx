import { Button } from '@/components/ui/button';
import { GoDotFill } from 'react-icons/go';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="w-full flex flex-col gap-20 overflow-hidden">
      <div className="w-full flex justify-between px-20 py-28 bg-black/85 gap-28">
        <div className="w-1/2 flex flex-col justify-center items-center gap-16">
          <div className="w-full flex flex-col justify-center items-center text-white gap-5">
            <p className="text-7xl">Solving all your Invoicing problems here</p>
            <p className="text-xl text-white/25">
              Streamline Your Entire Invoicing Process and Get Paid Faster with
              Automated Solutions
            </p>
          </div>
          <div className="w-full flex justify-start items-center gap-5">
            <Button className="rounded-3xl p-8 bg-transparent border border-solid border-white">
              Sign up for free
            </Button>
            <Button className="rounded-3xl p-8 bg-green-500">
              Whatsapp sales
            </Button>
          </div>
          <div className="w-full flex gap-5 text-white/25">
            <p>No credit card required</p>
            <p>|</p>
            <p>All premium features for 14 days</p>
          </div>
        </div>
        <div className="w-1/2 relative">
          <Image
            src="/invoice.png"
            alt="invoice"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="w-full flex justify-between items-center relative px-20">
        <Image src="/zoom.png" alt="zoom" width={200} height={50} />
        <p>|</p>
        <Image src="/webflow.png" alt="zoom" width={200} height={50} />
        <p>|</p>
        <Image src="/slack.png" alt="zoom" width={200} height={50} />
        <p>|</p>
        <Image src="/coinbase.png" alt="zoom" width={200} height={50} />
        <p>|</p>
        <Image src="/dropbox.png" alt="zoom" width={200} height={50} />
      </div>
      <div className="w-full flex flex-col items-center px-20 gap-20">
        <div className="w-full flex justify-between items-center">
          <div className="w-1/2 flex flex-col gap-10">
            <p className="text-6xl font-bold">All in one invoice platform</p>
            <p>
              Track your entire project from start to finish with beautiful
              views that make project planning a breeze manage your resources
            </p>
          </div>
          <div>
            <Button className="p-9 rounded-[2rem] text-xl">
              View all features
            </Button>
          </div>
        </div>
        <div className="w-full flex justify-between items-center gap-10">
          <div className="flex flex-col justify-center gap-5 relative">
            <Image src="/icon-invoice.png" alt="" width={70} height={30} />
            <div className="w-full h-0.5 bg-slate-300"></div>
            <p className="text-2xl font-bold">Invoicing is Easy</p>
            <p>
              Save time by automating the creation and sending of invoices,
              reducing manual effort and minimizing human error
            </p>
          </div>
          <div className="flex flex-col gap-5 relative">
            <Image src="/help-desk.png" alt="" width={70} height={30} />
            <div className="w-full h-0.5 bg-slate-300"></div>
            <p className="text-2xl font-bold">Unlimited Support</p>
            <p>
              Save time by automating the creation and sending of invoices,
              reducing manual effort and minimizing human error
            </p>
          </div>
          <div className="flex flex-col gap-5 relative">
            <Image src="/folder.png" alt="" width={70} height={30} />
            <div className="w-full h-0.5 bg-slate-300"></div>
            <p className="text-2xl font-bold">Organized & Automation</p>
            <p>
              Save time by automating the creation and sending of invoices,
              reducing manual effort and minimizing human error
            </p>
          </div>
          <div className="flex flex-col gap-5 relative">
            <Image src="/earth.png" alt="" width={70} height={30} />
            <div className="w-full h-0.5 bg-slate-300"></div>
            <p className="text-2xl font-bold">Over 100 Countries</p>
            <p>
              Save time by automating the creation and sending of invoices,
              reducing manual effort and minimizing human error
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center px-20 gap-20 py-20">
        <div className="w-1/2 flex flex-col justify-center items-center gap-5">
          <p className="text-6xl font-bold">How does it works</p>
          <p className="text-center">
            Create professional, branded invoices that match your business
            identity, leaving a lasting impression on clients. Easily set up
            recurring invoices for repeat clients, automating the billing
            process for ongoing projects or subscriptions.
          </p>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-5 items-start">
            <div className="flex flex-col items-center">
              <GoDotFill size={40} color="red" />
              <div className="w-1 h-44 border-l-8 border-dotted border-slate-300"></div>
            </div>
            <div className="flex flex-col">
              <p className="text-3xl font-bold">
                Track your time calculate the expenses
              </p>
              <p>Track your time calculate the expenses</p>
            </div>
          </div>
          <div className="w-1/3 h-60 bg-red-300 relative">
            <Image
              src="/task.png"
              alt=""
              layout="fill"
              objectFit="contain"
              className="p-5"
            />
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-5 items-start">
            <div className="flex flex-col items-center">
              <GoDotFill size={40} color="yellow" />
              <div className="w-1 h-44 border-l-8 border-dotted border-slate-300"></div>
            </div>
            <div className="flex flex-col">
              <p className="text-3xl font-bold">
                Track your time calculate the expenses
              </p>
              <p>Track your time calculate the expenses</p>
            </div>
          </div>
          <div className="w-1/3 h-60 bg-yellow-300 relative p-5">
            <Image
              src="/report.png"
              alt=""
              layout="fill"
              objectFit="contain"
              className="p-5"
            />
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-5 items-start">
            <div className="flex flex-col items-center">
              <GoDotFill size={40} color="green" />
              <div className="w-1 h-44 border-l-8 border-dotted border-slate-300"></div>
            </div>
            <div className="flex flex-col">
              <p className="text-3xl font-bold">
                Accept payments on time and <br /> from many payments methods
              </p>
              <p>Track your time calculate the expenses</p>
            </div>
          </div>
          <div className="w-1/3 h-60 bg-green-300 relative">
            <Image
              src="/analyze.png"
              alt=""
              layout="fill"
              objectFit="contain"
              className="p-5"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center px-20 gap-32 py-20 bg-black/85">
        <div className="w-full flex justify-between">
          <div className="w-1/2 relative">
            <Image
              src="/invoice.png"
              alt="invoice"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="w-1/2 flex-col flex gap-10">
            <p className="text-white text-4xl font-bold">
              Generate, upload and sort your invoice in one place
            </p>
            <div className="w-full flex flex-col gap-5">
              <div className="w-full flex gap-5">
                <div className="w-1 h-full bg-slate-500"></div>
                <div className="w-full flex flex-col gap-5">
                  <p className="text-2xl font-bold text-white">
                    Generate or send one or multiple documents
                  </p>
                  <p className="text-slate-400">
                    Generate tax-compliant invoices, track payments for tax
                    purposes, and simplify end-of-year accounting with detailed
                    reports.
                  </p>
                  <div className="w-full h-0.5 bg-slate-600"></div>
                </div>
              </div>
              <div className="w-full flex gap-5">
                <div className="w-1 h-full bg-slate-500"></div>
                <div className="w-full flex flex-col gap-5">
                  <p className="text-2xl font-bold text-white">
                    You can send invoices in multiple currencies
                  </p>
                  <p className="text-slate-400 hidden">
                    Access analytics and reports on your invoicing history,
                    helping you identify trends, overdue payments, and
                    opportunities to optimize your billing process.
                  </p>
                  <div className="w-full h-0.5 bg-slate-600"></div>
                </div>
              </div>
              <div className="w-full flex gap-5">
                <div className="w-1 h-full bg-slate-500"></div>
                <div className="w-full flex flex-col gap-5">
                  <p className="text-2xl font-bold text-white">
                    Automatic sorting and click for your approval
                  </p>
                  <p className="text-slate-400 hidden">
                    Generate tax-compliant invoices, track payments for tax
                    purposes, and simplify end-of-year accounting with detailed
                    reports.
                  </p>
                  <div className="w-full h-0.5 bg-slate-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-1/2 flex-col flex gap-10">
            <p className="text-white text-4xl font-bold">
              Received your payments and their impact on your finance
            </p>
            <div className="w-full flex flex-col gap-5">
              <div className="w-full flex gap-5">
                <div className="w-1 h-full bg-slate-500"></div>
                <div className="w-full flex flex-col gap-5">
                  <p className="text-2xl font-bold text-white">
                    Generate or send one or multiple documents
                  </p>
                  <p className="text-slate-400">
                    Generate tax-compliant invoices, track payments for tax
                    purposes, and simplify end-of-year accounting with detailed
                    reports.
                  </p>
                  <div className="w-full h-0.5 bg-slate-600"></div>
                </div>
              </div>
              <div className="w-full flex gap-5">
                <div className="w-1 h-full bg-slate-500"></div>
                <div className="w-full flex flex-col gap-5">
                  <p className="text-2xl font-bold text-white">
                    You can send invoices in multiple currencies
                  </p>
                  <p className="text-slate-400 hidden">
                    Access analytics and reports on your invoicing history,
                    helping you identify trends, overdue payments, and
                    opportunities to optimize your billing process.
                  </p>
                  <div className="w-full h-0.5 bg-slate-600"></div>
                </div>
              </div>
              <div className="w-full flex gap-5">
                <div className="w-1 h-full bg-slate-500"></div>
                <div className="w-full flex flex-col gap-5">
                  <p className="text-2xl font-bold text-white">
                    Automatic sorting and click for your approval
                  </p>
                  <p className="text-slate-400 hidden">
                    Generate tax-compliant invoices, track payments for tax
                    purposes, and simplify end-of-year accounting with detailed
                    reports.
                  </p>
                  <div className="w-full h-0.5 bg-slate-600"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 relative">
            <Image
              src="/analyze.png"
              alt="invoice"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center px-20 py-20 gap-20">
        <div className="w-full flex justify-between items-center">
          <div className="w-1/2 flex flex-col gap-10">
            <p className="text-6xl font-bold">What our client says</p>
            <p>
              Track your entire project from start to finish with beautiful
              views that make project planning a breeze manage your resources
            </p>
          </div>
          <div>
            <Button className="p-9 rounded-[2rem] text-xl">
              View all story
            </Button>
          </div>
        </div>
        <div className="w-full flex justify-between items-center gap-10">
          <div className="w-full flex flex-col bg-red-200 p-5 gap-10 rounded-xl">
            <div className="w-full flex items-center gap-5">
              <div className="relative h-16 w-16">
                <Image
                  src="/olly.jpg"
                  alt="olly"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="text-lg font-bold">Palmer Beckett</p>
                <p className="text-sm text-slate-500">Marketing Director</p>
              </div>
            </div>
            <div className="w-full">
              <p>
                This platform has completely transformed how we manage our
                invoices. We used to spend hours each week creating, sending,
                and tracking invoices manually, but now everything is automated.
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col bg-yellow-200 p-5 gap-10 rounded-xl">
            <div className="w-full flex items-center gap-5">
              <div className="relative h-16 w-16">
                <Image
                  src="/sandra.jpg"
                  alt="olly"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="text-lg font-bold">Sandra Robert</p>
                <p className="text-sm text-slate-500">Marketing Director</p>
              </div>
            </div>
            <div className="w-full">
              <p>
                This platform has completely transformed how we manage our
                invoices. We used to spend hours each week creating, sending,
                and tracking invoices manually, but now everything is automated.
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col bg-green-200 p-5 gap-10 rounded-xl">
            <div className="w-full flex items-center gap-5">
              <div className="relative h-16 w-16">
                <Image
                  src="/gomez.jpg"
                  alt="olly"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="text-lg font-bold">Olly Beckett</p>
                <p className="text-sm text-slate-500">Marketing Director</p>
              </div>
            </div>
            <div className="w-full">
              <p>
                This platform has completely transformed how we manage our
                invoices. We used to spend hours each week creating, sending,
                and tracking invoices manually, but now everything is automated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
