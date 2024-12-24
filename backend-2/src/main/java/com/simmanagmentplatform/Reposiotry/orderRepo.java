package com.simmanagmentplatform.Reposiotry;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simmanagmentplatform.Entity.OrdersEntity;

public interface orderRepo extends JpaRepository<OrdersEntity,Long>{

    List<OrdersEntity> findByOrderStatus(String orderStatus);

    Optional<OrdersEntity> findOneByRazorpayId(String razorpayId);
}
