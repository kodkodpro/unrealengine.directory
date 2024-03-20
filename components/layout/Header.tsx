"use client"

import { Dialog } from "@headlessui/react"
import { ChevronDownIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid"
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useState } from "react"
import { signOut } from "@/actions/auth"
import { Button } from "@/components/catalyst/button"
import { Dropdown, DropdownButton, DropdownItem, DropdownLabel, DropdownMenu } from "@/components/catalyst/dropdown"
import UnrealEngineLogo from "@/components/UnrealEngineLogo"
import useCurrentUser from "@/hooks/useCurrentUser"

const navigation = [
  { name: "Top Assets", href: "#" },
  { name: "Recent Assets", href: "#" },
  { name: "Discounts", href: "#" },
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
            <UnrealEngineLogo className="inline-block h-8 w-auto dark:text-white" />
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
          {currentUser ? (
            <Dropdown>
              <DropdownButton plain>
                {currentUser.name ?? "Account"}
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu>
                <DropdownItem onClick={() => signOut()}>
                  <ArrowRightStartOnRectangleIcon />
                  <DropdownLabel>Sign Out</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              plain
              href="/sign-in"
            >
              Sign In
              <ArrowRightIcon />
            </Button>
          )}
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
              <span className="sr-only">UnrealEngine Directory</span>
              <UnrealEngineLogo
                className="h-8 w-auto dark:text-white"
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
                <Button
                  plain
                  href="/sign-in"
                  className="block w-full justify-start"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
