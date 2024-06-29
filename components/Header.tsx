import React from 'react';
import Image from 'next/image';
import UserSignInOutButton from './UserSignInOutButton';
import Link from 'next/link';

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="mx-auto max-w-screen-xl flex justify-between items-center px-3">
      <Link href="/" className="flex items-center px-2 py-2">
        <Image
          className="rounded-md"
          src="/logo.png"
          alt="Book"
          width={30}
          height={30}
          loading="eager"
          priority={true}
        />
        <h1 className="ml-1 text-xl font-bold">booklists</h1>
      </Link>
      <UserSignInOutButton />
    </header>
  );
}
