import { ventasApi } from '../../shared/config/fetcher'

export const registrarVenta = async (venta: any) => {
  const res = await ventasApi.post('/ventas', venta)
  return res.data
}

export const obtenerReporteVentas = async (inicio: string, fin: string) => {
  const res = await ventasApi.get('/ventas/reporte', {
    params: { inicio, fin }
  });
  return res.data;
}

