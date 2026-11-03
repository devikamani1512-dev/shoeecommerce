from django.db import models


class AboutPage(models.Model):
    intro_title = models.CharField(max_length=200, default="About StepUp")
    intro_text = models.TextField()
    mission_title = models.CharField(max_length=200, default="Our Mission")
    mission_text = models.TextField()
    main_image = models.ImageField(upload_to="about/", blank=True, null=True)
    shoes_image = models.ImageField(upload_to="about/", blank=True, null=True)

    class Meta:
        verbose_name = "About Page"
        verbose_name_plural = "About Page"

    def __str__(self):
        return "About Page Content"


class AboutValue(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title