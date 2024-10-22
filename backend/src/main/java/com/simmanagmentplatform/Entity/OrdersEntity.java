// package com.simmanagmentplatform.Entity;

// import java.util.Date;

// import org.springframework.data.annotation.Id;


// import com.simmanagmentplatform.Dto.UsersDTO;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.Table;
// import jakarta.persistence.Temporal;
// import jakarta.persistence.TemporalType;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// @Entity
// @Table(name = "sim_orders")
// public class OrdersEntity {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @ManyToOne
//     @JoinColumn(name = "user_id", nullable = false)
//     private UsersDTO user;

//     private String simNumber; 
//     private String deliveryAddress;
//     private String orderStatus;

//     @Temporal(TemporalType.DATE)
//     private Date orderDate;

//     @Temporal(TemporalType.DATE)
//     private Date deliveryDate;
// }
