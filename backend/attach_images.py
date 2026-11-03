import re, shutil
from pathlib import Path
from django.conf import settings
from products.models import Product

SRC = Path(settings.BASE_DIR).parent / "frontend" / "public" / "images"
DST = Path(settings.MEDIA_ROOT) / "products"
DST.mkdir(parents=True, exist_ok=True)

N = lambda s: re.sub(r"[^a-z0-9]", "", s.lower())

DATA = {
  "Mens": ("men", [
    "Comfy Steps White Strap Sandal", "Hush Puppies Tan Boat Shoe", "XL Wear Men’s Lace-Up Trainer",
    "Doubal Strap Sandals", "Osaga Blue Lace-Up Trainer", "Urban Territory Brown Boots",
    "Men’s Black Leather Loafers", "Urban Territory Black Boots", "Mateo Brown Casual Sneakers",
    "Lamore Tan Leather Loafers", "Leather Rhythmic Sandals", "Herfa Hand-Painted Leather Sandals"]),
  "Kids": ("kids", [
    "Whitney Girls White Multi Marble EVA Clog", "Walkright Claudia Girls Blue Fasten Canvas",
    "Walkright Girls Pink Polka Dot Canvas", "Walkright Girls Multi-T Bar Sandal",
    "The Slipper Company Cherish Girls Pink Bootie", "LOL Surprise Kids Fasten Slipper",
    "Bluey Kids Blue Easy Fasten Slipper", "Spider-Man Kids Red Light Up Trainer",
    "Disney Stitch Pink Round Kids EVA Clog", "Disney Frozen Purple Strap Sandal",
    "Shoeszone Short Kids Black Welly Size 1 to 6", "Shoeszone Kids Unicorn Welly"]),
  "Womens": ("women", [
    "Lamar Tan Women’s Lace Sandal", "Lilley White Diamante Slip-On Shoe", "Softlines Navy Sandal",
    "Shoezone Floral Beach Mule", "Ophelia Women’s Silver Heel", "Lilley Women’s Patent Shoe",
    "Noelle Mesh Bow Ballerinas", "Stella Flat Embellished Slides", "Olivia Pencil Heels",
    "Amelia Kitten Heels", "Beckett Sandals", "Glamo Flat Black Sandals"]),
}

for cat, (prefix, names) in DATA.items():
    for i, name in enumerate(names, start=1):
        p = Product.objects.filter(category=cat).exclude(name="")
        p = [x for x in p if N(x.name) == N(name)]
        if not p:
            print("NO PRODUCT:", cat, name); continue
        f = next((SRC / f"{prefix}{i}{e}" for e in (".png", ".jpg") if (SRC / f"{prefix}{i}{e}").exists()), None)
        if not f:
            print("NO FILE:", f"{prefix}{i}"); continue
        shutil.copy(f, DST / f.name)
        
        p[0].image = f"products/{f.name}"
        p[0].save()
        print("OK:", cat, name, "->", f.name)