"use client"

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { signOutService } from '@/services/data-types/auth-service-type'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

const settings = [
  { name: 'Profile', href: '/profile' },
  { name: 'Account', href: '/account' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Logout', href: '/login' },
];

export default function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const router = useRouter();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogout = async () => {
    try {
      const response = await signOutService();

      if (response.error) {
        toast.error(response.message);
      } else {
        Cookies.remove('token');
        await router.push('/login');
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

const pathname = usePathname()
const navClass = (path:string) =>
    pathname === path
      ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"

return (
    <nav className="w-full relative bg-gray-800 shadow-xl/30 rounded-xl ">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
  <div className="relative flex h-16 items-center justify-between">

    {/* Mobile menu button */}
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      <button
        type="button"
        className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
      >
        <span className="absolute -inset-0.5"></span>
        <span className="sr-only">Open main menu</span>
      </button>
    </div>

    {/* KIRI: Logo + Menu */}
    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
      <div className="flex shrink-0 items-center">
        <img
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
          className="h-8 w-auto"
        />
      </div>

      <div className="hidden sm:ml-6 sm:block">
        <div className="flex space-x-4">
          <Link href="/" className={navClass("/")}>Home</Link>
          <Link href="/product-category" className={navClass("/product-category")}>Product-Category</Link>
          <Link href="/product" className={navClass("/product")}>Product</Link>
          <Link href="/product-variant" className={navClass("/product-variant")}>Product-Variant</Link>
        </div>
      </div>
    </div>

    {/* KANAN: Profile dropdown */}
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>

        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
              <Typography
                sx={{ textAlign: 'start' }}
                onClick={setting.name === 'Logout' ? onLogout : undefined}
                component={setting.name === 'Logout' ? 'div' : Link}
                href={setting.name === 'Logout' ? undefined : setting.href}
              >
                {setting.name}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </div>

  </div>
</div>


</nav>


  )
}
