import { Component, OnInit } from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-item.model';
import { UpdateEvent } from '../budget-item-list/budget-item-list.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  budgetItems: BudgetItem[] = new Array<BudgetItem>();
  public totalbudget: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  addItem(newItem: BudgetItem){
    this.budgetItems.push(newItem)

    if(newItem.type == 'Expense' && newItem.amount > 0) {
      newItem.amount = -1 * newItem.amount
    }
    this.totalbudget += newItem.amount
  }

  deleteItem(item: BudgetItem){
    let index = this.budgetItems.indexOf(item)
    this.budgetItems.splice(index,1)
    
    this.totalbudget -= item.amount
  }

  updateItem(updateEvent: UpdateEvent) {
    // replace the item with updated item from from
    // result is updated budget item
    this.budgetItems[this.budgetItems.indexOf(updateEvent.old)] = updateEvent.new

    // update total budget
    if((updateEvent.new.type == 'Expense' && updateEvent.new.amount > 0) || (updateEvent.new.type == 'Income' && updateEvent.new.amount < 0) ) {
           updateEvent.new.amount = -1 * updateEvent.new.amount;
    }
  
    this.totalbudget -= updateEvent.old.amount
    this.totalbudget += updateEvent.new.amount
  }

}
