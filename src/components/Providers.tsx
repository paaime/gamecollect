'use client';

import { SessionProvider, getSession } from 'next-auth/react';
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';

interface LayoutProps {
  children: ReactNode;
}

type Collection = {
  public: boolean;
  items: Array<number>;
};

interface UserContextType {
  collection: Collection; // replace any with the actual type of the items in the collection
  setCollection: React.Dispatch<React.SetStateAction<Collection>>; // replace any with the actual type of the items in the collection
  updateCollectionItems: (
    id: number,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => Promise<void>;
  isCollectionItem: (id: number) => boolean;
  favorites: Array<number>;
  setFavorites: React.Dispatch<React.SetStateAction<Array<number>>>;
  updateFavorites: (
    id: number,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => Promise<void>;
  isFavorite: (id: number) => boolean;
}

const Context = createContext<UserContextType | null>(null);

const Providers: FC<LayoutProps> = ({ children }) => {
  const [collection, setCollection] = useState({
    public: true,
    items: [],
  });
  const [favorites, setFavorites] = useState([]);

  const getUserData = async () => {
    try {
      const session = await getSession();

      if (!session?.user) return;

      const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_msg || 'Something went wrong');
      }

      setCollection(data.collection);
      setFavorites(data.favorites.items);
    } catch (e) {
      setCollection({
        public: true,
        items: [],
      });
      setFavorites([]);
    }
  };

  const updateCollectionItems = async (
    id: number,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => {
    try {
      setLoading(true);
      const response = await fetch('/api/collection/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_msg || 'Something went wrong');
      }

      setCollection(data.collection);

      switch (data.action) {
        case 'add':
          toast.success('Added to collection.');
          break;
        case 'remove':
          toast.success('Removed from collection.');
          break;
        default:
          break;
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const updateFavorites = async (
    id: number,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => {
    try {
      setLoading(true);
      const response = await fetch('/api/favorites', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_msg || 'Something went wrong');
      }

      setFavorites(data.favorites);

      switch (data.action) {
        case 'add':
          toast.success('Added to favorites.');
          break;
        case 'remove':
          toast.success('Removed from favorites.');
          break;
        default:
          break;
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (id: number) => {
    return favorites.includes(id);
  };

  const isCollectionItem = (id: number) => {
    return collection.items.includes(id);
  };

  const user: UserContextType = {
    collection,
    setCollection,
    updateCollectionItems,
    isCollectionItem,
    favorites,
    setFavorites,
    updateFavorites,
    isFavorite,
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Context.Provider value={user}>
      <SessionProvider>{children}</SessionProvider>;
    </Context.Provider>
  );
};

export const useUser = () => useContext(Context);

export default Providers;
