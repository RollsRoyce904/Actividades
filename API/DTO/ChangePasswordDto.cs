using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class ChangePasswordDto
{
    [Required]
    public string CurrentPassword { get; set; } = "";

    [Required]
    public string NewPassword { get; set; } = "";
}
