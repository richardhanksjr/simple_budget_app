from django.views.generic import TemplateView

class Index(TemplateView):
    template_name = 'web_app/index.html'
