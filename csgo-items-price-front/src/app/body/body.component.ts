import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

export interface Item {
  position: number;
  name: string;
  exterior: string;
  price: string;
  image: string;
}

interface ItemPost {
  name: string;
  exterior: string;
  price: string;
  image: string;
}

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  value = '';
  dataItems: Item[] = [];
  displayedColumns: string[] = ['select', 'position', 'image', 'name', 'exterior', 'price'];
  dataSource = new MatTableDataSource<Item>();
  selection = new SelectionModel<Item>(true, []);

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  async searchItems(event) {
    const searchValue = event.target.value;
    const url: string = 'https://localhost:5001/items/from_steam/' + searchValue;
    const response: any = await this.httpClient.get(url).toPromise();
    let nr = 1;
    let hashName: string;
    let exterior: string;
    const imageUrl = 'https://steamcommunity-a.akamaihd.net/economy/image/';
    let image: string;
    this.dataItems = [];
    response.results.forEach(element => {
      hashName = element.hash_name;
      image = imageUrl + element.asset_description.icon_url;
      exterior = hashName.substring(hashName.lastIndexOf('('));
      this.dataItems.push({position: nr, name: hashName, image, exterior, price: element.sell_price_text});
      nr++;
    });
    this.setItemsToTable();
  }

  async saveData(): Promise<void> {
    const url = 'https://localhost:5001/items';
    const items: ItemPost[] = [];
    this.selection.selected.forEach(element => {
      items.push({name: element.name, exterior: element.exterior, image: element.image, price: element.price});
    });
    await this.httpClient.post<ItemPost>(url, items).toPromise();
    this.toastr.success('Successfully saved all items');
  }

  setItemsToTable(): void {
    this.dataSource.data = this.dataItems;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Item): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
