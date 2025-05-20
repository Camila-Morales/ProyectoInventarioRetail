import { useEffect, useState } from 'react'
import { isValidEmail, isValidPassword } from '../../shared/utils/validations.util'
import { useAuth } from '../hooks/useAuth'
import { FaSpinner } from 'react-icons/fa'

const form = {
  email: {
    value: '',
    error: '',
  },
  password: {
    value: '',
    error: '',
  },
}

const validate = {
  email: (email: string) => !isValidEmail(email) && 'Invalid email format',
  password: (password: string) =>
    !isValidPassword(password) && 'Invalid password, at least 6 characters',
}

export function LoginForm() {
  const { error, login } = useAuth()
  const [fields, setFields] = useState(form)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
  }

  const handleChange = (field: keyof typeof form, value: string) => {
    setFields((fields) => ({
      ...fields,
      [field]: {
        value: value,
        error: validate[field](value),
      },
    }))
  }

  useEffect(() => {
    if (!submitting) return

    const loginAsync = async () => {
      await login(fields.email.value, fields.password.value)
      setSubmitting(false)
    }

    void loginAsync()
  }, [submitting, fields, login])

  return (
    <form
      className="mx-auto flex w-fit flex-col gap-4 rounded-lg border-2 border-orange-500 p-10"
      onSubmit={handleSubmit}
      noValidate
    >
      <h4 className="text-center text-xl font-semibold">Login</h4>
      {error && <p className="text-center text-sm text-red-600">{error}</p>}
      <div className="flex flex-col gap-2">
        <label className="" htmlFor="email">
          Email
        </label>
        <div className="flex flex-col gap-1">
          <input
            className="rounded-md border-1 border-gray-300 p-2"
            type="email"
            id="email"
            name="email"
            value={fields.email.value}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={submitting}
            autoComplete="email"
          />
          {fields.email.error && <p className="text-sm text-red-600">{fields.email.error}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <div className="flex flex-col gap-1">
          <input
            className="rounded-md border-1 border-gray-300 p-2"
            type="password"
            id="password"
            name="password"
            value={fields.password.value}
            onChange={(e) => handleChange('password', e.target.value)}
            disabled={submitting}
          />
          {fields.password.error && <p className="text-sm text-red-600">{fields.password.error}</p>}
        </div>
        <button
          className="rounded-md bg-orange-600 p-2 text-center text-gray-100 hover:cursor-pointer hover:bg-orange-500"
          type="submit"
        >
          {submitting ? <FaSpinner className="inline animate-spin" /> : 'Continue'}
        </button>
      </div>
    </form>
  )
}
