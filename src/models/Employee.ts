export type DaysOfWeek = "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU";

export class WorkDay{
    constructor(
        public day:DaysOfWeek,
        private startHour:string,
        private endHour:string
    ){}

    private parseTimeToMinutes(time:string):number{
        const [hours,minutes] = time.split(':');
        return parseInt(minutes) + parseInt(hours)*60;
    }

    public coincidesWith(other:WorkDay):boolean{
        if(this.day !== other.day) return false;

        const thisStart = this.parseTimeToMinutes(this.startHour);
        const thisEnd = this.parseTimeToMinutes(this.endHour);
        const otherStart = this.parseTimeToMinutes(other.startHour);
        const otherEnd = this.parseTimeToMinutes(other.endHour);

        if(otherStart > thisEnd || thisStart > otherEnd) return false;

        return true;
    }
}

export class Employee{
    constructor(public employeeName:string, public workedSchedule:WorkDay[]){}
}

