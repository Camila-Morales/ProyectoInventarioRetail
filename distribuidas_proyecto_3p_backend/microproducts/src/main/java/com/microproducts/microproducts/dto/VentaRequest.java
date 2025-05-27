package com.microproducts.microproducts.dto;

import java.util.List;

public class VentaRequest {
    private String cliente;
    private List<DetalleVentaRequest> detalles;

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public List<DetalleVentaRequest> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleVentaRequest> detalles) {
        this.detalles = detalles;
    }
}
