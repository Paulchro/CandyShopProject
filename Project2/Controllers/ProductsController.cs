using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Project2.Dto;
using Project2.Interfaces;
using Project2.Models;
using System.Text.Json;

namespace Project2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        const int maxProductPages = 20;
        public ProductsController( IProductRepository productRepository, ICategoryRepository categoryRepository, IMapper mapper)
        {
            _productRepository = productRepository ??
                throw new ArgumentNullException(nameof(productRepository));
            _categoryRepository = categoryRepository ??
               throw new ArgumentNullException(nameof(categoryRepository));
            _mapper = mapper ??
                throw new ArgumentNullException(nameof(mapper));
        }
        // GET: api/Products
        [HttpGet(Name = "GetProducts")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts([FromQuery(Name = "orderby")] string[] orderby, string? name, int pageNumber, int pageSize)
        {
            if (pageSize > maxProductPages)
            {
                pageSize = maxProductPages;
            }
            var (products, paginationMetadata) = await _productRepository.GetAllProductsAsync(orderby,name,pageNumber, pageSize);
            Response.Headers.Add("X-Pagination",
                 JsonSerializer.Serialize(paginationMetadata));
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
            if (await _productRepository.ProductExist(productDto.Id))
            {
                return BadRequest();
            }
            await _productRepository.AddProduct(_mapper.Map<Product>(_mapper.Map<Product>(productDto)));
            return CreatedAtAction("GetProduct", new { id = productDto.Id }, productDto);
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{productid}")]
        public async Task<IActionResult> PutProduct(int productid, ProductForUpdateDto productDto)
        {
            await _productRepository.UpdateProduct( productid, _mapper.Map<Product>(productDto));
            return NoContent();
        }

        //[HttpPatch("{productid}")]
        //public async Task<ActionResult> PartiallyUpdateProduct(
        //    int productid, 
        //    JsonPatchDocument<ProductForUpdateDto> patchDocument)
        //{
        //    if (!await _productRepository.ProductExist(productid))
        //    {
        //        return NotFound();
        //    }
        //    var product = await _productRepository.GetProductById(productid);
        //    if (product == null)
        //    {
        //        return NotFound();
        //    }
        //    var productToPatch = _mapper.Map<ProductForUpdateDto>(
        //        product);
        //    patchDocument.ApplyTo(productToPatch, ModelState);
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (!TryValidateModel(productToPatch))
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    _mapper.Map(productToPatch, product);
        //    await _productRepository.UpdateProduct();

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
