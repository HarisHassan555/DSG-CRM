"""Replace the coral default and orange presets with DSG light themes."""

from django.db import migrations

RENAMES = {
    "Coral Red Theme (Default)": "DSG Light (Default)",
    "Sunset Orange Theme": "DSG Paper Theme",
    "Amber Glow Theme": "DSG Mist Theme",
}


def forwards(apps, schema_editor):
    from horilla.contrib.theme.utils import THEMES_DATA

    Theme = apps.get_model("theme", "HorillaColorTheme")
    by_name = {item["name"]: item for item in THEMES_DATA}
    Theme.objects.filter(is_default=True).update(is_default=False)
    for old_name, new_name in RENAMES.items():
        data = dict(by_name[new_name])
        row = Theme.objects.filter(name=old_name).first()
        if row is None:
            row = Theme.objects.filter(name=new_name).first()
        if row is None:
            Theme.objects.create(**data)
            continue
        for key, value in data.items():
            setattr(row, key, value)
        row.save()


def backwards(apps, schema_editor):
    Theme = apps.get_model("theme", "HorillaColorTheme")
    Theme.objects.filter(name="DSG Light (Default)").update(
        name="Coral Red Theme (Default)",
        description="Warm coral-red based theme",
        primary_600="#E54F38",
        is_default=True,
    )


class Migration(migrations.Migration):

    dependencies = [
        ("theme", "0003_alter_companytheme_created_at_and_more"),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]
