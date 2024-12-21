package com.simmanagmentplatform.simmanagment.Controllers;

import org.springframework.web.bind.annotation.*;
import com.simmanagmentplatform.simmanagment.Dto.UserDto;
import com.simmanagmentplatform.simmanagment.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserServices userservices;
    @GetMapping("/{id}")
    public UserDto  getUserById(@PathVariable long id) {
        
        return this.userservices.getUserById(id);
    }
    
}
