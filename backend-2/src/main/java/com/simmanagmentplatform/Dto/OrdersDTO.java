package com.simmanagmentplatform.Dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdersDTO {
    private Long id;
    private String deliveryAddress;
    private String orderStatus;
    private Date orderDate;
    private Date deliveryDate;
}
