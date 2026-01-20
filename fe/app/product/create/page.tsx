'use client';

import Layout from '@/components/ui/Layout';
import { service, serviceStore } from '@/services/services';
import { Button, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function ProductCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<Record<string, boolean>>({});
  const [categories, setCategories] = useState<{ id: string | number; name: string }[]>([]);

  const router = useRouter();

  const getCategories = async () => {
    try {
      const response = await service('categorie-product');
      if (!response.error) {
        setCategories(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsError((prevError) => ({ ...prevError, [name]: false }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const submitData = new FormData(e.currentTarget);

      const response = await serviceStore('product', submitData);
      if (response.error) {
        if (response.message == 'Token has expired') {
          Cookies.remove('token'); 
          router.push('/');
        } else if (response.message) {
          if (typeof response.message === 'object') {
            Object.entries(response.message).forEach(([key, value]) => {
              if (Array.isArray(value)) {
                setIsError((prevError) => ({ ...prevError, [key]: true }));
                toast.error(value[0]);
              }
            });
          } else {
            toast.error(response.message);
          }
        }
      } else {
        toast.success(response.data.message);
        router.push('/product');
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
       <div className="flex w-full justify-between items-center my-4">
      <h1 className="text-black text-2xl font-bold">Product Create</h1>
       </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TextField
            error={isError.name}
            onChange={handleChange}
            name="name"
            id="name"
            label="Name Product"
            variant="standard"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            error={isError.code}
            onChange={handleChange}
            name="code"
            id="code"
            label="Code Product"
            variant="standard"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            select
            error={isError.product_category_id}
            onChange={handleChange}
            name="product_category_id"
            id="product_category_id"
            label="Category Product"
            variant="standard"
            defaultValue=""
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          >
            {categories.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="contained" loading={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </Layout>
  );
}

