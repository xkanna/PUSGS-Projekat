export class Incident{
    id!: string;
    type!: string;
    priority!: number;
    confirmed!: boolean;
    status!: string;
    eta!: Date;
    ata!: Date;
    incidentTime!: Date;
    etr!: Date;
    affectedCustomers!: number;
    calls!:number;
    voltage!:number;
    scheduledTime!:Date;
    address!:string;
    //dodeli sebi resenje??
}