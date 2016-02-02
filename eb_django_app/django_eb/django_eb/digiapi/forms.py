from django import forms

class ProjectForm(forms.Form):
    PROJECT_TYPES = (
        ('I', 'Invitation'),
        ('L', 'Logo'),
        ('D', 'Dayof'),
        ('S', 'Syleshoot'),
        ('A', 'Addressing'),
    )
    projectid = forms.CharField(label='Project id', required=False)
    projectname = forms.CharField(label='Project name', required=False)
    projecttype = forms.ChoiceField(choices=PROJECT_TYPES, required=False)
    clientname = forms.CharField(label='Client name', required=False)
    deadline = forms.DateField(required=False)
    poster = forms.ImageField(required=False)

