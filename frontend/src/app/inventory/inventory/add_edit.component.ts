import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Inventory } from "../../model/inventory.model";
import { InventoryRepository } from "../../model/inventory.repository";

@Component({
    selector: "add-edit",
    templateUrl: "add_edit.component.html"
})

export class AddEditComponent {

    editing: boolean = false;
    item: Inventory = new Inventory();

    constructor(private repository: InventoryRepository,
                private router: Router,
                activeRoute: ActivatedRoute) 
    { 
        if (activeRoute.snapshot.params["mode"] == "delete") {
            this.deleteItem(activeRoute.snapshot.params["id"]);
        }

        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        
        if (this.editing) {
            this.item = repository.getItem(activeRoute.snapshot.params["id"]);
        } 
        else {
        }        
    }

    save(form: NgForm) {
        var timeLine = this.editing? "Edited on:" : "Created on:"
        this.item.note = this.item.note + "\n\n" + timeLine + "\n" + Date() + "\n\n" ;
        this.repository.saveInventory(this.item);
        this.router.navigateByUrl("ticket/list");
    }

    private deleteItem(id: string){
        this.repository.deleteInventory(id);
        this.router.navigateByUrl("ticket/list");
    }
    
}