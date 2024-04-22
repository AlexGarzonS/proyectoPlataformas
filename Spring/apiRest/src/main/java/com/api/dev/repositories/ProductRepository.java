package com.api.dev.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.dev.models.ProductModel;

@Repository
public interface ProductRepository  extends JpaRepository<ProductModel, Long>{

}
