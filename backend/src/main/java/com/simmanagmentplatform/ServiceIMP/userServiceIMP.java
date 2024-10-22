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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.simmanagmentplatform.Dto.GetAllResponse;
import com.simmanagmentplatform.Dto.UsersDTO;
import com.simmanagmentplatform.Entity.UsersEntity;
import com.simmanagmentplatform.Exceptions.ResourseNotFoundException;
import com.simmanagmentplatform.Reposiotry.userRepo;
import com.simmanagmentplatform.Response.ApiResponse;
import com.simmanagmentplatform.Services.userServices;


@Service
public class userServiceIMP implements userServices {

    @Autowired
    private userRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ModelMapper modelMapper;

    // creating new user
    @Override
    public ResponseEntity<ApiResponse> createUsers(UsersDTO users) {

        Optional<UsersEntity> existingUsers = this.userRepo.findByEmailId(users.getEmailId());

        if (existingUsers.isPresent()) {
            ApiResponse apiResponse = new ApiResponse("User Already Exist",false);
            return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.BAD_REQUEST);
        }

        users.setPassword(passwordEncoder.encode(users.getPassword()));
        this.userRepo.save(this.dtoToUser(users));

        ApiResponse apiResponse = new ApiResponse("User Created",true);
        return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.CREATED);
    }

    // getting all users
    @Override
    public GetAllResponse<UsersDTO> getAllUsers(Integer PageNumber,Integer PageSize) {
        Pageable page = PageRequest.of(PageNumber, PageSize);
        Page<UsersEntity> pageOfUsers= this.userRepo.findAll(page);
        List<UsersEntity> usersEntities = pageOfUsers.getContent();
        if (usersEntities.isEmpty()) {
            throw new ResourseNotFoundException("Users", null, null);
        }

        List<UsersDTO> usersDtos = usersEntities.stream().map((users) -> this.userToDto(users))
                .collect(Collectors.toList());

        GetAllResponse<UsersDTO> usersData= new GetAllResponse<>();
        usersData.setContent(usersDtos);
        usersData.setTotalElements(pageOfUsers.getTotalElements());
        usersData.setTotalpages(pageOfUsers.getTotalPages());
        usersData.setPageNumber(pageOfUsers.getNumber());
        usersData.setPageSize(pageOfUsers.getSize());
        usersData.setLastPage(pageOfUsers.isLast());
                
        return usersData;
    }

    //get users by id
    @Override
    public UsersDTO getUserById(long id) {
        UsersEntity usersEntity = this.userRepo.findById(id).orElseThrow(()->(new ResourseNotFoundException("User", "ID", Long.toString(id))));

        UsersDTO usersDTO = this.userToDto(usersEntity);
        return usersDTO;
    }

    // deleting users
    @Override
    public ResponseEntity<?> deleteUser(Long id) {

        UsersEntity usersEntity = this.userRepo.findById(id).orElseThrow(()->new ResourseNotFoundException("User","Id",Long.toString(id)));

         this.userRepo.delete(usersEntity);

         ApiResponse apiResponse = new ApiResponse("User Deleted",true);
         return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.OK);
    }

    // updating the details of the users
    @Override
    public ResponseEntity<?> updateUser(UsersDTO usersDTO, Long id) {
        
        UsersEntity usersEntity = this.userRepo.findById(id).orElseThrow(()->new ResourseNotFoundException("User","Id",Long.toString(id)));

        usersEntity.setUsersName(usersDTO.getUsersName());
        usersEntity.setEmailId(usersDTO.getEmailId());
        usersEntity.setPhoneNumber(usersDTO.getPhoneNumber());
        usersEntity.setPassword(passwordEncoder.encode(usersDTO.getPassword()));

        this.userRepo.save(usersEntity);

        ApiResponse apiResponse = new ApiResponse("User Updated",true);
        return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.OK);
    }

    //--------------------------------------------------------------------------------------------------
    
    //--------------------------------------------------------------------------------------------------

    // user to dto
    private UsersDTO userToDto(UsersEntity usersEntity) {
        UsersDTO usersDTO = this.modelMapper.map(usersEntity,UsersDTO.class);
        return usersDTO;
    }

    // dto to user
    private UsersEntity dtoToUser(UsersDTO usersDTO) {
        UsersEntity usersEntity = this.modelMapper.map(usersDTO, UsersEntity.class);
        return usersEntity;
    }



}
