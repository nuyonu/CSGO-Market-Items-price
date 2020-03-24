import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-stored-items',
  templateUrl: './all-stored-items.component.html',
  styleUrls: ['./all-stored-items.component.scss']
})
export class AllStoredItemsComponent implements OnInit {

  displayedColumns = ['position', 'image', 'name', 'exterior', 'lowestPrice', 'medianPrice'];
  dataSource: ItemGet[] = [];
  showSpinner = true;
  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  async ngOnInit(): Promise<void> {
    this.dataSource = await this.getDataSource();
    this.showSpinner = false;
  }

  async getDataSource() {
    this.showSpinner = true;
    const url = 'https://localhost:5001/items';
    return await this.httpClient.get<ItemGet[]>(url).toPromise();
  }

  async updateData() {
    this.dataSource = await this.getDataSource();
    this.toastr.info('Successfully updated all items');
    this.showSpinner = false;
  }
}

export interface ItemGet {
  id: string;
  name: string;
  exterior: string;
  lowestPrice: string;
  medianPrice: string;
  image: string;
}
