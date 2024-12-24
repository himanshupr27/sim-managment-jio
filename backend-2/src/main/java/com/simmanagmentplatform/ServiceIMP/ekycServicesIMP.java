package com.simmanagmentplatform.ServiceIMP;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.simmanagmentplatform.Dto.EkycDTO;
import com.simmanagmentplatform.Entity.EkycEntity;
import com.simmanagmentplatform.Entity.ProfileEntity;
import com.simmanagmentplatform.Exceptions.ResourseNotFoundException;
import com.simmanagmentplatform.Reposiotry.eKycRepo;
import com.simmanagmentplatform.Reposiotry.profileRepo;
import com.simmanagmentplatform.Response.ApiResponse;
import com.simmanagmentplatform.Services.eKycServices;

@Service
public class ekycServicesIMP implements eKycServices {

    @Autowired
    private eKycRepo ekycRepo;

    @Autowired
    private profileRepo profileRepo;

    @Override
    public ResponseEntity<ApiResponse> createEkycRecord(EkycDTO ekycDTO,Long profile_id) {
        ekycDTO.setProfile_id(profile_id);
        EkycEntity entity = convertToEntity(ekycDTO);
        ekycRepo.save(entity);
        ApiResponse apiResponse =new ApiResponse("KYC Record CREATED", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ApiResponse> UpdateEkycRecord(EkycDTO ekycDTO, Long id) {

        EkycEntity entity = ekycRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("KYC RECORD", "id", Long.toString(id)));

        Optional.ofNullable(ekycDTO.getPan()).ifPresent(entity::setPan);
        Optional.ofNullable(ekycDTO.getAadhar()).ifPresent(entity::setAadhar);
        Optional.ofNullable(ekycDTO.getPanpic()).ifPresent(pic -> entity.setPanpic(pic.getBytes()));
        Optional.ofNullable(ekycDTO.getProfilepic()).ifPresent(pic -> entity.setProfilepic(pic.getBytes()));
        Optional.ofNullable(ekycDTO.getAddressproofpic()).ifPresent(pic -> entity.setAddressproofpic(pic.getBytes()));
        Optional.ofNullable(ekycDTO.getKycstatus()).ifPresent(entity::setKycstatus);
        Optional.ofNullable(ekycDTO.getProfile_id()).ifPresent(profile_id->{
            ProfileEntity profileEntity =this.profileRepo.findById(profile_id).orElseThrow(()-> new ResourseNotFoundException("PROFILE", "id", Long.toString(profile_id)));
            entity.setProfileEntity(profileEntity);
        });

        ekycRepo.save(entity);

        ApiResponse apiResponse =new ApiResponse("KYC Record UPDATED", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ApiResponse> deleteEkycRecord(Long id) {
        EkycEntity entity = ekycRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("KYC RECORD", "id", Long.toString(id)));

        ekycRepo.delete(entity);

        ApiResponse apiResponse =new ApiResponse("KYC Record DELETED", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }

    @Override
    public EkycDTO getEkycRecordById(Long id) {

        EkycEntity entity = ekycRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("KYC RECORD", "id", Long.toString(id)));

        return convertToDto(entity);
    }

    @Override
    public List<EkycDTO> getEkycRecordByStatus(String status) {
        List<EkycEntity> entities = ekycRepo.findByKycstatus(status);
        if (entities.isEmpty()) {
            throw new ResourseNotFoundException("KYC RECORD", null, null);
        }
        return entities.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<EkycDTO> getAllEkycRecord() {
        List<EkycEntity> entities = this.ekycRepo.findAll();

        if (entities.isEmpty()) {
            throw new ResourseNotFoundException("KYC RECORD", null, null);
        }
        return entities.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    //..............................................................................................

    private EkycDTO convertToDto(EkycEntity entity) {
        Long profileEntityId = entity.getProfileEntity() != null ? entity.getProfileEntity().getId() : null;
        
        return new EkycDTO(
            entity.getId(),
            entity.getPan(),
            entity.getAadhar(),
            new String(entity.getProfilepic()),
            new String(entity.getPanpic()),
            new String(entity.getAddressproofpic()),
            new String(entity.getVideo()),
            entity.getKycstatus(),
            profileEntityId
        );
    }

    private EkycEntity convertToEntity(EkycDTO dto) {
        EkycEntity entity = new EkycEntity();
        entity.setId(dto.getId());
        entity.setPan(dto.getPan());
        entity.setAadhar(dto.getAadhar());
        entity.setProfilepic(dto.getProfilepic().getBytes());
        entity.setPanpic(dto.getPanpic().getBytes());
        entity.setAddressproofpic(dto.getAddressproofpic().getBytes());
        entity.setVideo(dto.getVideo().getBytes());
        entity.setKycstatus(dto.getKycstatus());
        if(dto.getProfile_id()!=null)
        {
            ProfileEntity profileEntity =this.profileRepo.findById(dto.getProfile_id()).orElseThrow(()-> new ResourseNotFoundException("PROFILE", "id", Long.toString(dto.getProfile_id())));
            entity.setProfileEntity(profileEntity);
        }
        return entity;
    }
}
