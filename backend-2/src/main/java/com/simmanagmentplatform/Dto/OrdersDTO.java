package com.simmanagmentplatform.Dto;

import java.util.Date;

import com.simmanagmentplatform.Entity.Address;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdersDTO {
    private Long id;
    private Address deliveryAddress;
    private String orderStatus;
    private Date orderDate;
    private Date deliveryDate;
    private String razorpayId;
    private int amount;
    private Long profile_id;
}
