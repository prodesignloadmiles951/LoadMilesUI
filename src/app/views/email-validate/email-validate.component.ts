import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-email-validate',
  templateUrl: './email-validate.component.html',
  styleUrls: ['./email-validate.component.scss']
})
export class EmailValidateComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
	console.log(this.route.snapshot.paramMap.get('token'))
  }

}
