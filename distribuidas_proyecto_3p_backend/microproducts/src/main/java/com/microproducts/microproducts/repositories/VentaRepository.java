package com.microproducts.microproducts.repositories;

import com.microproducts.microproducts.entities.Venta;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface VentaRepository extends CrudRepository<Venta,Long> {
    List<Venta> findByFechaVentaBetween(LocalDateTime inicio, LocalDateTime fin);

}
