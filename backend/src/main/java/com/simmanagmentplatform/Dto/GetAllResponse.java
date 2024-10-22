package com.simmanagmentplatform.Dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllResponse<T> {
    
    private List<T> content;
    private int totalpages;
    private int pageSize;
    private long totalElements;
    private int pageNumber;
    private boolean lastPage;

}
