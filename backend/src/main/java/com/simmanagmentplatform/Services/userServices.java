package com.simmanagmentplatform.Services;

import org.springframework.http.ResponseEntity;


import com.simmanagmentplatform.Dto.GetAllResponse;
import com.simmanagmentplatform.Dto.UsersDTO;





public interface userServices {

    
    public ResponseEntity<?> createUsers(UsersDTO users);
   
    public GetAllResponse<UsersDTO> getAllUsers( Integer PageNumber,Integer PageSize);

    public UsersDTO getUserById(long id);

    
    public ResponseEntity<?> deleteUser(Long id);
    
    public ResponseEntity<?> updateUser(UsersDTO usersDTO,Long id);
    
}
