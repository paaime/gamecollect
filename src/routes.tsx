import React from 'react';
import { MdFavoriteBorder } from 'react-icons/md';

// Icon Imports
import {
  MdPerson,
  MdLock,
  MdOutlineSearch,
  MdOutlineCollectionsBookmark,
} from 'react-icons/md';

const routes = [
  {
    name: 'Search',
    layout: '',
    path: 'search',
    icon: <MdOutlineSearch className="h-6 w-6" />,
  },
  {
    name: 'My Collection',
    layout: '',
    path: 'collection',
    icon: <MdOutlineCollectionsBookmark className="h-6 w-6" />,
  },
  {
    name: 'Favorites',
    layout: '',
    path: 'favorites',
    icon: <MdFavoriteBorder className="h-6 w-6" />,
  },
  {
    name: 'Profile',
    layout: '',
    path: 'profile',
    icon: <MdPerson className="h-6 w-6" />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: 'sign-in',
    icon: <MdLock className="h-6 w-6" />,
  },
  {
    name: 'Game',
    layout: '/game',
    path: '',
    icon: <MdLock className="h-6 w-6" />,
  },
];
export default routes;
