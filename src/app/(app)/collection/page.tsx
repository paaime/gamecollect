import Header from 'components/collection/Header';
import CollectionList from './collectionList';

export const metadata = {
  title: 'Game Collect | Collection',
};

export default async function Collection() {
  return (
    <div className="mt-3 h-full">
      <Header />

      <CollectionList />
    </div>
  );
}
