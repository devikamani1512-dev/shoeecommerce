from django.db import models


class HomePage(models.Model):
    overview_title = models.CharField(max_length=200, default="Overview")
    overview_text = models.TextField()
    categories_title = models.CharField(max_length=200, default="What are you looking for?")
    trending_title = models.CharField(max_length=200, default="New & Trending")
    offer_text_1 = models.CharField(max_length=200, default="Get your first order with free gift")
    offer_text_2 = models.CharField(max_length=200, default="& 50 % offer")

    class Meta:
        verbose_name = "Home Page"
        verbose_name_plural = "Home Page"

    def __str__(self):
        return "Home Page Content"


class HomeCategory(models.Model):
    name = models.CharField(max_length=100)
    link = models.CharField(max_length=200, help_text="Example: /mens")
    image = models.ImageField(upload_to="home/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "Home categories"
        ordering = ["order"]

    def __str__(self):
        return self.name