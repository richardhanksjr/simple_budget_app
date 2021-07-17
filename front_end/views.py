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
        narrow_list = ['static/front_end/images/C.png', 'static/front_end/images/E.png', 'static/front_end/images/X.png',
                       'static/front_end/images/Y.png', 'static/front_end/images/H.png', 'static/front_end/images/G.png',
                       'static/front_end/images/F.png', 'static/front_end/images/J.png', 'static/front_end/images/I.png',
                       'static/front_end/images/T.png', 'static/front_end/images/P.png']
        context = {
            'letters': letters,
            'upper_width': upper_width,
            'upper_height': upper_height,
            'lower_margin_top': lower_margin_top,
            'lower_width': lower_width,
            'lower_height': lower_height,
            'lower_width_narrow': lower_width_narrow,
            'upper_width_narrow': upper_width_narrow,
            'narrow_list': narrow_list
        }
        return render(request, 'front_end/letters.html', context)
