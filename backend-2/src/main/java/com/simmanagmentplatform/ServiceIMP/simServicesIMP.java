package com.simmanagmentplatform.ServiceIMP;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.simmanagmentplatform.Dto.SimDetailsDTO;
import com.simmanagmentplatform.Entity.SimDetailsEntity;
import com.simmanagmentplatform.Entity.UsersEntity;
import com.simmanagmentplatform.Exceptions.ResourseNotFoundException;
import com.simmanagmentplatform.Reposiotry.servicePlaneRepo;
import com.simmanagmentplatform.Reposiotry.simRepo;
import com.simmanagmentplatform.Reposiotry.userRepo;
import com.simmanagmentplatform.Response.ApiResponse;
import com.simmanagmentplatform.Services.simServices;

@Service
public class simServicesIMP implements simServices {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private simRepo simRepo;

    @Autowired
    private userRepo userRepo;

    @Autowired
    servicePlaneRepo servicePlaneRepo;



    
    @Override
    public ResponseEntity<?> createSimData(SimDetailsDTO simDetailsDTO) {
        SimDetailsEntity simDetailsEntity = this.modelMapper.map(simDetailsDTO, SimDetailsEntity.class);
        simDetailsEntity.setAddDate(new Date());
        simDetailsEntity.setAvailable(true);
        simRepo.save(simDetailsEntity);
        ApiResponse apiResponse = new ApiResponse("SIM CREATED", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);

    }




    @Override
    public SimDetailsDTO updateSimData(SimDetailsDTO simDetailsDTO, Long id) {

        SimDetailsEntity simDetailsEntity = this.simRepo.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("SIM", "Id", Long.toString(id)));

        if (simDetailsDTO.getCIID() != null)
            simDetailsEntity.setCIID(simDetailsDTO.getCIID());

        if (simDetailsDTO.getIMSI() != null)
            simDetailsEntity.setIMSI(simDetailsDTO.getIMSI());

        if (simDetailsDTO.getSimNumber() != null)
            simDetailsEntity.setSimNumber(simDetailsDTO.getSimNumber());

        if (simDetailsDTO.getServicePlanEntity() != null)
            simDetailsEntity.setServicePlanEntity(simDetailsDTO.getServicePlanEntity());

        if (simDetailsDTO.getStatus() != null)
            simDetailsEntity.setStatus(simDetailsDTO.getStatus());

        if(simDetailsDTO.getProfileName()!=null)
        simDetailsEntity.setProfileName(simDetailsDTO.getProfileName());

        if(simDetailsDTO.getAvailable()!=null)
        simDetailsEntity.setAvailable(simDetailsDTO.getAvailable());


        if (simDetailsDTO.getUser_id() != null) {

            UsersEntity usersEntity = this.userRepo.findById(simDetailsDTO.getUser_id()).orElseThrow(
                    () -> new ResourseNotFoundException("User", "Id", Long.toString(simDetailsDTO.getUser_id())));

            simDetailsEntity.setUsersEntity(usersEntity);
        }

        this.simRepo.save(simDetailsEntity);

        return this.entityToDto(simDetailsEntity);
    }




    @Override
    public SimDetailsDTO assigningSimToUser(Long sim_id, Long user_id) {

        SimDetailsEntity simDetailsEntity = this.simRepo.findById(sim_id)
                .orElseThrow(() -> new ResourseNotFoundException("SIM", "Id", Long.toString(sim_id)));
        UsersEntity usersEntity = this.userRepo.findById(user_id)
                .orElseThrow(() -> new ResourseNotFoundException("User", "Id", Long.toString(user_id)));

        simDetailsEntity.setStatus("active");
        simDetailsEntity.setProfileName(null);
        simDetailsEntity.setAvailable(false);
        simDetailsEntity.setIssueDate(new Date());
        simDetailsEntity.setUsersEntity(usersEntity);

        this.simRepo.save(simDetailsEntity);

        return this.entityToDto(simDetailsEntity);
    }



    @Override
    public ResponseEntity<?> deleteSimData(Long id) {

        SimDetailsEntity simDetailsEntity = this.simRepo.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("SIM", "Id", Long.toString(id)));

        this.simRepo.delete(simDetailsEntity);

        ApiResponse apiResponse = new ApiResponse("SIM Deleted", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }




    @Override
    public List<SimDetailsDTO> getAllSimsData() {

        List<SimDetailsEntity> simDetailsEntities = this.simRepo.findAll();
        if (simDetailsEntities.isEmpty()) {
            throw new ResourseNotFoundException("SIM's", null, null);
        }
        List<SimDetailsDTO> simDetailsDTOs = simDetailsEntities.stream().map((sim) -> this.entityToDto(sim))
                .collect(Collectors.toList());

        return simDetailsDTOs;
    }




    @Override
    public List<SimDetailsDTO> getAllSimsDataByStatus(String status) {

        List<SimDetailsEntity> simDetailsEntities = this.simRepo.findByStatus(status);
        if (simDetailsEntities.isEmpty()) {
            throw new ResourseNotFoundException("SIM's", "status", status);
        }
        List<SimDetailsDTO> simDetailsDTOs = simDetailsEntities.stream().map((sim) -> this.entityToDto(sim))
                .collect(Collectors.toList());

        return simDetailsDTOs;
    }



    @Override
    public List<SimDetailsDTO> getAllSimsDataByAvailablity(Boolean available) {

        List<SimDetailsEntity> simDetailsEntities = this.simRepo.findByAvailable(available);
        if (simDetailsEntities.isEmpty()) {
            throw new ResourseNotFoundException("SIM's", null, null);
        }
        List<SimDetailsDTO> simDetailsDTOs = simDetailsEntities.stream().map((sim) -> this.entityToDto(sim))
                .collect(Collectors.toList());

        return simDetailsDTOs;
    }
   


    @Override
    public SimDetailsDTO getSimsDataById(Long id) {

        SimDetailsEntity simDetailsEntity = this.simRepo.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("SIM", "Id", Long.toString(id)));

        return this.entityToDto(simDetailsEntity);
    }




    @Override
    public List<SimDetailsDTO> getSimsDataByUserId(Long id) {

        UsersEntity usersEntity = this.userRepo.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("User", "Id", Long.toString(id)));

        List<SimDetailsEntity> simDetailsEntities = this.simRepo.findByUsersEntity(usersEntity);

        if (simDetailsEntities.isEmpty()) {
            throw new ResourseNotFoundException("SIM's", "user Id", Long.toString(usersEntity.getId()));
        }
        List<SimDetailsDTO> simDetailsDTOs = simDetailsEntities.stream().map((sim) -> this.entityToDto(sim))
                .collect(Collectors.toList());

        return simDetailsDTOs;
    }




    // ................................................................................................

    private SimDetailsDTO entityToDto(SimDetailsEntity simDetailsEntity) {
        SimDetailsDTO simDetailsDTO = this.modelMapper.map(simDetailsEntity, SimDetailsDTO.class);
        if (simDetailsEntity.getUsersEntity() != null)
            simDetailsDTO.setUser_id(simDetailsEntity.getUsersEntity().getId());
        return simDetailsDTO;
    }





}
