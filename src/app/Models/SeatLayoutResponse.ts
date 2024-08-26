export interface SeatLayoutResponse{
    data: SeatDetail[];
    message: string;
    count: number;
    success: boolean;
    errorDetails: any; // Adjust as needed
    statusCode: number;
}

export interface SeatDetail {
    SeatDetailsID: number;
    AuditoriumID: number;
    SeatNumber: number;
    SeatType: number;
    CreateDate: string;
    CreateUID: number;
    Status: string;
    RowNumber: number;
    MovieTime: string;
    MovieId: number;
    MovieScheduleID: number;
  }