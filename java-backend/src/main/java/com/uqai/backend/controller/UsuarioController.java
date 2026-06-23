package com.uqai.backend.controller;

import com.uqai.backend.model.Usuario;
import com.uqai.backend.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {
    
    private final UsuarioService usuarioService;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        return ResponseEntity.ok(usuarioService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id, Authentication authentication) {
        Usuario usuarioActual = usuarioService.findByEmail(authentication.getName());
        
        if (usuarioActual == null) {
            return ResponseEntity.notFound().build();
        }
        
        // Solo el ADMIN o el propio usuario puede ver sus datos
        if (usuarioActual.getRol() == Usuario.Rol.ADMIN || usuarioActual.getId().equals(id)) {
            Usuario usuario = usuarioService.findById(id);
            if (usuario != null) {
                // No devolver la contraseña
                usuario.setPassword(null);
                return ResponseEntity.ok(usuario);
            }
        }
        
        return ResponseEntity.status(403).build();
    }
    
    // Método auxiliar para listar todos (sin seguridad en el método)
    private List<Usuario> findAll() {
        return usuarioService.findAll();
    }
}