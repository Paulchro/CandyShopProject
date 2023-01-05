﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text.Json;
using System.Threading.Tasks;
using AutoMapper;
using CandyShop2.DAL;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.MSIdentity.Shared;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Project2.Dto;
using Project2.Interfaces;
using Project2.Models;
using Project2.Services;

namespace Project2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
      
        private readonly IProductRepository _productRepository;
    
        private readonly IMapper _mapper;
   
        public ProductsController( IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository ??
                throw new ArgumentNullException(nameof(productRepository));
            _mapper = mapper ??
                throw new ArgumentNullException(nameof(mapper));
        }
        // GET: api/Products
        [HttpGet(Name = "GetProducts")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await _productRepository.GetAllProductsAsync();
            return Ok(_mapper.Map<IEnumerable<ProductDto>>(products));
        }
     
        // GET: api/Products/5
        [HttpGet("{id}", Name ="GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _productRepository.GetProductById(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }
        [HttpPost]
        public async Task<ActionResult<ProductDto>> PostProduct(ProductDto productDto)
        {
            Product product = new Product
            {
                Id = productDto.Id,
                Name = productDto.Name,
                Price = productDto.Price,
                Quantity = productDto.Quantity,
                CategoryId = productDto.CategoryId,
                Image = productDto.Image

            };
            await _productRepository.AddProduct("JSON/Products.json", _mapper.Map<Product>(product));
            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }
       
        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{productid}")]
        //public async Task<IActionResult> PutProduct(int productid, ProductForUpdateDto productDto)
        //{
         
        //    var productToUpdate = await _productRepository.GetProductById(productid);
        //    if(productToUpdate == null)
        //    {
        //        return NotFound();
        //    }
        //    _mapper.Map(productDto, productToUpdate);

        //    await _productRepository.Update(productToUpdate);
        //    try
        //    {
        //        await _productRepository.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        return BadRequest();
        //    }

        //    return NoContent();
        //}

        //// POST: api/Products
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<ProductDto>> PostProduct(ProductDto productDto)
        //{
        //    Category category = await _categoryRepository.GetCategoryById(productDto.CategoryId);
        //    Product product = new Product
        //{
        //        Name = productDto.Name,
        //        Price = productDto.Price,
        //        Quantity = productDto.Quantity,
        //        Category = category
        //    };
        //    await _productRepository.Add(_mapper.Map<Product>(product));
        //    try
        //    {
        //        await _productRepository.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ProductExists(product.Id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }
        //    return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        //}

        //// DELETE: api/Products/5
        //[HttpDelete("{productid}")]
        //public async Task<IActionResult> DeleteProduct(int productid)
        //{
        //    if (!await _productRepository.ProductExist(productid))
        //    {
        //        return NotFound();
        //    }
        //    var productToDelete = await _productRepository.GetProductById(productid);
        //    if (productToDelete == null)
        //    {
        //        return NotFound();
        //    }
        //    _productRepository.DeleteProduct(productToDelete);
        //    await _productRepository.SaveChangesAsync();

        //    return NoContent();
        //}

    }
}
