package com.microproducts.microproducts.dto;
public class DetalleVentaResponse {
    private ProductoDTO producto;
    private int cantidad;
    private double precioUnitario;

    public DetalleVentaResponse(ProductoDTO producto, int cantidad, double precioUnitario) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    public ProductoDTO getProducto() {
        return producto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public double getPrecioUnitario() {
        return precioUnitario;
    }

    public static class ProductoDTO {
        private String name;

        public ProductoDTO(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }
}

