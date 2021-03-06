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


class TodoForm(forms.Form):
    title = forms.CharField(label='Title', required=False)
    detail = forms.CharField(label='Detail', required=False)
    status = forms.CharField(label='Status', required=False)
    priority = forms.CharField(label='Priority', required=False)
    index = forms.IntegerField(label='Index', required=False)


class DeleteTodoForm(forms.Form):
    todo = forms.CharField(label='Todo', required=False)


class PhotoForm(forms.Form):
    file = forms.ImageField(required=False)
    # project_id_upload = forms.CharField(label='Project id', required=False)