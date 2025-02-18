import { Component , inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HousingService } from '../housing.service';
import { HouseingLocation } from '../houseing-location';
import { FormControl , FormGroup , ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule ,RouterModule,ReactiveFormsModule],
  template: `
  <a routerLink = "" >Home </a>
   <article>
    <img class = "listing-photo" [src]="housingLocation?.photo">
    <section class = "listing-description">
      <h2 class = "listing-heading"> {{housingLocation?.name}}</h2>
      <p class = "listing-location"> {{housingLocation?.city}} , {{housingLocation?.state}}</p>
</section>
<section class = "listing-features">
  <h2 class="section-heading">About this location</h2>
  <ul>
    <li>units availible : {{housingLocation?.availableUnits}}</li>
    <li>Does this location have wifi : {{housingLocation?.wifi}}</li>
    <li>Does this location have loundry : {{housingLocation?.laundry}}</li>
</ul>
</section>
<section class="listing-apply">
  <h2 class = "section-heading"> Apply to live here </h2>
<form [formGroup]="apllyForm" (submit)=submitApplication()>
  <label for = "first-name">First Name</label>
  <input id = "last-name" type = "text" formControlName="firstName">

  <label for = "last-name">Last Name</label>
  <input id="last-name" type="text" formControlName="lastName">

  <label for="userEmail">Email</label>
  <input id="userEmail" type = "email" formControlName="userEmail">

  <button type ="submit" class="primary">Apply now</button>
</form>
</section>
</article>



  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route:ActivatedRoute = inject(ActivatedRoute);
housingService = inject(HousingService);
housingLocation : HouseingLocation | undefined;
apllyForm = new FormGroup({
  firstName: new FormControl(""),
  lastName : new FormControl(""),
  userEmail : new FormControl("")
});

  constructor(){
   const housingLocationId = Number(this.route.snapshot.params['id'])
  //  this.housingLocation = this.housingService.getHouseLocationById(housingLocationId)
  this.housingService.getHouseLocationById(housingLocationId).then(housingLocation =>{
    this.housingLocation = housingLocation
  })
  }
submitApplication(){
  this.housingService.submitApplication(
    this.apllyForm.value.firstName ?? "",
    this.apllyForm.value.lastName ?? "",
    this.apllyForm.value.userEmail ?? ""
  );
}
}
