import { Injectable } from "@angular/core";
import { Inventory } from "./inventory.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class InventoryRepository {
    private inventory: Inventory[] = [];

    constructor(private dataSource: RestDataSource) {
        dataSource.getInventoryList().subscribe(data => {
            this.inventory = data;
        });
    }

    getInventory(): Inventory[] {
        return this.inventory;
    }

    getItem(id: string): Inventory {
        return (this.inventory.find(item => item._id === id)!);
    }

    saveInventory(item: Inventory) {
        if (item._id == null || item._id == "") {
            this.dataSource.insertInventory(item)
                .subscribe(p => this.inventory.push(p));
        } else {
            this.dataSource.updateInventory(item)
                .subscribe(p => {
                    this.inventory.splice(this.inventory.
                        findIndex(i => i._id == item._id), 1, item);
                });
        }
    }

    deleteInventory(id: string) {
        this.dataSource.deleteInventory(id).subscribe(response => {
            if (response.success) {
                this.inventory.splice(this.inventory.
                    findIndex(item => item._id == id), 1);                                
            }
            else{
                alert(response.message);
            }
        })
    }
}