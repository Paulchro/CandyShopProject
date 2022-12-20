
using AutoMapper;
using Project2.Dto;
using Project2.Models;

namespace Project2.Profiles
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<ProductForUpdateDto, Product>();
        }
    }
}
