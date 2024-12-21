package com.simmanagmentplatform.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.simmanagmentplatform.Dto.ProfileDTO;
import com.simmanagmentplatform.Services.profileServices;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user/profile")
public class profileController {

    @Autowired
    profileServices profileServices;

     @GetMapping("/get/{id}")
    public ProfileDTO getAllServicePlanById(@PathVariable Long id) {
        
        return this.profileServices.getProfileById(id);
    }
    
    @GetMapping("/get/all")
    public List<ProfileDTO> getMethodName() {
        return this.profileServices.getAllProfile();
    }
    
    @PostMapping("/create")
    public ResponseEntity<?> postMethodName(@RequestBody ProfileDTO profileDTO) {
        
        return this.profileServices.createProfile(profileDTO);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> putMethodName(@PathVariable Long id, @RequestBody ProfileDTO profileDTO) {

        return this.profileServices.updateProfile(profileDTO, id);
    }
    
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id)
    {
        return this.profileServices.deleteProfile(id);
    }
}
