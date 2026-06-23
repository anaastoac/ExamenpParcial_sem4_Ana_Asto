package com.uqai.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "leads")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lead {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String empresa;
    
    @Column(nullable = false)
    private String telefono;
    
    @Column(nullable = false, length = 1000)
    private String mensaje;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime fechaRegistro;
    
    // Constructor completo
    public Lead(String nombre, String email, String empresa, String telefono, String mensaje) {
        this.nombre = nombre;
        this.email = email;
        this.empresa = empresa;
        this.telefono = telefono;
        this.mensaje = mensaje;
    }
}