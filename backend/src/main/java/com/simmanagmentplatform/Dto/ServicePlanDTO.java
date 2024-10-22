package com.simmanagmentplatform.Dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ServicePlanDTO {

    private Long service_id;

    private String calls;
    
    private String sms;

    private String data;

    private String price;
    
}
