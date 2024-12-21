package com.simmanagmentplatform.ServiceIMP;

import java.util.*;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.simmanagmentplatform.Dto.GetAllResponse;
import com.simmanagmentplatform.Dto.OrdersDTO;
import com.simmanagmentplatform.Dto.SimDetailsDTO;
import com.simmanagmentplatform.Dto.UsersDTO;

import com.simmanagmentplatform.Entity.OrdersEntity;
import com.simmanagmentplatform.Entity.SimDetailsEntity;
import com.simmanagmentplatform.Entity.UsersEntity;
import com.simmanagmentplatform.Exceptions.ResourseNotFoundException;
import com.simmanagmentplatform.Reposiotry.orderRepo;
import com.simmanagmentplatform.Reposiotry.simRepo;
import com.simmanagmentplatform.Reposiotry.userRepo;
import com.simmanagmentplatform.Response.ApiResponse;
import com.simmanagmentplatform.Services.userServices;

@Service
public class userServiceIMP implements userServices {

    @Autowired
    private userRepo userRepo;

    // @Autowired
    // private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private simRepo simRepo;

    @Autowired
    private orderRepo orderRepo;

    // Create a new User 
    @Override
    public ResponseEntity<ApiResponse> createUser(UsersDTO usersDTO) {
        Optional<UsersEntity> existingUser = this.userRepo.findByEmailId(usersDTO.getEmailId());

        if (existingUser.isPresent()) {
            ApiResponse apiResponse = new ApiResponse("User  Already Exists", false);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }
        this.userRepo.save(dtoToEntity(usersDTO));

        ApiResponse apiResponse = new ApiResponse("User Created", true);
        return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
    }

    // Get all users with pagination
    @Override
    public GetAllResponse<UsersDTO> getAllUsers(Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<UsersEntity> userPage = this.userRepo.findAll(pageable);

        if (userPage.isEmpty()) {
            throw new ResourseNotFoundException("User ", null, null);
        }

        List<UsersDTO> usersDTOs = userPage.getContent()
            .stream()
            .map(this::entityToDto)
            .collect(Collectors.toList());

        GetAllResponse<UsersDTO> response = new GetAllResponse<>();
        response.setContent(usersDTOs);
        response.setTotalElements(userPage.getTotalElements());
        response.setTotalpages(userPage.getTotalPages());
        response.setPageNumber(userPage.getNumber());
        response.setPageSize(userPage.getSize());
        response.setLastPage(userPage.isLast());

        return response;
    }

    // Get a single user by ID
    @Override
    public UsersDTO getUserById(Long id) {
        UsersEntity userEntity = this.userRepo.findById(id)
            .orElseThrow(() -> new ResourseNotFoundException("User ", "ID", Long.toString(id)));

            Set<SimDetailsEntity> simSet = new HashSet<>(this.simRepo.findByUsersEntity(userEntity));

            Set<OrdersEntity> ordersSet= new HashSet<>(this.orderRepo.findByUsersEntity(userEntity));

            userEntity.setSims(simSet);
            userEntity.setOrders(ordersSet);
        
        return entityToDto(userEntity);
    }

    // Delete a user by ID
    @Override
    public ResponseEntity<ApiResponse> deleteUser(Long id) {
        UsersEntity userEntity = this.userRepo.findById(id)
            .orElseThrow(() -> new ResourseNotFoundException("User ", "ID", Long.toString(id)));

        this.userRepo.delete(userEntity);

        ApiResponse apiResponse = new ApiResponse("User  Deleted Successfully", true);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    // Update a user's details
    @Override
    public ResponseEntity<ApiResponse> updateUser(UsersDTO usersDTO, Long id) {
        UsersEntity userEntity = this.userRepo.findById(id)
            .orElseThrow(() -> new ResourseNotFoundException("User ", "ID", Long.toString(id)));

        // Update user fields
        userEntity.setFullName(usersDTO.getFullName());
        userEntity.setEmailId(usersDTO.getEmailId());

        this.userRepo.save(userEntity);

        ApiResponse apiResponse = new ApiResponse("User  Updated Successfully", true);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    // --------------------------------------------------------------------------------------------------
    // Helper Methods

    // Convert from Entity to DTO, including byte[] to Base64 string
    private UsersDTO entityToDto(UsersEntity userEntity) {
        UsersDTO usersDTO = modelMapper.map(userEntity, UsersDTO.class);

        // Map binary data to Base64 strings
        // usersDTO.setProfilePicture(byteArrayToBase64(userEntity.getProfilePicture()));
        // usersDTO.setPanCardPicture(byteArrayToBase64(userEntity.getPanCardPicture()));
        // usersDTO.setAddressProofPicture(byteArrayToBase64(userEntity.getAddressProofPicture()));
        // usersDTO.setVideo(byteArrayToBase64(userEntity.getVideo()));
        // usersDTO.setOrders(
        //     userEntity.getOrders()
        //         .stream()
        //         .map(OrdersEntity::getId) // Return IDs as Long
        //         .collect(Collectors.toSet())
        // );
    
        usersDTO.setSims(userEntity.getSims()
        .stream()
        .map(sim -> modelMapper.map(sim, SimDetailsDTO.class))
        .collect(Collectors.toSet()));
        
        usersDTO.setOrders(userEntity.getOrders()
        .stream()
        .map(orders -> modelMapper.map(orders, OrdersDTO.class))
        .collect(Collectors.toSet()));

        return usersDTO;
    }

    // Convert from DTO to Entity, including Base64 string to byte[]
    private UsersEntity dtoToEntity(UsersDTO usersDTO) {
        UsersEntity usersEntity = modelMapper.map(usersDTO, UsersEntity.class);

        // Map Base64 strings to binary data
        // usersEntity.setProfilePicture(base64ToByteArray(usersDTO.getProfilePicture()));
        // usersEntity.setPanCardPicture(base64ToByteArray(usersDTO.getPanCardPicture()));
        // usersEntity.setAddressProofPicture(base64ToByteArray(usersDTO.getAddressProofPicture()));
        // usersEntity.setVideo(base64ToByteArray(usersDTO.getVideo()));
     

        return usersEntity;
    }

    // Convert byte[] to Base64 String
    // private String byteArrayToBase64(byte[] byteArray) {
    //     return byteArray != null ? Base64.getEncoder().encodeToString(byteArray) : null;
    // }

    // // Convert Base64 String to byte[]
    // private byte[] base64ToByteArray(String base64String) {
    //     return base64String != null ? Base64.getDecoder().decode(base64String) : null;
    // }
}
