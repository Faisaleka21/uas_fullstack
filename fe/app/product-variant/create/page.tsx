'use client';

import Layout from '@/components/ui/Layout';
import { service, serviceStore } from '@/services/services';
import { Button, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function ProductCategoryCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<Record<string, boolean>>({});
  const [products, setProducts] = useState<{ id: string | number; name: string }[]>([]);

  const router = useRouter();

  const getProducts = async () => {
    try {
      const response = await service('product');
      if (!response.error) {
        setProducts(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    getProducts();
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

      const response = await serviceStore('product-variant', submitData);
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
        router.push('/product-variant');
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
      <h1 className="text-black text-2xl font-bold">Product Variant Create</h1>
       </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TextField
            error={isError.name}
            onChange={handleChange}
            name="name"
            id="name"
            label="Name Product Variant"
            variant="standard"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            error={isError.price}
            onChange={handleChange}
            name="price"
            id="price"
            label="Price Product"
            variant="standard"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            error={isError.stock}
            onChange={handleChange}
            name="stock"
            id="stock"
            label="Stock Product"
            variant="standard"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            select
            error={isError.variant_product_id}
            onChange={handleChange}
            name="variant_product_id"
            id="variant_product_id"
            label="Variant Product"
            variant="standard"
            defaultValue=""
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          >
            {products.map((option) => (
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

