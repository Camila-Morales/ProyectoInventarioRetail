import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Product } from '../types/product'
import { FaPlus, FaSpinner, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { useProducts } from '../hooks/useProducts'
import { putProduct } from '../services/product.service'
import { generateSku } from '../utils/product.util'

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('The name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().positive('Price must be positive').required('Price is required'),
  stock: Yup.number()
    .integer('Stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .required('Stock is required'),
})

interface EditProductModalProps {
  product: Product
  onClose: () => void
  onSave: (updatedProduct: Product | undefined) => void
}

export function EditProductModal({ product, onClose, onSave }: EditProductModalProps) {
  const { products } = useProducts()
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-white">
      <div className="relative w-full max-w-md rounded-lg border-orange-500 bg-white p-6 shadow-lg">
        <button className="absolute top-2 right-2 text-red-500" type="button" onClick={onClose}>
          <FaTimes size={20} />
        </button>
        <header>
          <h2 className="mb-4 text-center text-xl font-bold">Edit Product</h2>

          {error && <p className="text-center text-red-600">{error}</p>}
          {message && <p className="text-center text-green-600">{message}</p>}
        </header>
        <Formik
          initialValues={{
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
          }}
          validationSchema={ProductSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              if (!products) return setError('Cannot update product at this time, try again later.')

              const productUpdated = await putProduct(product.id, {
                name: values.name,
                description: values.description,
                price: values.price,
                stock: values.stock,
                sku: generateSku(products.length, values.name),
              })

              if (!productUpdated) {
                setError('Product could not be updated, please try again later.')
              } else {
                setMessage('Product updated successfully')
                resetForm()
                onSave(productUpdated)
              }

              setSubmitting(false)
            } catch (error) {
              if (error instanceof Error || error instanceof AxiosError) setError(error.message)
            }
            onClose()
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Field
                name="name"
                type="text"
                placeholder="Name"
                className="rounded-md border border-orange-500 p-2"
              />
              <ErrorMessage name="name" component="span" className="text-sm text-red-500" />

              <Field
                name="description"
                type="text"
                placeholder="Description"
                className="rounded-md border border-orange-500 p-2"
              />
              <ErrorMessage name="description" component="span" className="text-sm text-red-500" />

              <Field
                name="price"
                type="number"
                placeholder="Price"
                className="rounded-md border border-orange-500 p-2"
              />
              <ErrorMessage name="price" component="span" className="text-sm text-red-500" />

              <Field
                name="stock"
                type="number"
                placeholder="Stock"
                className="rounded-md border border-orange-500 p-2"
              />
              <ErrorMessage name="stock" component="span" className="text-sm text-red-500" />

              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  className="rounded-md bg-red-500 px-4 py-2 text-white"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-md bg-orange-600 px-5 py-2 text-white hover:bg-orange-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <FaSpinner className="inline animate-spin" />
                  ) : (
                    <>
                      <FaPlus /> Update
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
