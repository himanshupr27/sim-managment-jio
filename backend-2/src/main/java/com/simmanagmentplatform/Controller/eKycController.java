package com.simmanagmentplatform.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.simmanagmentplatform.Dto.EkycDTO;
import com.simmanagmentplatform.Response.ApiResponse;
import com.simmanagmentplatform.Services.eKycServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
// @CrossOrigin("http://localhost:5173")
// @CrossOrigin(origins = "*")
@RequestMapping("/api/kyc_record")
public class eKycController {

    @Autowired
    eKycServices eKycServices;

    @PostMapping("/create/profile/{id}")
    public ResponseEntity<ApiResponse> createRecord(@RequestBody EkycDTO ekycDTO,@PathVariable Long id) {
        
        return this.eKycServices.createEkycRecord(ekycDTO,id);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<ApiResponse> updateRecord(@PathVariable Long id, @RequestBody EkycDTO ekycDTO) {
     
        return this.eKycServices.UpdateEkycRecord(ekycDTO, id);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteRecord(@PathVariable Long id)
    {
        return this.eKycServices.deleteEkycRecord(id);
    }

    @GetMapping("/get_all")
    public List<EkycDTO> getAllRecord() {
        return this.eKycServices.getAllEkycRecord();
    }

    @GetMapping("/get/{id}")
    public EkycDTO getRecordById(@PathVariable Long id) {
        return this.eKycServices.getEkycRecordById(id);
    }

    @GetMapping("/get_by_status")
    public List<EkycDTO> getMethodName(@RequestParam String status) {
        return this.eKycServices.getEkycRecordByStatus(status);
    }
    
}
