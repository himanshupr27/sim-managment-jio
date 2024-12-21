package com.simmanagmentplatform.simmanagment.Dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServicePlanDto {
    private Long service_id;

    private String calls;
    
    private String sms;

    private String data;

    private String price;
    
}
