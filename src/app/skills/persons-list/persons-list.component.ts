import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../../core/services/skills.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss']
})
export class PersonsListComponent  implements OnInit{
  data: any = [];
  filteredData: any[] = [];
  skillDescription: any[] = [];
  formGroup: FormGroup
  selectedskillDescription: string | undefined;
  constructor(private skillsService: SkillsService, private formBuilder: FormBuilder) {}

   ngOnInit() {
    this.skillsService.getPersons().subscribe(data => {
      this.data = data;
      this.filteredData = data;
      console.log('persons: ',this.data);
      this.skillDescription = [... new Set(this.data.map(elem=> elem.skillDescription))];
      console.log('skillDescription: ',this.skillDescription);
    });
    this.initForm();

    this.formGroup.valueChanges.subscribe(value => {
      this.filteredData = this.data.filter(e => e.skillDescription === value.skillDescription);
    });
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      skillDescription: ""
    });
  }
}
