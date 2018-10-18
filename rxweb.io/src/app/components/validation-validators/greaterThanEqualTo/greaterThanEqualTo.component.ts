import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GreaterThanEqualToAddValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/greaterThanEqualTo/add/greater-than-equal-to-add.component';
import { GreaterThanEqualToCompleteValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/greaterThanEqualTo/complete/greater-than-equal-to-complete.component';
import { GreaterThanEqualToDynamicValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/greaterThanEqualTo/dynamic/greater-than-equal-to-dynamic.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { TitleCasePipe } from "@angular/common";

@Component({
  templateUrl: './greaterThanEqualTo.component.html',
  entryComponents: [
DisqusComponent
  ]
})
export class GreaterThanEqualToComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"When to use":null,"Basic GreaterThanEqualTo Validation":null,"RelationalOperatorConfig":["fieldName","conditionalExpression","message"],"Complete greaterThanEqualTo Example":null,"Dynamic greaterThanEqualTo Example":null};
  tab_1:string = "fieldNamemodel";
   tab_2:string = "conditionalExpressionmodel";
   tab_3:string = "messageModel";
   tab_4:string = "completeexample";
   tab_5:string = "dynamicexample";
   
  constructor(
    private http: HttpClient   ,private titlecasePipe:TitleCasePipe
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/reactive-form-validators/validators/greaterThanEqualTo/greaterthanequalto.json',this.options).subscribe((response:object) => {
      this.codeContent = JSON.parse(response.toString());
	  let splitedArray = location.pathname.split('/');
	  if(splitedArray[2] != undefined)
		document.title = this.titlecasePipe.transform(splitedArray[2]) + " : " + this.titlecasePipe.transform(splitedArray[1])
	  else
		document.title = splitedArray[1] ? this.titlecasePipe.transform(splitedArray[1]) : "RxApp"
	  this.showComponent = true;
    })
  }
  scrollTo(section) {  
    var node = document.querySelector(section);
    node.scrollIntoView(true);
    var scrolledY = window.scrollY;
    if(scrolledY){
      window.scroll(0, scrolledY - 62);
    }
	return false;
  }
}