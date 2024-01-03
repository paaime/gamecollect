'use client';
import Card from 'components/card';
import Switch from 'components/switch';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineLoading } from 'react-icons/ai';

const CollectionSettings = ({ user }: { user: any }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [publicCollection, setPublicCollection] = useState(
    user?.collection?.public,
  );
  const [publicCollectionPrice, setPublicCollectionPrice] = useState(
    user?.collection?.public_price,
  );

  const saveChanges = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/settings/collection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicCollection,
          publicCollectionPrice,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_msg || 'Something went wrong');
      }

      toast.success('Settings updated successfully.');

      router.refresh();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card extra={'w-full p-6 h-full'}>
      <div className="mb-8 w-full">
        <p className="text-xl font-bold text-navy-700 dark:text-white">
          Collection Settings
        </p>
        <p className="mt-2 text-base text-gray-600">
          Here you can change your collection settings
        </p>
      </div>
      {/* Settings form */}
      <div className="flex flex-col gap-5">
        <div className="ml-3 mt-3 flex items-center gap-3">
          <Switch
            id="switch1"
            defaultChecked={publicCollection}
            onChange={(e) => setPublicCollection(e.target.checked)}
          />
          <label
            htmlFor="checkbox1"
            className="text-base font-medium text-navy-700 dark:text-white"
          >
            Public collection
          </label>
        </div>
        <div className="ml-3 mt-3 flex items-center gap-3">
          <Switch
            id="switch2"
            defaultChecked={publicCollectionPrice}
            onChange={(e) => setPublicCollectionPrice(e.target.checked)}
          />
          <label
            htmlFor="checkbox1"
            className="text-base font-medium text-navy-700 dark:text-white"
          >
            Show collection's price
          </label>
        </div>
      </div>
      {/* Submit button */}
      <div className="mt-8 flex justify-end">
        <button
          className="animate rounded-2xl bg-brand-400 px-8 py-3 text-sm font-medium transition-all hover:bg-brand-500"
          onClick={saveChanges}
        >
          {loading ? (
            <div className="flex h-full w-full items-center justify-center px-10">
              <AiOutlineLoading className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </Card>
  );
};

export default CollectionSettings;
