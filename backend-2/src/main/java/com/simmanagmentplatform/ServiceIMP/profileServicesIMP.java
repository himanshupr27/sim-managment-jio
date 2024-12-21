package com.simmanagmentplatform.ServiceIMP;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.simmanagmentplatform.Dto.ProfileDTO;
import com.simmanagmentplatform.Entity.ProfileEntity;
import com.simmanagmentplatform.Exceptions.ResourseNotFoundException;
import com.simmanagmentplatform.Reposiotry.profileRepo;
import com.simmanagmentplatform.Response.ApiResponse;
import com.simmanagmentplatform.Services.profileServices;

@Service
public class profileServicesIMP implements profileServices {

    @Autowired
    profileRepo profileRepo;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public ResponseEntity<ApiResponse> createProfile(ProfileDTO profileDTO) {

        ProfileEntity profileEntity = this.modelMapper.map(profileDTO, ProfileEntity .class);
        this.profileRepo.save(profileEntity);

        ApiResponse apiResponse =new ApiResponse("Profile CREATED", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }

    @Override
    public List<ProfileDTO> getAllProfile() {

        List<ProfileEntity> profileEntits = this.profileRepo.findAll();

        List<ProfileDTO> profileDTOs=profileEntits.stream().map((plan)->this.modelMapper.map(plan, ProfileDTO.class)).collect(Collectors.toList());

        return profileDTOs;
        
    }

    @Override
    public ProfileDTO getProfileById(Long id) {

        ProfileEntity profileEntity = this.profileRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("Profile", "id", Long.toString(id)));

        return this.modelMapper.map(profileEntity, ProfileDTO.class);
    }

    @Override
    public ResponseEntity<?> deleteProfile(Long id) {
        ProfileEntity profileEntity = this.profileRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("Profile", "id", Long.toString(id)));

        this.profileRepo.delete(profileEntity);

        ApiResponse apiResponse =new ApiResponse("Profile DELETED", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ApiResponse> updateProfile(ProfileDTO profileDTO, Long id) {

        ProfileEntity profileEntity = this.profileRepo.findById(id).orElseThrow(()-> new ResourseNotFoundException("Profile", "id", Long.toString(id)));

        Optional.ofNullable(profileDTO.getFullName()).ifPresent(profileEntity::setFullName);
        Optional.ofNullable(profileDTO.getDob()).ifPresent(profileEntity::setDob);
        Optional.ofNullable(profileDTO.getEncryptedPin()).ifPresent(profileEntity::setEncryptedPin);
        Optional.ofNullable(profileDTO.getGender()).ifPresent(profileEntity::setGender);
        Optional.ofNullable(profileDTO.getPhoneNumber()).ifPresent(profileEntity::setPhoneNumber);
        Optional.ofNullable(profileDTO.getAddress()).ifPresent(profileEntity::setAddress);

        profileRepo.save(profileEntity);

        ApiResponse apiResponse =new ApiResponse("Profile UPDATED", true);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }

    @Override
    public List<ProfileDTO> getPrfileByUserId(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getPrfileByUserId'");
    }
    
}
