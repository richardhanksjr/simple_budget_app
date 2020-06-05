from django.test import TestCase
from django.contrib.auth.models import User
# Create your tests here.


class TestMoneyApp(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='test', password='test123')

    def test_homepage_status_code(self):
        self.client.force_login(self.user)
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

