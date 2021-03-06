from rest_framework import serializers
from . import models


class CurrencyTypeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = models.CurrencyType
        fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = models.Account
        fields = ('id', 'name')


class AccountsGroupSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(
        read_only=True
    )
    account = AccountSerializer(many=True, read_only=True)
    class Meta:
        model = models.AccountsGroup
        fields = ('id', 'name', 'account_set', 'account')


class TransactionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = models.Transaction
        fields = '__all__'
