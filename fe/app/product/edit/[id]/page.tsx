'use client';

import Layout from '@/components/ui/Layout';
import { service, serviceShow, serviceUpdate } from '@/services/services';
import { Button, MenuItem, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useParams, useRouter } from 'next/navigation';

export default function ProductEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isError, setIsError] = useState<Record<string, boolean>>({});
  const [formValues, setFormValues] = useState({
    name: '',
    code: '',
    product_category_id: '',
  });
  const [categories, setCategories] = useState<{ id: string | number; name: string }[]>([]);

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

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

  const getProduct = useCallback(async () => {
    setFetching(true);
    const response = await serviceShow('product', id);
    if (!response.error) {
      setFormValues({
        name: response.data.name,
        code: response.data.code || '',
        product_category_id: response.data.product_category_id || '',
      });
    } else {
      toast.error(response.message);
    }
    setFetching(false);
  }, [id]);

  useEffect(() => {
    getCategories();
    getProduct();
  }, [getProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsError((prevError) => ({ ...prevError, [name]: false }));
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const submitData = new FormData(e.currentTarget);

      const response = await serviceUpdate(
        'product',
        submitData,
        id
      );
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

  if (fetching) {
    return (
      <Layout>
        <div className="flex justify-center h-96">
          <p className="text-black text-md font-bold text-center">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex w-full justify-between items-center my-4">
      <h1 className="text-black text-2xl font-bold">Product Edit</h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TextField
            error={isError.name}
            onChange={handleChange}
            name="name"
            id="name"
            label="Name"
            variant="standard"
            value={formValues.name}
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
            label="Code"
            variant="standard"
            value={formValues.code}
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
            value={formValues.product_category_id}
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

