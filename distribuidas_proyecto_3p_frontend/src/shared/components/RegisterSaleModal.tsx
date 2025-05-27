import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import { FaPlus, FaSpinner, FaTimes } from 'react-icons/fa'
import { registrarVenta } from '../../store/services/venta.service'
import { getProducts } from '../../store/services/product.service'
import { Product } from '../../store/types/product'

const VentaSchema = Yup.object().shape({
  cliente: Yup.string().required('El cliente es obligatorio'),
  detalles: Yup.array()
    .of(
      Yup.object().shape({
        productoId: Yup.number().required('Producto requerido'),
        cantidad: Yup.number().min(1, 'Mínimo 1 unidad').required('Cantidad requerida'),
      }),
    )
    .min(1, 'Debe agregar al menos un producto'),
})

interface RegisterSaleModalProps {
  onClose: () => void
  onSave: () => void
}

export function RegisterSaleModal({ onClose, onSave }: RegisterSaleModalProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
  getProducts()
    .then((result) => {
      if (result) setProducts(result)
      else setError('No se pudo cargar productos')
    })
    .catch(() => setError('Error al cargar productos'))
}, [])


  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-white">
      <div className="relative w-full max-w-xl rounded-lg border-orange-500 bg-white p-6 shadow-lg">
        <button className="absolute top-2 right-2 text-red-500" type="button" onClick={onClose}>
          <FaTimes size={20} />
        </button>
        <header>
          <h2 className="mb-4 text-center text-xl font-bold">Registrar Venta</h2>
          {error && <p className="text-center text-red-600">{error}</p>}
        </header>

        <Formik
          initialValues={{
            cliente: '',
            detalles: [{ productoId: '', cantidad: 1 }],
          }}
          validationSchema={VentaSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await registrarVenta(values)
              onSave()
              onClose()
            } catch (err) {
              setError('No se pudo registrar la venta')
            }
            setSubmitting(false)
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col gap-3">
              <Field
                name="cliente"
                type="text"
                placeholder="Nombre del cliente"
                className="rounded-md border border-orange-500 p-2"
              />
              <ErrorMessage name="cliente" component="span" className="text-sm text-red-500" />

              {values.detalles.map((detalle, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Field as="select" name={`detalles.${index}.productoId`} className="w-2/3 p-2 border rounded">
                    <option value="">Seleccione producto</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} - Stock: {p.stock}
                      </option>
                    ))}
                  </Field>

                  <Field
                    type="number"
                    name={`detalles.${index}.cantidad`}
                    className="w-1/3 p-2 border rounded"
                    min={1}
                  />
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() =>
                      setFieldValue(
                        'detalles',
                        values.detalles.filter((_, i) => i !== index),
                      )
                    }
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setFieldValue('detalles', [...values.detalles, { productoId: '', cantidad: 1 }])}
                className="self-start text-sm text-blue-600 hover:underline"
              >
                + Agregar otro producto
              </button>

              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  className="rounded-md bg-red-500 px-4 py-2 text-white"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-md bg-orange-600 px-5 py-2 text-white hover:bg-orange-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <FaSpinner className="animate-spin" /> : <><FaPlus /> Registrar</>}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
