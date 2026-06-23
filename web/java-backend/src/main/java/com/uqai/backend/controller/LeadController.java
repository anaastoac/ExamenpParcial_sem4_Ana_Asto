package com.uqai.backend.controller;

import com.uqai.backend.model.Lead;
import com.uqai.backend.model.Usuario;
import com.uqai.backend.service.LeadService;
import com.uqai.backend.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
public class LeadController {
    
    private final LeadService leadService;
    private final UsuarioService usuarioService;
    
    @PostMapping
    public ResponseEntity<Lead> createLead(@RequestBody Lead lead) {
        Lead savedLead = leadService.save(lead);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLead);
    }
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Lead>> getAllLeads() {
        return ResponseEntity.ok(leadService.findAll());
    }
}