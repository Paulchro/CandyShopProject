
using AutoMapper;

namespace Project2.Profiles
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<Models.Product, Dto.ProductDto>();
        }
    }
}
