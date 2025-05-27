import { useEffect, useState } from 'react'
import { obtenerReporteVentas } from '../../store/services/venta.service'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { getProducts } from '../../store/services/product.service' // Asegúrate de tener este método

interface Product {
  id: number
  name: string
  stock: number
}



interface DetalleVenta {
  cantidad: number
  precioUnitario: number
  producto: {
    name: string
  }
}

interface Venta {
  id: number
  cliente: string
  fechaVenta: string
  detalles: DetalleVenta[]
}

export function ReporteVentas() {
  const [ventas, setVentas] = useState<Venta[]>([])
  const [inicio, setInicio] = useState('')
  const [fin, setFin] = useState('')

  const fetchData = async () => {
  if (!inicio || !fin) return
  const ventasData = await obtenerReporteVentas(inicio, fin)
  setVentas(ventasData)

  const productos = await getProducts()
  const productosBajos = productos!.filter((p: Product) => p.stock <= 5)

  if (productosBajos.length > 0) {
    const nombres = productosBajos.map(p => `⚠️ ${p.name} (stock: ${p.stock})`).join('\n')
    alert(`Stock bajo detectado:\n${nombres}\nNotificar al administrador.`)
  }
}


  const generarPDF = () => {
    const doc = new jsPDF()
    doc.text('Reporte de Ventas', 14, 20)

    ventas.forEach((venta, i) => {
      autoTable(doc, {
        startY: 30 + i * 60,
        head: [['Producto', 'Cantidad', 'Precio Unitario']],
        body: venta.detalles.map((d) => [d.producto.name, d.cantidad, `$${d.precioUnitario}`]),
        didDrawPage: () => {
          doc.text(`ID Venta: ${venta.id}`, 14, 25 + i * 60)
          doc.text(`Cliente: ${venta.cliente}`, 80, 25 + i * 60)
          doc.text(`Fecha: ${new Date(venta.fechaVenta).toLocaleString()}`, 14, 29 + i * 60)
        },
      })
    })

    doc.save('reporte_ventas.pdf')
  }

  useEffect(() => {
    if (inicio && fin) fetchData()
  }, [inicio, fin])

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Reporte de Ventas</h2>

      <div className="flex gap-4 mb-6">
        <input type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} className="p-2 border rounded" />
        <input type="date" value={fin} onChange={(e) => setFin(e.target.value)} className="p-2 border rounded" />
        <button onClick={fetchData} className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-500">
          Buscar
        </button>
         <button onClick={generarPDF} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
          Generar PDF
        </button>
      </div>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-orange-100">
            <th>ID</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Productos</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((v) => (
            <tr key={v.id} className="border-t">
              <td className="p-2">{v.id}</td>
              <td>{v.cliente}</td>
              <td>{new Date(v.fechaVenta).toLocaleString()}</td>
              <td>
                <ul className="list-disc pl-4">
                  {v.detalles.map((d, idx) => (
                    <li key={idx}>
                      {d.producto.name} x{d.cantidad} - ${d.precioUnitario}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
