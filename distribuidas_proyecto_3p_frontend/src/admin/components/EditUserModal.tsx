import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { User } from '../types/user'
import { FaPlus, FaSpinner, FaTimes } from 'react-icons/fa'
import { UserRole } from '../enums/user.enum'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { useUsers } from '../hooks/useUsers'
import { putUser } from '../services/user.service'

const UserSchema = Yup.object().shape({
  name: Yup.string().required('The name is required'),
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is mandatory'),
  role: Yup.number()
    .oneOf([UserRole.ADMIN, UserRole.STORE], 'Invalid role')
    .required('The role is mandatory'),
  status: Yup.boolean().required('The state is mandatory'),
})

interface EditUserModalProps {
  user: User
  onClose: () => void
  onSave: (updatedUser: User | undefined) => void
}

export function EditUserModal({ user, onClose, onSave }: EditUserModalProps) {
  const { users } = useUsers()
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-white">
      <div className="relative w-full max-w-md rounded-lg border-orange-500 bg-white p-6 shadow-lg">
        <button className="absolute top-2 right-2 text-red-500" type="button" onClick={onClose}>
          <FaTimes size={20} />
        </button>
        <header>
          <h2 className="mb-4 text-center text-xl font-bold">Edit User</h2>

          {error && <p className="text-center text-red-600">{error}</p>}
          {message && <p className="text-center text-green-600">{message}</p>}
        </header>
        <Formik
          initialValues={{
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
            status: user.status,
          }}
          validationSchema={UserSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              if (!users) return setError('Cannot add user at this time, try again later.')

              if (
                users.some(
                  (originalUser) =>
                    originalUser.email === values.email && originalUser.id !== user.id,
                )
              )
                return setError('This user is already registered, try with another email address')

              const userUpdated = await putUser(user.id, {
                email: values.email,
                name: values.name,
                password: values.password,
                role: values.role,
                status: values.status,
              })

              if (!userUpdated) {
                setError('User could not be updated, please try again later.')
              } else {
                setMessage('User updated successfully')
                resetForm()
                onSave(userUpdated)
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
                name="email"
                type="email"
                placeholder="Email"
                className="rounded-md border border-orange-500 p-2"
              />
              <ErrorMessage name="email" component="span" className="text-sm text-red-500" />

              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="rounded-md border border-orange-500 p-2"
              />
              <ErrorMessage name="password" component="span" className="text-sm text-red-500" />

              <Field as="select" name="role" className="rounded-md border border-orange-500 p-2">
                <option value="">Select a role</option>
                <option value={UserRole.ADMIN}>Admin</option>
                <option value={UserRole.STORE}>Store</option>
              </Field>
              <ErrorMessage name="role" component="span" className="text-sm text-red-500" />

              <Field as="select" name="status" className="rounded-md border border-orange-500 p-2">
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </Field>
              <ErrorMessage name="status" component="span" className="text-sm text-red-500" />

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
