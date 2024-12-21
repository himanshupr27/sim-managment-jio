package com.simmanagmentplatform.Reposiotry;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simmanagmentplatform.Entity.OrdersEntity;
import com.simmanagmentplatform.Entity.UsersEntity;

public interface orderRepo  extends JpaRepository<OrdersEntity,Long>{

    List<OrdersEntity> findByUsersEntity(UsersEntity usersEntity);
}
