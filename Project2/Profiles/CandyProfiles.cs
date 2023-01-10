
using AutoMapper;
using Project2.Dto;
using Project2.Models;

namespace Project2.Profiles
{
    public class CandyProfiles : Profile
    {
        public CandyProfiles()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<ProductDto, Product>();
            CreateMap<ProductForUpdateDto, Product>();
            CreateMap<Category, CategoryDto>();
        }
    }
}
