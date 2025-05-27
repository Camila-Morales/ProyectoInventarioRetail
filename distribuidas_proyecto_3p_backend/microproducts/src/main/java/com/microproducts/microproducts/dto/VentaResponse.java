package com.microproducts.microproducts.dto;

import java.time.LocalDateTime;
import java.util.List;

public class VentaResponse {
    private Long id;
    private String cliente;
    private LocalDateTime fechaVenta;
    private List<DetalleVentaResponse> detalles;

    public VentaResponse(Long id, String cliente, LocalDateTime fechaVenta, List<DetalleVentaResponse> detalles) {
        this.id = id;
        this.cliente = cliente;
        this.fechaVenta = fechaVenta;
        this.detalles = detalles;
    }

    public Long getId() {
        return id;
    }

    public String getCliente() {
        return cliente;
    }

    public LocalDateTime getFechaVenta() {
        return fechaVenta;
    }

    public List<DetalleVentaResponse> getDetalles() {
        return detalles;
    }
}
