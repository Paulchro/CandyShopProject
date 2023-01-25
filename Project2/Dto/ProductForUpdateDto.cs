using System.ComponentModel.DataAnnotations;

namespace Project2.Dto
{
    public class ProductForUpdateDto
    {
        [Required(ErrorMessage = " You should provide a name value")]
        public string Name { get; set; }
        [Required(ErrorMessage = " You should provide a price value")]
        public decimal Price { get; set; }
        [Required(ErrorMessage = " You should provide a quantity value")]
        public int Quantity { get; set; }
        [Required(ErrorMessage = " You should provide a category value")]
        public int CategoryId { get; set; }
        [Required(ErrorMessage = " You should provide an image value")]
        public string? Image { get; set; }
    }
}
