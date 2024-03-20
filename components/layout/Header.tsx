"use client"

import { Dialog } from "@headlessui/react"
import { ChevronDownIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid"
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { EyeIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { User } from "next-auth"
import { useState } from "react"
import { signOut } from "@/actions/auth"
import { Button } from "@/components/catalyst/button"
import { Dropdown, DropdownButton, DropdownItem, DropdownLabel, DropdownMenu, DropdownSeparator } from "@/components/catalyst/dropdown"
import useCurrentUser from "@/hooks/useCurrentUser"

const navigation = [
  { name: "⏱️ Recent Assets", href: "/?orderBy=newest" },
  { name: "👑 Top Assets", href: "/?rating=4%2B&ratingVoters=25%2B&orderBy=most-voters" },
  { name: "🔥 Discounts", href: "/?discount=1%2B&orderBy=newest" },
  { name: "🚀 Top with Discounts", href: "/?rating=4%2B&ratingVoters=25%2B&discount=1%2B&orderBy=most-voters" },
]

export default function Header() {
  const currentUser = useCurrentUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <header className="border-b border-zinc-950/10 dark:border-white/10">
      <nav
        className="flex items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="-m-1.5 p-1.5"
          >
            <Image
              src="/logo-white.png"
              alt="Unreal Engine Directory"
              className="hidden h-8 w-auto dark:inline-block"
              width={614}
              height={84}
            />

            <Image
              src="/logo-black.png"
              alt="Unreal Engine Directory"
              className="inline-block h-8 w-auto dark:hidden"
              width={614}
              height={84}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700 dark:text-zinc-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              className="size-6"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-4">
          {navigation.map((item) => (
            <Button
              plain
              key={item.name}
              href={item.href}
            >
              {item.name}
            </Button>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <UserMenu currentUser={currentUser} />
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white p-4 sm:max-w-sm sm:ring-1 sm:ring-zinc-900/10 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="-m-1.5 p-1.5"
            >
              <Image
                src="/logo-white.png"
                alt="Unreal Engine Directory"
                className="hidden h-8 w-auto dark:inline-block"
                width={614}
                height={84}
              />

              <Image
                src="/logo-black.png"
                alt="Unreal Engine Directory"
                className="inline-block h-8 w-auto dark:hidden"
                width={614}
                height={84}
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-zinc-700 dark:text-zinc-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon
                className="size-6"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-zinc-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Button
                    plain
                    key={item.name}
                    href={item.href}
                    className="block w-full justify-start"
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
              <div className="py-6">
                <UserMenu currentUser={currentUser} />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

function UserMenu({ currentUser }: { currentUser: User | null }) {
  if (!currentUser) {
    return (
      <Button
        plain
        href="/sign-in"
      >
        Sign In
        <ArrowRightIcon />
      </Button>
    )
  }
  
  return (
    <Dropdown>
      <DropdownButton plain>
        {currentUser.name ?? "Account"}
        <ChevronDownIcon />
      </DropdownButton>
      <DropdownMenu className="z-20">
        <DropdownItem href="/watchlist">
          <EyeIcon />
          <DropdownLabel>Watchlist</DropdownLabel>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem onClick={() => signOut()}>
          <ArrowRightStartOnRectangleIcon />
          <DropdownLabel>Sign Out</DropdownLabel>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
