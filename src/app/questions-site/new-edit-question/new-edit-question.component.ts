import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/models/question.model';
import { NewEditService } from './new-edit.service';

@Component({
  selector: 'app-new',
  templateUrl: './new-edit-question.component.html',
  styleUrls: ['./new-edit-question.component.css']
})
export class NewComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder, private newEditService: NewEditService) { }
  question: Question;
  newQuestionForm: FormGroup;
  ngOnInit(): void {
    this.question = this.newEditService.getCurrentQuestion();
    this.makeForm();
    this.newEditService.currentQuestionSbj.subscribe(data => { this.question = data; this.makeForm(); })
  }
  ngOnDestroy(){
    this.newEditService.currentQuestionSbj.unsubscribe();
  }
  

  makeForm() {
    this.newQuestionForm = this.formBuilder.group({
      name: [this.question?.name, [Validators.required, Validators.minLength(3)]],
      description: [this.question?.description, [Validators.required, Validators.minLength(3)]],
      id: [''],
      creationDate :['']
    });
  }

  submitQuestion() {
    if (!this.question) {
      this.newQuestionForm.controls['creationDate'].setValue(new Date());
      this.newEditService.addQuestion(this.newQuestionForm.value);
    } else {
      this.newQuestionForm.controls['id'].setValue(this.question.id);
      this.newEditService.UpdateQuestion(this.newQuestionForm.value);
    }
  }
  exit()
  {
    this.newEditService.reset();
  }
  get description() { return this.newQuestionForm.get('description') }
  get name() { return this.newQuestionForm.get('name') }
}
