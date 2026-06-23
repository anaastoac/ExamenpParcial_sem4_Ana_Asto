package com.uqai.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    private String apellidos;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol;
    
    @Column(nullable = false)
    private String area;
    
    // Constructor sin password para evitar problemas
    public Usuario(String nombre, String apellidos, String email, String password, Rol rol, String area) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
        this.rol = rol;
        this.area = area;
    }
    
    // Metodo para codificar password con BCrypt
    public void setPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        this.password = encoder.encode(password);
    }
    
    // Metodo para verificar password
    public boolean verificarPassword(String rawPassword) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        return encoder.matches(rawPassword, this.password);
    }
    
    public enum Rol {
        ADMIN,
        USER
    }
}