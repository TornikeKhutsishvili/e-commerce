import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carusel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './carusel.html',
  styleUrls: ['./carusel.scss']
})
export class Carusel {

}
