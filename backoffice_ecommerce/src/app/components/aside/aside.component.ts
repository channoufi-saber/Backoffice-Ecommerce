import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/helpers/routes';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  routes:Array<any>=routes
  constructor() { }

  ngOnInit(): void {
  }

}
