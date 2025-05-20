import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FaPlus, FaSpinner } from 'react-icons/fa'
import { UserRole } from '../enums/user.enum'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { useUsers } from '../hooks/useUsers'
import { postUser } from '../services/user.service'

const UserSchema = Yup.object().shape({
  name: Yup.string().required('The name is required'),
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is mandatory'),
  role: Yup.number()
    .oneOf([UserRole.ADMIN, UserRole.STORE], 'Invalid role')
    .required('The role is mandatory'),
  status: Yup.boolean().required('The state is mandatory'),
})

export function AddUserForm() {
  const { users } = useUsers()
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', role: 0, status: true }}
      validationSchema={UserSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          if (!users) return setError('Cannot add user at this time, try again later.')

          if (users.some((user) => user.email === values.email))
            return setError('This user is already registered, try with another email address')

          const userCreated = await postUser({
            email: values.email,
            name: values.name,
            password: values.password,
            role: values.role,
            status: values.status,
          })

          if (!userCreated) {
            setError('User could not be created, please try again later.')
          } else {
            setMessage('User created successfully')
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
            <h3 className="text-center text-xl font-semibold">Add user</h3>

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
                htmlFor="email"
              >
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="w-2/3 rounded-md border border-gray-300 p-1"
              />
              <ErrorMessage name="email" component="span" className="text-sm text-red-500" />
            </div>

            <div className="flex items-center gap-10 rounded-md bg-gray-100 p-2">
              <label
                className="w-1/3 text-left font-semibold text-gray-600 uppercase"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="w-2/3 rounded-md border border-gray-300 p-1"
              />
              <ErrorMessage name="password" component="span" className="text-sm text-red-500" />
            </div>

            <div className="flex items-center gap-10 rounded-md bg-gray-100 p-2">
              <label
                className="w-1/3 text-left font-semibold text-gray-600 uppercase"
                htmlFor="role"
              >
                Role
              </label>
              <Field
                as="select"
                name="role"
                className="w-2/3 rounded-md border border-gray-300 p-1"
              >
                <option value="">Select a role</option>
                <option value={UserRole.ADMIN}>Admin</option>
                <option value={UserRole.STORE}>Store</option>
              </Field>
              <ErrorMessage name="role" component="span" className="text-sm text-red-500" />
            </div>

            <div className="flex items-center gap-10 rounded-md bg-gray-100 p-2">
              <label
                className="w-1/3 text-left font-semibold text-gray-600 uppercase"
                htmlFor="status"
              >
                Status
              </label>
              <Field
                as="select"
                name="status"
                className="w-2/3 rounded-md border border-gray-300 p-1"
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </Field>
              <ErrorMessage name="status" component="span" className="text-sm text-red-500" />
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
