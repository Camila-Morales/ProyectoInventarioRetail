package com.microproducts.microproducts.services;

import com.microproducts.microproducts.dto.DetalleVentaRequest;
import com.microproducts.microproducts.dto.VentaRequest;
import com.microproducts.microproducts.entities.DetalleVenta;
import com.microproducts.microproducts.entities.Product;
import com.microproducts.microproducts.repositories.ProductRepository;
import com.microproducts.microproducts.repositories.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.microproducts.microproducts.entities.Venta;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class VentaService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private VentaRepository ventaRepository;

    private final int UMBRAL_STOCK = 5;

    public Venta registrarVenta(VentaRequest request) {
        Venta venta = new Venta();
        venta.setCliente(request.getCliente());

        List<DetalleVenta> detalles = new ArrayList<>();

        for (DetalleVentaRequest detalleReq : request.getDetalles()) {
            Product producto = productRepository.findById(detalleReq.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            if (producto.getStock() < detalleReq.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para " + producto.getName());
            }

            producto.setStock(producto.getStock() - detalleReq.getCantidad());
            productRepository.save(producto);

            DetalleVenta detalle = new DetalleVenta();
            detalle.setProducto(producto);
            detalle.setCantidad(detalleReq.getCantidad());
            detalle.setPrecioUnitario(producto.getPrice());
            detalle.setVenta(venta);

            detalles.add(detalle);

            if (producto.getStock() <= UMBRAL_STOCK) {
                System.out.println("⚠️ Alerta: Stock bajo de " + producto.getName());
            }
        }

        venta.setDetalles(detalles);
        return ventaRepository.save(venta);
    }

    public List<Venta> obtenerReporte(LocalDate inicio, LocalDate fin) {
        return ventaRepository.findByFechaVentaBetween(
                inicio.atStartOfDay(),
                fin.atTime(LocalTime.MAX)
        );
    }

    public Venta registrarVentaDesdeDto(VentaRequest ventaRequest) {
        Venta venta = new Venta();
        venta.setCliente(ventaRequest.getCliente());

        List<DetalleVenta> detalles = new ArrayList<>();

        for (DetalleVentaRequest dr : ventaRequest.getDetalles()) {
            Product producto = productRepository.findById(dr.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            if (producto.getStock() < dr.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para " + producto.getName());
            }

            producto.setStock(producto.getStock() - dr.getCantidad());
            productRepository.save(producto);

            DetalleVenta detalle = new DetalleVenta();
            detalle.setProducto(producto);
            detalle.setCantidad(dr.getCantidad());
            detalle.setPrecioUnitario(producto.getPrice());
            detalle.setVenta(venta);

            detalles.add(detalle);

            if (producto.getStock() <= UMBRAL_STOCK) {
                System.out.println("⚠️ Alerta: Stock bajo de " + producto.getName());
            }
        }

        venta.setDetalles(detalles);
        return ventaRepository.save(venta);
    }


}
