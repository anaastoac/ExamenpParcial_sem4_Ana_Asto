package com.uqai.backend.controller;

import com.uqai.backend.dto.AuthResponse;
import com.uqai.backend.dto.LoginRequest;
import com.uqai.backend.dto.RegisterRequest;
import com.uqai.backend.model.Usuario;
import com.uqai.backend.security.JwtService;
import com.uqai.backend.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final UsuarioService usuarioService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        if (usuarioService.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new AuthResponse(null, null, null, null, "El email ya está registrado"));
        }
        
        Usuario.Rol rol;
        try {
            rol = Usuario.Rol.valueOf(request.getRol().toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(new AuthResponse(null, null, null, null, "Rol inválido. Use ADMIN o USER"));
        }
        
        Usuario usuario = new Usuario(
                request.getNombre(),
                request.getApellidos(),
                request.getEmail(),
                request.getPassword(),
                rol,
                request.getArea()
        );
        usuario.setPassword(request.getPassword());
        
        Usuario savedUsuario = usuarioService.save(usuario);
        String token = jwtService.generateToken(savedUsuario.getEmail(), savedUsuario.getRol().name(), savedUsuario.getId());
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new AuthResponse(token, savedUsuario.getEmail(), savedUsuario.getRol().name(), savedUsuario.getNombre()));
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        Usuario usuario = usuarioService.findByEmail(request.getEmail());
        
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(null, null, null, null, "Credenciales inválidas"));
        }
        
        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(null, null, null, null, "Credenciales inválidas"));
        }
        
        String token = jwtService.generateToken(usuario.getEmail(), usuario.getRol().name(), usuario.getId());
        
        return ResponseEntity.ok(new AuthResponse(token, usuario.getEmail(), usuario.getRol().name(), usuario.getNombre()));
    }
}