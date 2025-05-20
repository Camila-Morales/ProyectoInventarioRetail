import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FaPlus, FaSpinner } from 'react-icons/fa'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { useProducts } from '../hooks/useProducts'
import { postProduct } from '../services/product.service'
import { generateSku } from '../utils/product.util'

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('The name is required'),
  description: Yup.string().required('The description is required'),
  price: Yup.number().positive('The price must be positive').required('The price is required'),
  stock: Yup.number()
    .integer('The stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .required('The stock is required'),
})

export function AddProductForm() {
  const { products } = useProducts()
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  return (
    <Formik
      initialValues={{ name: '', description: '', price: 0, stock: 0 }}
      validationSchema={ProductSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          if (!products) return setError('Cannot add product at this time, try again later.')

          if (products.some((product) => product.name === values.name))
            return setError('This product is already registered, try with another name')

          const productCreated = await postProduct({
            name: values.name,
            description: values.description,
            price: values.price,
            stock: values.stock,
            sku: generateSku(products.length, values.name),
          })

          if (!productCreated) {
            setError('Product could not be created, please try again later.')
          } else {
            setMessage('Product created successfully')
          }

          resetForm()
          setSubmitting(false)
        } catch (error) {
          if (error instanceof Error || error instanceof AxiosError) setError(error.message)
        }
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <section className="mx-auto w-fit">
          <header>
            <h3 className="text-center text-xl font-semibold">Add Product</h3>
            {error && <p className="text-center text-red-600">{error}</p>}
            {message && <p className="text-center text-green-600">{message}</p>}
          </header>
          <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex items-center gap-10 rounded-md bg-gray-100 p-2">
              <label
                className="w-1/3 text-left font-semibold text-gray-600 uppercase"
                htmlFor="name"
              >
                Name
              </label>
              <Field
                name="name"
                type="text"
                className="w-2/3 rounded-md border border-gray-300 p-1"
              />
              <ErrorMessage name="name" component="span" className="text-sm text-red-500" />
            </div>

            <div className="flex items-center gap-10 rounded-md bg-gray-100 p-2">
              <label
                className="w-1/3 text-left font-semibold text-gray-600 uppercase"
                htmlFor="description"
              >
                Description
              </label>
              <Field
                name="description"
                type="text"
                className="w-2/3 rounded-md border border-gray-300 p-1"
              />
              <ErrorMessage name="description" component="span" className="text-sm text-red-500" />
            </div>

            <div className="flex items-center gap-10 rounded-md bg-gray-100 p-2">
              <label
                className="w-1/3 text-left font-semibold text-gray-600 uppercase"
                htmlFor="price"
              >
                Price
              </label>
              <Field
                name="price"
                type="number"
                className="w-2/3 rounded-md border border-gray-300 p-1"
              />
              <ErrorMessage name="price" component="span" className="text-sm text-red-500" />
            </div>

            <div className="flex items-center gap-10 rounded-md bg-gray-100 p-2">
              <label
                className="w-1/3 text-left font-semibold text-gray-600 uppercase"
                htmlFor="stock"
              >
                Stock
              </label>
              <Field
                name="stock"
                type="number"
                className="w-2/3 rounded-md border border-gray-300 p-1"
              />
              <ErrorMessage name="stock" component="span" className="text-sm text-red-500" />
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-md bg-orange-600 px-5 py-2 text-white hover:bg-orange-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <FaSpinner className="inline animate-spin" />
                ) : (
                  <>
                    <FaPlus /> Save
                  </>
                )}
              </button>
            </div>
          </Form>
        </section>
      )}
    </Formik>
  )
}
