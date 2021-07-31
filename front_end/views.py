from django.views.generic.base import TemplateView, View
from django.shortcuts import render


class Index(TemplateView):
    template_name = 'front_end/index.html'


class SubmitText(View):
    def post(self, request):
        narrow_factor = 5
        letters = [(f'static/front_end/images/{letter.lower()}.png' if letter != " " else "space", letter.isupper()) for
                   letter in list(request.POST.get('letters'))]
        upper_width = request.POST.get('upper_width')
        upper_height = request.POST.get('upper_height')
        lower_height = request.POST.get('lower_height')
        lower_margin_top = int(upper_height) - int(lower_height)
        lower_width = request.POST.get('lower_width')
        lower_width_narrow = int(lower_width) - narrow_factor
        upper_width_narrow = int(upper_width) - narrow_factor
        narrow_list = []
        special_multiplier = 1.05
        context = {
            'letters': letters,
            'upper_width': upper_width,
            'upper_height': upper_height,
            'lower_margin_top': lower_margin_top,
            'lower_width': lower_width,
            'lower_height': lower_height,
            'lower_width_narrow': lower_width_narrow,
            'upper_width_narrow': upper_width_narrow,
            'narrow_list': narrow_list,
            'special_height': int(upper_height) * special_multiplier,
            'special_width': int(upper_width) * special_multiplier,
            'special_height_lower': int(lower_height) * special_multiplier,
            'special_width_lower': int(lower_width) * special_multiplier
        }
        return render(request, 'front_end/letters.html', context)
