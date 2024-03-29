import Image from 'next/image';
import { SolidStarIcon } from './icons';
import { Dispatch, RefObject, SetStateAction } from 'react';
import Link from 'next/link';
import SignOut from './sign-out';

type UserDropdownProps = {
  user: UserInfo;
  showDropdown: boolean;
  setShowDropdown: Dispatch<SetStateAction<boolean>>;
  dropdownRef: RefObject<HTMLDivElement>;
};

export default function UserDropdown({
  user,
  showDropdown,
  setShowDropdown,
  dropdownRef,
}: UserDropdownProps) {
  const { name, email, image } = user;

  return (
    <div
      ref={dropdownRef}
      className={`z-20 absolute right-0 bg-white w-[350px] rounded-xl shadow-lg overflow-hidden transition-opacity ${
        showDropdown ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='flex items-center gap-x-2 p-3'>
        <Image
          src={image}
          alt='Profile pic'
          width={60}
          height={60}
          className='object-cover rounded-full'
        />
        <div>
          <p className='truncate w-64'>{name}</p>
          <p className='truncate w-64 text-neutral-500'>{email}</p>
        </div>
      </div>
      <SignOut />
      <Link
        onClick={() => setShowDropdown(false)}
        href={'/my-saved-stories'}
        className='flex gap-x-3 hover:bg-neutral-100 p-3 transition-colors cursor-pointer'
      >
        <SolidStarIcon className='w-6 h-6 text-sky-500' />
        <p className='text-neutral-600'>Saved stories</p>
      </Link>
    </div>
  );
}
