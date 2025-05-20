import { FaEdit, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa'
import { useProducts } from '../hooks/useProducts'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Product } from '../types/product'
import { EditProductModal } from './EditProductModal'
import { deleteProduct as deleteProductService } from '../services/product.service'

export function ProductTable() {
  const { products, loading, error } = useProducts()
  const [dashboardProducts, setDashboardProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (products && products.length > 0) {
      setDashboardProducts(products)
    }
  }, [products])

  const deleteProduct = (productIdDeleting: number) => {
    deleteProductService(productIdDeleting)
      .then((deleted) => {
        if (deleted) {
          setDashboardProducts(
            (products) => products?.filter((product) => product.id !== productIdDeleting) ?? null,
          )
        }
      })
      .catch(() => {})
  }

  const openEditModal = (product: Product) => {
    setEditingProduct(product)
  }

  const closeEditModal = () => {
    setEditingProduct(null)
  }

  const handleEditSave = (updatedProduct: Product | undefined) => {
    if (updatedProduct)
      setDashboardProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
      )

    closeEditModal()
  }

  return (
    <section className="px-8">
      <header className="flex items-center justify-between py-6 text-left">
        <div>
          <h2 className="text-2xl font-bold">Products</h2>
          <p className="text-gray-400">Page to manage products</p>
        </div>
        <div>
          <Link
            to={'/products/add'}
            className="flex items-center gap-2 rounded-md bg-orange-600 p-2 text-xs text-gray-100 hover:cursor-pointer hover:bg-orange-500"
          >
            <FaPlus /> Add product
          </Link>
        </div>
      </header>

      <div className="custom-scrollbar relative h-[70vh] overflow-y-auto">
        <table className="my-[-20px] w-full border-separate border-spacing-y-5 gap-4 text-center text-sm">
          <thead className="sticky top-0">
            <tr className="bg-gray-100">
              <th className="rounded-l-md border-t border-b border-l border-gray-300 p-2 px-5">
                ID
              </th>
              <th className="border-t border-b border-gray-300 p-2 px-5">Name</th>
              <th className="border-t border-b border-gray-300 p-2 px-5">SKU</th>
              <th className="border-t border-b border-gray-300 p-2 px-5">Description</th>
              <th className="border-t border-b border-gray-300 p-2 px-5">Price</th>
              <th className="border-t border-b border-gray-300 p-2 px-5">Stock</th>
              <th className="rounded-r-md border-t border-r border-b border-gray-300 p-2 px-5">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="p-2 text-center" colSpan={7}>
                  <FaSpinner className="inline animate-spin" />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td className="text-gray-400" colSpan={7}>
                  {error}
                </td>
              </tr>
            ) : dashboardProducts.length === 0 ? (
              <tr>
                <td className="text-gray-400" colSpan={7}>
                  Products not found
                </td>
              </tr>
            ) : (
              dashboardProducts.map((product) => (
                <tr key={product.id}>
                  <td className="rounded-l-md border-t border-b border-l border-gray-300 p-2 px-5">
                    {product.id}
                  </td>
                  <td className="border-t border-b border-gray-300 p-2 px-5">{product.name}</td>
                  <td className="border-t border-b border-gray-300 p-2 px-5">{product.sku}</td>
                  <td className="border-t border-b border-gray-300 p-2 px-5">
                    {product.description}
                  </td>
                  <td className="border-t border-b border-gray-300 p-2 px-5">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="border-t border-b border-gray-300 p-2 px-5">{product.stock}</td>
                  <td className="rounded-r-md border-t border-r border-b border-gray-300 p-2 px-5">
                    <div className="flex justify-center gap-4">
                      <button
                        className="text-amber-500 hover:cursor-pointer"
                        type="button"
                        onClick={() => openEditModal(product)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:cursor-pointer"
                        type="button"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={closeEditModal}
          onSave={handleEditSave}
        />
      )}
    </section>
  )
}
