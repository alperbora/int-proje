//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace uyg04.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Kayit
    {
        public string kayitId { get; set; }
        public string kayitOyunId { get; set; }
        public string kayitUyeId { get; set; }
    
        public virtual Oyun Oyun { get; set; }
        public virtual Uyeler Uyeler { get; set; }
    }
}