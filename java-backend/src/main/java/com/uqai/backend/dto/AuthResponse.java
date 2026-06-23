package com.uqai.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private String rol;
    private String nombre;
    private String mensaje;
    
    public AuthResponse(String token, String email, String rol, String nombre) {
        this.token = token;
        this.email = email;
        this.rol = rol;
        this.nombre = nombre;
        this.mensaje = "Autenticación exitosa";
    }
}