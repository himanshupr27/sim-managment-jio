package com.simmanagmentplatform.simmanagment.Dto;

import java.sql.Date;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimDetailsDto {
    
    private Long sim_id;

    private String simNumber; 

    private String CIID;
    
    private String IMSI;
    
    private String profileName;
    
    private String status; 

    private Boolean available;
    
    private Date issueDate;
}
