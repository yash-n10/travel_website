import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface BookNowButtonProps {
  amount: number;           // in rupees
  currency?: string;        // defaults to 'INR'
  slot_id: string;
  courseTitle: string;
}

export const BookNowButton: React.FC<BookNowButtonProps> = ({
  amount,
  currency = 'INR',
  slot_id,
  courseTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    id: '',
    name: '',
    email: '',
    contact: '',
    travelDate: '',
    persons: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {}, []);
  console.log('User details:', userDetails);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    try {
      setIsLoading(true); // Start loading

      console.log('Booking details:', userDetails);
      console.log('Amount:', amount);
      console.log('Currency:', currency);

      // Razorpay SDK is loaded globally via next/script in app/layout.tsx

      // 1) Create order on backend
      const orderRes = await axios.post(
        'https://travel-website-backend-beta.vercel.app/create-order',
        { amount, currency }
      );
      console.log('Order response:', orderRes.data);
      const orderPayload = orderRes.data?.order ?? orderRes.data ?? {};
      const order_id = orderPayload.id ?? orderRes.data?.id;
      const paiseAmount = orderPayload.amount ?? orderRes.data?.amount;
      if (!order_id || typeof paiseAmount !== 'number' || Number.isNaN(paiseAmount)) {
        console.error('Invalid order response:', orderRes.data);
        toast.error('Order creation failed. Please try again.');
        setIsLoading(false);
        return;
      }
      console.log('Using order_id:', order_id, 'amount(paise):', paiseAmount);

      // 2) Configure Razorpay: fetch public key from backend to avoid env mismatch
      const keyResp = await axios.get('https://travel-website-backend-beta.vercel.app/public-key');
      const keyId = keyResp?.data?.key;
      if (!keyId) {
        console.error('Razorpay key missing from backend /public-key');
        toast.error('Payment key missing. Please try again later.');
        setIsLoading(false);
        return;
      }

      const options = {
        key: keyId,
        currency,
        name: 'NeeevAI',
        description: 'Enrollment Platform ',
        order_id,
        handler: async (resp: any) => {
          await axios.post(
            'https://travel-website-backend-beta.vercel.app/payment-success-email',
            {
              studentName: userDetails.name,
              studentEmail: userDetails.email,
              orderId: resp.razorpay_order_id,
              paymentId: resp.razorpay_payment_id,
              amount: paiseAmount / 100,
              currency,
              courseTitle: courseTitle,
            }
          );

          // e) Send all details to external API as multipart/form-data
          try {
            const formData = new FormData();
            formData.append('name', userDetails.name || '');
            formData.append('email', userDetails.email || '');
            formData.append('contact', userDetails.contact || '');
            formData.append('travelDate', userDetails.travelDate || '');
            formData.append('persons', String(userDetails.persons || ''));
            formData.append('amount', String(paiseAmount / 100));
            formData.append('currency', currency);
            formData.append('courseTitle', courseTitle || '');
            formData.append('slot_id', String(slot_id));
            formData.append('razorpay_order_id', resp.razorpay_order_id || '');
            formData.append('razorpay_payment_id', resp.razorpay_payment_id || '');

            await axios.post(
              'https://ecomlancers.com/travel_website/Api/payment_data',
              formData,
              { headers: { 'Content-Type': 'multipart/form-data' } }
            );
          } catch (e) {
            console.error('Failed to send payment data to external API:', e);
          }

          toast.success('Payment successful! Receipt emailed.');
  
            console.log('Payment successful!');
            console.log('Payment details:', resp);
            
            setTimeout(() => {
              router.push('/studentDashboard');
            }, 3500);
            
            toast.success('Payment successful!');
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.contact,
        },
        theme: { color: '#4e73df' },
        modal: {
          ondismiss: () => {
            setIsLoading(false); // Stop loading if modal is dismissed
          }
        }
      };

      // 3) Open Razorpay widget
      const razorpay = new (window as any).Razorpay(options);
      // Listen for failures for better debugging and user feedback
      if (razorpay && typeof razorpay.on === 'function') {
        razorpay.on('payment.failed', (failure: any) => {
          console.error('Razorpay payment.failed:', failure);
          const message = failure?.error?.description || 'Payment failed. Please try again.';
          toast.error(message);
          setIsLoading(false);
        });
      }
      razorpay.open();

      // Set loading to false after Razorpay is opened
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false); // Stop loading on error
      console.error('Payment initiation failed:', err);
      alert('Could not start payment. Please try again.');
    }
  };


  // after collecting details, kick off payment then close dialog
  const proceed = () => {
    // Guard against empty or past dates
    if (!userDetails.travelDate) {
      toast.error('Please select a travel date.');
      return;
    }
    if (userDetails.travelDate < today) {
      toast.error('Travel date cannot be in the past.');
      return;
    }
    handlePayment();
  };

  return (
    <>
      <button
        onClick={openDialog}
        className="w-full flex items-center justify-center rounded bg-red-600 hover:bg-red-700 text-white py-3 text-sm font-semibold"
      >
        Book Now <ChevronRight className="ml-2" />
      </button>

      <Dialog open={isOpen} onClose={closeDialog}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <DialogPanel className="bg-white dark:bg-black/50 text-black dark:text-white border rounded-xl p-6 max-w-md w-full">
            <DialogTitle className="text-lg font-semibold">
              Verify Your Details
            </DialogTitle>
            <div className="mt-4 space-y-4">
              {/** Name */}
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
              {/** Email */}
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={userDetails.email}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
              {/** Contact */}
              <input
                name="contact"
                type="text"
                placeholder="Contact Number"
                value={userDetails.contact}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
              {/* Travel date */}
              <input
                name="travelDate"
                type="date"
                placeholder="Travel Date"
                value={userDetails.travelDate}
                onChange={handleInputChange}
                min={today}
                className="w-full border rounded px-3 py-2"
              />
              {/* No of person */}
              <input
                name="persons"
                type="number"
                min={1}
                placeholder="Number of Persons"
                value={userDetails.persons}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <Button
                onClick={proceed}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  'Proceed'
                )}
              </Button>
              <Button
                onClick={closeDialog}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded"
              >
                Cancel
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
