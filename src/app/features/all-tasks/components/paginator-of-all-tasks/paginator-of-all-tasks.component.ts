import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-paginator-of-all-tasks',
  templateUrl: './paginator-of-all-tasks.component.html',
  styleUrls: ['./paginator-of-all-tasks.component.css'],
})
export class PaginatorOfAllTasksComponent {
  usersDataList = [];
  usersData: any[] = [];
  usersDataPerPage: number = 4;
  public selectedPage = 1;
  activePageNumber = 1;
  @Output() usersDataForParent = new EventEmitter<any>();
  @Output() isLoading = new EventEmitter<boolean>(true);

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.getAllTasks().subscribe({
      next: (res: any) => {
        this.usersDataList = res.tasks;
        this.isLoading.emit(false);
      },
      error: (error) => {
        console.log(error);
        this.isLoading.emit(false);
      },
    });
    let pageIndex = (this.selectedPage - 1) * this.usersDataPerPage;
    this.usersData = this.usersDataList.slice(pageIndex, this.usersDataPerPage);
    this.usersDataForParent.emit(this.usersData);
  }
  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.usersDataPerPage = Number(newSize);
    this.changePage(1);
  }
  get pageNumbers(): number[] {
    return Array(Math.ceil(this.usersDataList.length / this.usersDataPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }
  changePage(page: any) {
    this.selectedPage = page;
    this.slicedTasks();
    this.activePageNumber = page;
  }
  slicedTasks() {
    let pageIndex = (this.selectedPage - 1) * this.usersDataPerPage;
    let endIndex =
      (this.selectedPage - 1) * this.usersDataPerPage + this.usersDataPerPage;
    this.usersData = [];
    this.usersData = this.usersDataList.slice(pageIndex, endIndex);
    this.usersDataForParent.emit(this.usersData);
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

// =========================
const usersDataList = [
  {
    position: 1,
    img: 'assets/images/img.jpg',
    title: 'title',
    user: 'ali',
    deadLine: '24/7/2024',
    status: 'pending',
  },
  {
    position: 2,
    img: 'assets/images/img.jpg',
    title: 'title',
    user: 'ali',
    deadLine: '24/7/2024',
    status: 'pending',
  },
  {
    position: 3,
    img: 'assets/images/img.jpg',
    title: 'title',
    user: 'ali',
    deadLine: '24/7/2024',
    status: 'pending',
  },
  {
    position: 4,
    img: 'assets/images/img.jpg',
    title: 'title',
    user: 'ali',
    deadLine: '24/7/2024',
    status: 'pending',
  },
  {
    position: 5,
    img: 'assets/images/img.jpg',
    title: 'title',
    user: 'ali',
    deadLine: '24/7/2024',
    status: 'pending',
  },
  {
    position: 6,
    img: 'assets/images/img.jpg',
    title: 'title',
    user: 'ali',
    deadLine: '24/7/2024',
    status: 'pending',
  },
  {
    position: 7,
    img: 'assets/images/img.jpg',
    title: 'title',
    user: 'ali',
    deadLine: '24/7/2024',
    status: 'pending',
  },
  {
    position: 8,
    img: 'assets/images/img.jpg',
    title: 'title',
    user: 'ali',
    deadLine: '24/7/2024',
    status: 'pending',
  },
  {
    position: 9,
    img: 'assets/images/img.jpg',
    title: 'title',
    user: 'ali',
    deadLine: '24/7/2024',
    status: 'pending',
  },
  {
    position: 10,
    img: 'assets/images/img.jpg',
    title: 'title',
    user: 'ali',
    deadLine: '24/7/2024',
    status: 'pending',
  },
];
