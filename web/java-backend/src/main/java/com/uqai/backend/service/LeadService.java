package com.uqai.backend.service;

import com.uqai.backend.model.Lead;
import com.uqai.backend.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LeadService {
    
    private final LeadRepository leadRepository;
    
    public Lead save(Lead lead) {
        return leadRepository.save(lead);
    }
    
    public List<Lead> findAll() {
        return leadRepository.findAll();
    }
    
    public Lead findById(Long id) {
        return leadRepository.findById(id).orElse(null);
    }
}