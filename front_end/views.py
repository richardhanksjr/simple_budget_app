from django.views.generic.base import TemplateView, View
from django.shortcuts import render


class Index(TemplateView):
    template_name = 'front_end/index.html'


class SubmitText(View):
    def post(self, request):
        narrow_factor = 2
        letters = []
        for letter in list(request.POST.get('letters')):
            if letter.isupper():
                letters.append((f'static/front_end/images/{letter.lower()}.png', True))
            elif letter == " ":
                letters.append(("space", False))
            else:
                letters.append((f'static/front_end/images/{letter}.png', False))
        # letters = [(f'static/front_end/images/{letter.lower()}.png' if letter != " " else "space", letter.isupper()) for
        #            letter in list(request.POST.get('letters'))]
        upper_width = request.POST.get('upper_width')
        upper_height = request.POST.get('upper_height')
        lower_height = request.POST.get('lower_height')
        lower_margin_top = int(upper_height) - int(lower_height)
        lower_width = request.POST.get('lower_width')
        lower_width_narrow = int(lower_width) - narrow_factor
        upper_width_narrow = int(upper_width) - narrow_factor

            # narrow_list = ['cap-K.png', 'cap-M.png', 'm.png', 'cap-W.png', 'cap-X.png']
            # wide_list = ['f.png', 'i.png', 'cap-I.png', 'j.png', 'l.png', 'r.png', 't.png']
        narrow_list = []
        wide_list = ['i']
        narrow_list = [f"static/front_end/images/{n}.png" for n in narrow_list]
        wide_list = [f"static/front_end/images/{n}.png" for n in wide_list]

        print("wide list is", wide_list)
        print('static/front_end/images/I.png' in wide_list)
        special_multiplier = 1.25
        wide_multiplier = .6
        letter_spacing = 5
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
            'special_width_lower': int(lower_width) * special_multiplier,
            'wide_list': wide_list,
            'wide_width': int(upper_width) * wide_multiplier,
            'wide_width_lower': int(lower_width) * wide_multiplier,
            'letter_spacing': letter_spacing
        }
        return render(request, 'front_end/letters.html', context)
