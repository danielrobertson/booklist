import React from 'react';
import Image from 'next/image';
import UserSignInOutButton from './UserSignInOutButton';

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="mx-auto max-w-3xl flex justify-between p-3">
      <div className="flex items-center px-2 py-2">
        <Image
          className="rounded-md"
          src="/logo.png"
          alt="Book"
          width={40}
          height={40}
          loading="eager"
          priority={true}
        />
        <h1 className="ml-1 text-2xl font-bold">Booklists</h1>
      </div>
      <UserSignInOutButton />
    </header>
  );
}
