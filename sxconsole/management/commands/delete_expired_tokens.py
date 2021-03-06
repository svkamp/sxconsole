# Copyright (C) 2015-2016 Skylable Ltd. <info-copyright@skylable.com>
# License: GPLv2 or later, see LICENSE for more details.

'''
'''

from django.core.management.base import BaseCommand

from sxconsole.utils.models import TokenModel


class Command(BaseCommand):
    help = 'Removes expired tokens (e.g. password reset tokens)'

    def handle(self, *args, **kwargs):
        for cls in TokenModel.__subclasses__():
            self.stdout.write('Deleting expired {}...'.format(
                cls._meta.verbose_name_plural))
            cls.objects.expired().delete()
