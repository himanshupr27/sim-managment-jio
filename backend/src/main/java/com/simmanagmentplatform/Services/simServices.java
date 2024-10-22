package com.simmanagmentplatform.Services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.simmanagmentplatform.Dto.SimDetailsDTO;

public interface simServices {
    
    ResponseEntity<?> createSimData(SimDetailsDTO simDetailsDTO);

    SimDetailsDTO updateSimData(SimDetailsDTO simDetailsDTO, Long id);

    SimDetailsDTO assigningSimToUser(Long sim_id, Long user_id);
    
    ResponseEntity<?> deleteSimData(Long id);

    List<SimDetailsDTO> getAllSimsData();

    List<SimDetailsDTO> getAllSimsDataByStatus(String status);
    
    List<SimDetailsDTO> getAllSimsDataByAvailablity(Boolean available);

    SimDetailsDTO getSimsDataById(Long id);

    List<SimDetailsDTO> getSimsDataByUserId(Long id);
}
