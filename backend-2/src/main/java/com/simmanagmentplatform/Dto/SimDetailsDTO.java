package com.simmanagmentplatform.Dto;

import java.util.Date;
import com.simmanagmentplatform.Entity.ServicePlanEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor

public class SimDetailsDTO {

    private Long sim_id;

    private String simNumber; 

    private String CIID;
    
    private String IMSI;
    
    private String profileName;
    
    private String status; 

    private Boolean available;
    
    private Date issueDate;

    private ServicePlanEntity servicePlanEntity;

    private Long profile_id;


}
