import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { ViewDataService } from 'src/app/core/services/view-data.service';

@Component({
  selector: 'app-paginator-of-all-tasks',
  templateUrl: './paginator-of-all-tasks.component.html',
  styleUrls: ['./paginator-of-all-tasks.component.css'],
})
export class PaginatorOfAllTasksComponent {
  tasksDataList = [];
  tasksData: any[] = [];
  tasksDataPerPage: number = 4;
  public selectedPage = 1;
  activePageNumber = 1;
  @Output() tasksDataForParent = new EventEmitter<any>();
  @Output() isLoading = new EventEmitter<boolean>(true);

  constructor(
    private dataService: DataService,
    private viewDataService: ViewDataService
  ) {}
  ngOnInit(): void {
    this.getAllTasks();
  }
  getAllTasks() {
    this.dataService.getAllTasks(1, 10).subscribe({
      next: (res: any) => {
        this.tasksDataList = res.tasks.reverse();
        let pageIndex = (this.selectedPage - 1) * this.tasksDataPerPage;
        this.tasksData = this.tasksDataList.slice(
          pageIndex,
          this.tasksDataPerPage
        );
        this.tasksDataForParent.emit(this.tasksData);
        this.isLoading.emit(false);
      },
      error: (error) => {
        console.log(error);
        this.isLoading.emit(false);
      },
    });
  }
  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.tasksDataPerPage = Number(newSize);
    this.changePage(1);
  }
  get pageNumbers(): number[] {
    return Array(Math.ceil(this.tasksDataList.length / this.tasksDataPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }
  changePage(page: any) {
    this.selectedPage = page;
    this.slicedTasks();
    this.activePageNumber = page;
  }
  slicedTasks() {
    let pageIndex = (this.selectedPage - 1) * this.tasksDataPerPage;
    let endIndex =
      (this.selectedPage - 1) * this.tasksDataPerPage + this.tasksDataPerPage;
    this.tasksData = [];
    this.tasksData = this.tasksDataList.slice(pageIndex, endIndex);
    this.tasksDataForParent.emit(this.tasksData);
  }
  nextPage() {
    if (this.activePageNumber != this.pageNumbers.length) {
      this.activePageNumber = this.activePageNumber + 1;
      this.changePage(this.activePageNumber);
    }
  }
  previousPage() {
    if (this.activePageNumber != 1) {
      this.activePageNumber = this.activePageNumber - 1;
      this.changePage(this.activePageNumber);
    }
  }
}
