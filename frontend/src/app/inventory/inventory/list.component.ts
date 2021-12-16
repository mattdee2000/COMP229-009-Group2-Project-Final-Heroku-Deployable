import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Inventory } from "../../model/inventory.model";
import { InventoryRepository } from "../../model/inventory.repository";
import { AuthService } from 'src/app/model/auth.service';


@Component({
    selector: "list-inventory",
    templateUrl: "list.component.html"
})

export class ListComponent {
    completedCheck = false;
    booleanValue: any = false;

    constructor(private repository: InventoryRepository,
        private router: Router, public auth: AuthService) 
    { }

    get inventoryList(): Inventory[] {
        return this.repository.getInventory();        
    }

    deleteMethod(id: string) {
        if(confirm("Are you sure do you want to delete?")) {
            this.router.navigateByUrl("ticket/delete/"+id);
        }
    }    

    boxCheck(event){
        if(event.target.checked){
            this.completedCheck = true
        }
        else{
            this.completedCheck = false
        }
    }

}