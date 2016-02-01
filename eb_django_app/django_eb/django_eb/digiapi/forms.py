from django import forms

class ProjectForm(forms.Form):
    PROJECT_TYPES = (
        ('I', 'Invitation'),
        ('L', 'Logo'),
        ('D', 'Dayof'),
        ('S', 'Syleshoot'),
        ('A', 'Addressing'),
    )
    #
    # project_name = forms.CharField(label='Project name')
    # project_type = forms.ChoiceField(choices=PROJECT_TYPES)
    # client_name = forms.CharField(label='Client name')
    # deadline = forms.DateField()
    poster = forms.ImageField()

