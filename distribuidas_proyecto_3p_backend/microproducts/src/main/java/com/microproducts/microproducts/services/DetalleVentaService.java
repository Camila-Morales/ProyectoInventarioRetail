package com.microproducts.microproducts.services;

import com.microproducts.microproducts.entities.DetalleVenta;
import com.microproducts.microproducts.entities.Product;
import com.microproducts.microproducts.repositories.ProductRepository;
import com.microproducts.microproducts.repositories.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.microproducts.microproducts.entities.Venta;


@Service
public class DetalleVentaService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private VentaRepository ventaRepository;

    private final int UMBRAL_STOCK = 5;

    public Venta registrarVenta(Venta venta) {
        for (DetalleVenta detalle : venta.getDetalles()) {
            Product producto = productRepository.findById(detalle.getProducto().getId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            if (producto.getStock() < detalle.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para " + producto.getName());
            }

            producto.setStock(producto.getStock() - detalle.getCantidad());
            detalle.setPrecioUnitario(producto.getPrice());
            detalle.setProducto(producto);
            detalle.setVenta(venta);

            if (producto.getStock() <= UMBRAL_STOCK) {
                // Notificación (log, email, etc.)
                System.out.println("⚠️ Alerta: Stock bajo de " + producto.getName());
            }

            productRepository.save(producto);
        }

        return ventaRepository.save(venta);
    }
}
