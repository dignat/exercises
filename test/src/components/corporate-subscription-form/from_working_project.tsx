@Listen('helixEvent')
  handle(event: CustomEvent): void {
    if (event.detail.name === 'HelixCheckboxSelect' && event.detail.meta[0].value === 'on') {
      this.value = 'Yes';
    } else if (event.detail.meta[0].value === '' && event.detail.name === 'HelixCheckboxUnselect') {
      this.value = 'No';
    }
  }

  this.formFields = isValid && event.target['name'] !== 'confirm' ? [...this.formFields, { name, isValid }] : this.formFields.filter(formField => formField.name !== name);

    this.formFields = this.checkboxIsChecked ? [...this.formFields, { name, isValid }] : this.formFields;

