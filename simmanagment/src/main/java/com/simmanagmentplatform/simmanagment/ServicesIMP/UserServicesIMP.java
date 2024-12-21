package com.simmanagmentplatform.simmanagment.ServicesIMP;

import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// import com.simmanagmentplatform.simmanagment.Dto.OrdersDto;
// import com.simmanagmentplatform.simmanagment.Dto.SimDetailsDto;
import com.simmanagmentplatform.simmanagment.Dto.UserDto;
import com.simmanagmentplatform.simmanagment.Entity.OrdersEntity;
import com.simmanagmentplatform.simmanagment.Entity.SimDetailsEntity;
import com.simmanagmentplatform.simmanagment.Entity.UserEntity;
import com.simmanagmentplatform.simmanagment.Exceptions.ResourseNotFoundException;
import com.simmanagmentplatform.simmanagment.Reposiotry.UserRepo;
import com.simmanagmentplatform.simmanagment.Services.UserServices;

@Service
public class UserServicesIMP implements UserServices {

    @Autowired
    UserRepo userRepo;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public UserDto getUserById(Long id) {

         UserEntity userEntity = this.userRepo.findById(id).orElseThrow(() -> new ResourseNotFoundException("User ", "ID", Long.toString(id)));;
         System.out.println(userEntity);
         UserDto userDto = new UserDto();
         userDto.setId(userEntity.getId());
    userDto.setFullName(userEntity.getFullName());
    userDto.setDob(userEntity.getDob());
    userDto.setGender(userEntity.getGender());
    userDto.setPhoneNumber(userEntity.getPhoneNumber());
    userDto.setEmailId(userEntity.getEmailId());
    userDto.setPan(userEntity.getPan());
    userDto.setAadhar(userEntity.getAadhar());
    userDto.setEncryptedPin(userEntity.getEncryptedPin());
    // System.out.println(userEntity.getSims().size()); // Force initialization
    // System.out.println(userEntity.getOrders().size()); // Force initialization
    
    // Map only required fields from collections
    userDto.setSims(userEntity.getSims().stream()
        .map(sim -> modelMapper.map(sim, SimDetailsEntity.class))
        .collect(Collectors.toSet()));
    userDto.setOrders(userEntity.getOrders().stream()
        .map(order -> modelMapper.map(order, OrdersEntity.class))
        .collect(Collectors.toSet()));
        return userDto;
    }
    
}
