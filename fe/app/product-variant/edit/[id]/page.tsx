'use client';

import Layout from '@/components/ui/Layout';
import { service, serviceShow, serviceUpdate } from '@/services/services';
import { Button, MenuItem, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useParams, useRouter } from 'next/navigation';

export default function ProductCategoryEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isError, setIsError] = useState<Record<string, boolean>>({});
  const [formValues, setFormValues] = useState({
    name: '',
    price: '',
    stock: '',
    variant_product_id: '',
  });
  const [products, setProducts] = useState<{ id: string | number; name: string }[]>([]);

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

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

  const getProductVariant = useCallback(async () => {
    setFetching(true);
    const response = await serviceShow('product-variant', id);
    if (!response.error) {
      setFormValues({
        name: response.data.name,
        price: response.data.price || '',
        stock: response.data.stock || '',
        variant_product_id: response.data.variant_product_id || '',
      });
    } else {
      toast.error(response.message);
    }
    setFetching(false);
  }, [id]);

  useEffect(() => {
    getProducts();
    getProductVariant();
  }, [getProductVariant]);

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
        'product-variant',
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
      <h1 className="text-black text-2xl font-bold">Product Variant Edit</h1>
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
            value={formValues.name}
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
            label="Price Product Variant"
            variant="standard"
            value={formValues.price}
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
            value={formValues.stock}
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
            value={formValues.variant_product_id}
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

