from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin


class Index(LoginRequiredMixin, TemplateView):
    template_name = 'web_app/index.html'
    login_url = '/login/'
    redirect_field_name = 'redirect_to'

