package com.simmanagmentplatform.simmanagment.Dto;

import java.sql.Date;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdersDto {
     private Long id;

    private String deliveryAddress;
    
    private String orderStatus;

    private Date orderDate;

    private Date deliveryDate;
}
