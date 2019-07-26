# Generated by Django 2.0.3 on 2019-07-24 15:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ActiveGearTalent',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='ActiveWeaponTalent',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Attribute',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='AttributeType',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Build',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Gear',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('score', models.PositiveSmallIntegerField()),
                ('armor', models.DecimalField(decimal_places=2, max_digits=6)),
                ('trash', models.BooleanField(default=False)),
                ('activeTalent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='bank.ActiveGearTalent')),
            ],
        ),
        migrations.CreateModel(
            name='GearAttribute',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('attribute', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.Attribute')),
                ('gear', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.Gear')),
            ],
        ),
        migrations.CreateModel(
            name='GearBuild',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('build', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.Build')),
                ('gear', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.Gear')),
            ],
        ),
        migrations.CreateModel(
            name='GearFamily',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='GearMod',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('filled', models.BooleanField(default=False)),
                ('gear', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.Gear')),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.AttributeType')),
            ],
        ),
        migrations.CreateModel(
            name='GearPassiveMembership',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gear', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.Gear')),
            ],
        ),
        migrations.CreateModel(
            name='GearType',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='PassiveGearTalent',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='PassiveWeaponTalent',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Weapon',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('score', models.PositiveSmallIntegerField()),
                ('dmg', models.DecimalField(decimal_places=2, max_digits=6)),
                ('trash', models.BooleanField(default=False)),
                ('activeTalent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='bank.ActiveWeaponTalent')),
            ],
        ),
        migrations.CreateModel(
            name='WeaponFamily',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='WeaponPassiveMembership',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('talent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.PassiveWeaponTalent')),
                ('weapon', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.Weapon')),
            ],
        ),
        migrations.CreateModel(
            name='WeaponVariant',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('best', models.BooleanField(default=False)),
                ('family', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.WeaponFamily')),
            ],
        ),
        migrations.AddField(
            model_name='weapon',
            name='passiveTalents',
            field=models.ManyToManyField(through='bank.WeaponPassiveMembership', to='bank.PassiveWeaponTalent'),
        ),
        migrations.AddField(
            model_name='weapon',
            name='variant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.WeaponVariant'),
        ),
        migrations.AddField(
            model_name='gearpassivemembership',
            name='talent',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.PassiveGearTalent'),
        ),
        migrations.AddField(
            model_name='gear',
            name='builds',
            field=models.ManyToManyField(through='bank.GearBuild', to='bank.Build'),
        ),
        migrations.AddField(
            model_name='gear',
            name='family',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.GearFamily'),
        ),
        migrations.AddField(
            model_name='gear',
            name='gearAttributes',
            field=models.ManyToManyField(through='bank.GearAttribute', to='bank.Attribute'),
        ),
        migrations.AddField(
            model_name='gear',
            name='gearMods',
            field=models.ManyToManyField(through='bank.GearMod', to='bank.AttributeType'),
        ),
        migrations.AddField(
            model_name='gear',
            name='passiveTalents',
            field=models.ManyToManyField(through='bank.GearPassiveMembership', to='bank.PassiveGearTalent'),
        ),
        migrations.AddField(
            model_name='gear',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.GearType'),
        ),
        migrations.AddField(
            model_name='attribute',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.AttributeType'),
        ),
    ]