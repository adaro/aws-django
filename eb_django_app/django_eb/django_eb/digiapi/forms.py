from django import forms
from models.Project import PROJECT_TYPES  

class ProjectNameForm(forms.Form):
    project_name = forms.CharField(label='Project name')
    project_type = forms.ChoiceField(choices=PROJECT_TYPES)
    client_name = forms.CharField(label='Client's name')
    deadline = forms.DateField()
