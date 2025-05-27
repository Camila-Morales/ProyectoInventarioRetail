package com.microproducts.microproducts.controllers;

import com.microproducts.microproducts.dto.DetalleVentaResponse;
import com.microproducts.microproducts.dto.VentaRequest;
import com.microproducts.microproducts.dto.VentaResponse;
import com.microproducts.microproducts.entities.Venta;
import com.microproducts.microproducts.repositories.VentaRepository;
import com.microproducts.microproducts.services.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin("*")
public class VentaController {

    @Autowired
    private VentaService ventaService;

    @PostMapping
    public ResponseEntity<Venta> registrarVenta(@RequestBody VentaRequest ventaRequest) {
        Venta venta = ventaService.registrarVentaDesdeDto(ventaRequest);
        return ResponseEntity.ok(venta);
    }



    @GetMapping("/reporte")
    public List<VentaResponse> obtenerReporte(
            @RequestParam String inicio,
            @RequestParam String fin
    ) {
        LocalDate fechaInicio = LocalDate.parse(inicio);
        LocalDate fechaFin = LocalDate.parse(fin);

        List<Venta> ventas = ventaService.obtenerReporte(fechaInicio, fechaFin);

        return ventas.stream().map(venta -> {
            List<DetalleVentaResponse> detalles = venta.getDetalles().stream().map(detalle ->
                    new DetalleVentaResponse(
                            new DetalleVentaResponse.ProductoDTO(detalle.getProducto().getName()),
                            detalle.getCantidad(),
                            detalle.getPrecioUnitario()
                    )

            ).toList();

            return new VentaResponse(
                    venta.getId(),
                    venta.getCliente(),
                    venta.getFechaVenta(),
                    detalles
            );
        }).toList();
    }


}

