from django.contrib import admin
from web_app.models import PayCycle, Expense, Drawing, DrawingParticipant

admin.site.register(PayCycle)
admin.site.register(Expense)
admin.site.register(Drawing)
admin.site.register(DrawingParticipant)
