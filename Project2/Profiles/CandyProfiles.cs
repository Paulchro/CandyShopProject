
using AutoMapper;
using Project2.Dto;
using Project2.Models;

namespace Project2.Profiles
{
    public class CandyProfiles : Profile
    {
        public CandyProfiles()
        {
            CreateMap<Product, ProductDto>().ForMember(x => x.CategoryId, d => d.MapFrom(s => s.Category.Id));
            CreateMap<Category, CategoryDto>();
        }
    }
}
