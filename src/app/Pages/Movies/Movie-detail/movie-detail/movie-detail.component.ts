import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MovielistService } from '../../../../Services/movielist.service';
import { SeatselectionService } from '../../../../Services/seatselection.service';
import { UserDetailComponent } from '../../user-detail/user-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieModel } from '../../../../Models/MovieModel';


@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,UserDetailComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent {
  movies :MovieModel[] = [];
  form: FormGroup;
  auditoriums: { id: number, name: string }[] = [];
  times: string[] = [];
  seats: { seatNumber: number, rowNumber: number, status: string }[][] = [];
  selectedSeats: { seatNumber: number, rowNumber: number }[] = [];
  MovieID: number = 0;
  reqpara: any = {};
  seatFare: number = 0;
  totalFare: number = 0;
  MovieName :string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private movielistservice: MovielistService,
    private seatselectionservice: SeatselectionService,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      auditorium: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const movieId = params.get('id');
      if (movieId) {
        this.MovieID = +movieId;
        console.log(this.MovieID);
      }
    });
    this.reqpara.MovieID = this.MovieID;
    console.log("Hello", this.reqpara);
    this.fetchAuditoriums(this.reqpara);
    this.getMovies();
  }

  fetchAuditoriums(reqpara: any): void {
    this.movielistservice.getAuditoriums(reqpara).subscribe(res => {
      if (res.success) {
        this.auditoriums = res.data.map((auditorium: { AuditoriumID: any; Name: any; }) => ({
          id: auditorium.AuditoriumID,
          name: auditorium.Name
        }));
      } else {
        console.error('Failed to fetch auditoriums:', res.message);
      }
    });
  }

  fetchTimes(): void {
    const para: any = {
      AuditoriumID: Math.floor(parseFloat(this.form.get('auditorium')?.value)),
      MovieID: this.MovieID,
      Date: this.form.get('date')?.value
    };
  
    this.movielistservice.getTimes(para).subscribe(res => {
      this.times = res.data.map((item: any) => item.Times);
    }, error => {
      console.error('Error fetching times:', error);
    });
  }

  fetchSeats(): void {
    const para: any = {
      UAuditoriumID: Math.floor(parseFloat(this.form.get('auditorium')?.value)),
      UMovieID: this.MovieID,
      Date: this.form.get('date')?.value,
      Time: this.form.get('time')?.value,
    }
    console.log(para);
    this.seatselectionservice.getSeatLayout(para).subscribe(response => {
      console.log("seat", response.data);
      this.seats = this.transformSeatData(response.data);
    });
  }

  transformSeatData(data: any[]): { seatNumber: number, rowNumber: number, status: string }[][] {
    const rows = 5; // Adjust if the number of rows varies
    const seatsPerRow = 13; // Adjust if the number of seats per row varies
  
    return Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: seatsPerRow }, (_, seatIndex) => {
        const seatNumber = (rowIndex * seatsPerRow) + seatIndex + 1;
        const seatData = data.find(seat => seat.SeatNumber === seatNumber && seat.RowNumber === rowIndex + 1);
        return {
          seatNumber: seatData ? seatData.SeatNumber : seatNumber,
          rowNumber: seatData ? seatData.RowNumber : rowIndex + 1,
          status: seatData ? seatData.Status : 'Available'
        };
      })
    );
  }
  
  toggleSeat(rowIndex: number, seatIndex: number): void {
    const seat = this.seats[rowIndex][seatIndex];
    if (seat.status === 'Available') {
      const seatAlreadySelected = this.selectedSeats.some(s => s.seatNumber === seat.seatNumber && s.rowNumber === seat.rowNumber);
      if (seatAlreadySelected) {
        this.selectedSeats = this.selectedSeats.filter(s => !(s.seatNumber === seat.seatNumber && s.rowNumber === seat.rowNumber));
      } else {
        this.selectedSeats.push({ seatNumber: seat.seatNumber, rowNumber: seat.rowNumber });
      }
    }
    this.calculateFare();
  }

  confirmBooking(): void {
    if (this.selectedSeats.length === 0) {
      alert('No seats selected');
      return;
    }

    const param: any = {
      UMovieID: this.MovieID,
      UAuditoriumID: Math.floor(parseFloat(this.form.get('auditorium')?.value)),
      Date: this.form.get('date')?.value,
      Time: this.form.get('time')?.value,
      BookingData: this.selectedSeats
    };

    this.seatselectionservice.InsertTicketBooking(param).subscribe(response => {
      if (response.success) {
        var reservationdetailid = response.data.reservationID;
        var reservationdetailidString = JSON.stringify(reservationdetailid)
        localStorage.removeItem('reservationdetailid');
        localStorage.setItem('reservationdetailid',reservationdetailidString);
        this.selectedSeats.forEach(seat => {
          const row = this.seats.find(r => r.some(s => s.seatNumber === seat.seatNumber && s.rowNumber === seat.rowNumber));
          if (row) {
            const seatToUpdate = row.find(s => s.seatNumber === seat.seatNumber && s.rowNumber === seat.rowNumber);
            if (seatToUpdate) seatToUpdate.status = 'Booked';
          }
        });
        this.selectedSeats = [];
        alert('Seats booked successfully!');
        const dialogRef = this.dialog.open(UserDetailComponent);

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('Dialog result:', result);
            // Process the form data (e.g., send to server)
          }
        });
      }else if(response.success == false){
        alert("Seats Are Alredy Booked , Please select Another seat");
      } 
      else {
        alert('Booking failed, please try again.');
      }
    });
  }

  getSeatClass(seat: { seatNumber: number, rowNumber: number, status: string }, rowIndex: number, seatIndex: number): string {
    const isSelected = this.selectedSeats.some(s => s.seatNumber === seat.seatNumber && s.rowNumber === seat.rowNumber);
    return [
      'seat',
      seat.status === 'Available' ? 'available' : '',
      seat.status === 'Booked' ? 'booked' : '',
      isSelected ? 'selected' : ''
    ].join(' ');
  }

  calculateFare(): void {
    const para: any = {
      UAuditoriumID: Math.floor(parseFloat(this.form.get('auditorium')?.value)),
      UMovieID: this.MovieID,
      Date: this.form.get('date')?.value,
      Time: this.form.get('time')?.value,
    }
    console.log(para);
    this.seatselectionservice.getFareForEachSeat(para).subscribe(response => {
      console.log(response.data);
      this.seatFare = response.data[0].TicketPrice;
      this.totalFare = this.selectedSeats.length * this.seatFare;
      console.log(this.seatFare);
    });
  }

  public getMovies(): void {
    debugger
    const reqparam = {
      MovieID :this.MovieID
    }
    this.movielistservice.getMovieByID(reqparam).subscribe(res =>{
      console.log(res.data);
      if(res.data[0].MovieName){
        this.MovieName = res.data[0].MovieName
      }
    })
  }

  getMovieImage(): string {
    debugger;
    return `/${this.MovieName.replace(/\s+/g, '-').toLowerCase()}.jpg`;
  }
}
