package com.api.dev.services;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.dev.repositories.ProductRepository;

import com.api.dev.models.ProductModel;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	
	public Collection<ProductModel> findAllProducts()
	{
		Collection<ProductModel> retornoLista;
		
		retornoLista = new ArrayList<ProductModel>();
		
		try {
			retornoLista = productRepository.findAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retornoLista;
	}
	
	public ProductModel addProduct(ProductModel product) 
	{
		return productRepository.save(product);
	}

}
