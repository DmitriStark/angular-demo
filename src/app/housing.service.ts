import { Injectable } from "@angular/core";
import { HouseingLocation } from "./houseing-location";

@Injectable({
  providedIn: "root",
})
export class HousingService {
  url = "http://localhost:3000/locations";

  constructor() {}

  async getAllHousingLocations(): Promise<HouseingLocation[]> {
    const data = await fetch(this.url);
    return data.json() ?? [];
  }

  async getHouseLocationById(
    id: number
  ): Promise<HouseingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }
  submitApplication(firstName: string, lastName: string, userEmail: string) {
    console.log(firstName, lastName, userEmail);
  }
}
