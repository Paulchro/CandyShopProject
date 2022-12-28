
using AutoMapper;
using Project2.Dto;
using Project2.Models;

namespace Project2.Profiles
{
    public class CandyProfiles : Profile
    {
        public CandyProfiles()
        {
            CreateMap<Product, ProductDto>().ForMember(x => x.Category, d => d.MapFrom(s => s.Category.Name));
            CreateMap<ProductForUpdateDto, Product>();
            CreateMap<Category, CategoryDto>();
        }
    }
}
