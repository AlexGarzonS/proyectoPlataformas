package com.api.dev.controllers;

import java.io.IOException;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.api.dev.models.ProductModel;
import com.api.dev.services.ProductService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
		
    @Autowired
    private ProductService productService;
    
    @GetMapping("/products")
    public Collection<ProductModel> allProducts() {
    	
        return productService.findAllProducts();
        
    }
    
    @PostMapping(value = "/addProduct", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ProductModel addProduct(@RequestBody ProductModel product) throws IOException {
    	
    	 return productService.addProduct(product);
    }
}
