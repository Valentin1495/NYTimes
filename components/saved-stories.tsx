'use client';

import db from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import SavedStory from './saved-story';
import { FolderHeartIcon } from './icons';
import { SaveToggleBtnProps } from './save-toggle-btn';
import EmptySpace from './empty-space';
import LoadingSkeleton from './loading-skeleton';

export default function SavedStories() {
  const { data: session } = useSession();
  const email = session?.user?.email as string;

  const [stories, loading] = useCollection(
    query(
      collection(db, 'users', email, 'saved stories'),
      orderBy('createdAt', 'desc')
    )
  );

  if (loading) return <LoadingSkeleton />;

  return (
    <div className='py-10 space-y-5'>
      <div className='flex items-center gap-x-2 '>
        <FolderHeartIcon className='w-8 h-8' />
        <h1 className='text-3xl font-medium'>Saved stories</h1>
      </div>
      {stories?.empty ? (
        <EmptySpace />
      ) : (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-3'>
          {stories?.docs.map((doc) => {
            const data = doc.data() as SaveToggleBtnProps;

            return <SavedStory key={doc.id} {...data} />;
          })}
        </div>
      )}
    </div>
  );
}
